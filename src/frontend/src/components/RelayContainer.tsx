// so im not a huge fan of this
// if i'm understanding correctly, having "use client" here on a parent component of... everything
// basically nullifies all SSR

"use client"

import { PropsWithChildren } from "react"
import { RelayEnvironmentProvider } from "react-relay"
import { Environment, FetchFunction, Network } from "relay-runtime";

const HTTP_ENDPOINT = process.env.NEXT_PUBLIC_HOST + "graphql/";

const fetchGraphQL: FetchFunction = async (request, variables) => {
    const resp = await fetch(HTTP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: request.text, variables }),
    });

    if (!resp.ok) {
        debugger;
        throw new Error("Response failed.");
    }
    return await resp.json();
};

const environment = new Environment({
    network: Network.create(fetchGraphQL),
});

export default function RelayContainer({ children }: PropsWithChildren) {
    return (
        <RelayEnvironmentProvider environment={environment}>
            {children}
        </RelayEnvironmentProvider>
    )
}