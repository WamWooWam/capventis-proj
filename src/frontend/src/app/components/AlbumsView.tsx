import AlbumView from "./AlbumView";
import { AlbumsViewQuery } from "@/__generated__/AlbumsViewQuery.graphql";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";

const albumsQuery = graphql`
  query AlbumsViewQuery {
    albums {
      id,
      name,
      imagesConnection(first: 4) {
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
export default function AlbumsView() {
    const data = useLazyLoadQuery<AlbumsViewQuery>(albumsQuery, {});
    console.log(data)
    return (
        <div>
            <h1 className="text-4xl m-0.5 mt-4 mb-1">Albums</h1>
            <h4 className="m-0.5 mb-2">Showing {data.albums?.length} albums</h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -ml-2 -mr-2">
                {...data.albums!.map((album) => (<AlbumView key={album!.id} {...album}></AlbumView>))}
            </div>
        </div>
    );
}
