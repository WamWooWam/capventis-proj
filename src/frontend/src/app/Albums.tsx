"use client"

import { graphql, useLazyLoadQuery } from "react-relay";
import { use, useState } from "react";

import AlbumView from "./components/AlbumView";
import { AlbumsViewQuery } from "@/__generated__/AlbumsViewQuery.graphql";
import Button from "@/components/Button";
import CreateAlbumDialog from "./components/CreateAlbumDialog";
import dynamic from "next/dynamic";

const albumsQuery = graphql`
  query AlbumsViewQuery {
    albums {
      id,
      name,
      imagesConnection(first: 8) {
        images {
          name
          description,
          width,
          height,
          url,
          thumbUrl
        }
      }
    }
  }
`

function _Albums({ name }: { name?: string }) {
  const data = useLazyLoadQuery<AlbumsViewQuery>(albumsQuery, {});
  const [isShowingDialog, setIsShowingDialog] = useState<boolean>(false);
  return (
    <>
      <CreateAlbumDialog isOpen={isShowingDialog} onClosed={() => setIsShowingDialog(false)} />

      <div>
        <div className="grid grid-cols-1 min-md:grid-cols-2">
          <div>
            <h1 className="text-4xl m-0.5 mt-4 mb-1">{name}'s Albums</h1>
            <h4 className="m-0.5 mb-2">Showing {data.albums?.length ?? 0} albums</h4>
          </div>
          <div className="flex items-center justify-end mr-0.5">
            <Button onClick={() => setIsShowingDialog(true)}>Create</Button>
          </div>
        </div>
        {
          data.albums != null ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {...data.albums!.map((album) => (<AlbumView key={album!.id} {...album}></AlbumView>))}
            </div>
          ) : null
        }
      </div>
    </>
  );
}

const Albums = dynamic(() => Promise.resolve(_Albums), { ssr: false });
export default Albums;