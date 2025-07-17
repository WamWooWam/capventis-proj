import { Environment, FetchFunction, Network } from "relay-runtime";

const HTTP_ENDPOINT = process.env.NEXT_PUBLIC_HOST + "graphql";

const fetchGraphQL: FetchFunction = async (request, variables) => {
    let authToken: string | undefined;
    if (typeof window === "undefined") {
        const cookieStore = await require('next/headers').cookies();
        authToken = cookieStore.get("token")?.value;
    }
    else {
        authToken = decodeURIComponent(document.cookie.split('; ')
            .find(row => row.startsWith('token='))?.split('=')[1] ?? "");
    }

    const resp = await fetch(HTTP_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken ? `${authToken}` : "",
        },
        body: JSON.stringify({ query: request.text, variables }),
    });

    if (!resp.ok) {
        debugger;
        throw new Error("Response failed. " + resp.status + " " + resp.statusText);
    }
    return await resp.json();
};

export const environment = new Environment({
    network: Network.create(fetchGraphQL),
});