"use client"

import { AlbumImagesPaginationQuery } from "@/__generated__/AlbumImagesPaginationQuery.graphql"
import { pageAlbumQuery } from "@/__generated__/pageAlbumQuery.graphql"
import { useLazyLoadQuery, usePaginationFragment } from "react-relay"
import { graphql } from "relay-runtime"

const albumQuery = graphql`
query pageAlbumQuery($id: ID!) {
    albums(ids: [$id]) {
        id,
        name
    }
}
`

const albumsFragment = graphql`
fragment pageQuery_albumImages on GalleryAlbum
@argumentDefinitions(
    first: { type: "Int", defaultValue: 5 }
    after: { type: "Int" }
)
@refetchable(queryName: "AlbumImagesPaginationQuery") {
    imagesConnection(first: $first, after: $after)
        @connection(key: "pageAlbums__imagesConnection") {
        edges {
            node {
                id,
                name,
                description,
                url
            }
        }
    }
}
`
export default function PaginatedAlbumView({
    albumId,
}: {
    albumId: string
}) {
    const album = useLazyLoadQuery<pageAlbumQuery>(albumQuery, { id: albumId })
    const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<AlbumImagesPaginationQuery, any>(albumsFragment, album.albums![0]!);
    console.log(data);

    return <p>Post: {data}</p>
}