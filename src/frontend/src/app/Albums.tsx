"use client"

import { graphql, useLazyLoadQuery } from "react-relay";
import { pageAlbumsViewQuery } from "@/__generated__/pageAlbumsViewQuery.graphql";
import Button from "@/components/Button";
import AlbumView from "./components/AlbumView";
import CreateAlbumDialog from "./components/CreateAlbumDialog";
import { useState } from "react";
import dynamic from "next/dynamic";

const albumsQuery = graphql`
  query pageAlbumsViewQuery {
    albums {
      id,
      name,
      imagesConnection(first: 8) {
        images {
          name
          description,
          width,
          height,
          url
        }
      }
    }
  }
`

function _Albums() {
  const data = useLazyLoadQuery<pageAlbumsViewQuery>(albumsQuery, {});
  const [isShowingDialog, setIsShowingDialog] = useState<boolean>(false);
  return (
    <>
      <CreateAlbumDialog isOpen={isShowingDialog} onClosed={() => setIsShowingDialog(false)} />
      <div className="max-w-[1200px] ml-auto mr-auto">
        <div>
          <div className="grid grid-cols-1 min-md:grid-cols-2">
            <div>
              <h1 className="text-4xl m-0.5 mt-4 mb-1">Albums</h1>
              <h4 className="m-0.5 mb-2">Showing {data.albums?.length} albums</h4>
            </div>
            <div className="flex items-center justify-end mr-0.5">
              <Button onClick={() => setIsShowingDialog(true)}>Create</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {...data.albums!.map((album) => (<AlbumView key={album!.id} {...album}></AlbumView>))}
          </div>
        </div>
      </div>
    </>
  );
}

const Albums = dynamic(() => Promise.resolve(_Albums), { ssr: false });
export default Albums;