"use client"

import { Environment, FetchFunction, Network } from "relay-runtime";
import { RelayEnvironmentProvider, graphql, loadQuery, useLazyLoadQuery, usePreloadedQuery } from "react-relay";

import AlbumsView from "./components/album/AlbumsView";
import Image from "next/image";

const HTTP_ENDPOINT = "http://localhost:4000/graphql/";

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request.text, variables }),
  });
  if (!resp.ok) {
    throw new Error("Response failed.");
  }
  return await resp.json();
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
});

export default function Home() {
  return (
    <div className="max-w-[1200px] ml-auto mr-auto">
      <RelayEnvironmentProvider environment={environment}>
        <AlbumsView />
      </RelayEnvironmentProvider>
    </div>
  );
}
