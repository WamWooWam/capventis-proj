"use client"

import Button from "@/components/Button"
import { graphql } from "relay-runtime"
import { useLazyLoadQuery, usePaginationFragment } from "react-relay"
import { pagePaginatedAlbumViewQuery } from "@/__generated__/pagePaginatedAlbumViewQuery.graphql"
import { pagePaginatedAlbumView_albumImages$key } from "@/__generated__/pagePaginatedAlbumView_albumImages.graphql"
import { use } from "react"

const albumsFragment = graphql`
fragment pagePaginatedAlbumView_albumImages on GalleryAlbum
@argumentDefinitions(
    first: { type: "Int", defaultValue: 5 }
    after: { type: "Int" }
)
@refetchable(queryName: "AlbumImagesPaginationQuery") {
    imagesConnection(first: $first, after: $after)
        @connection(key: "pagePaginatedAlbumView__imagesConnection") {
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

const albumQuery = graphql`
query pagePaginatedAlbumViewQuery($id: ID!) {
    albums(ids: [$id]) {
        id,
        name,
        count,
        ...pagePaginatedAlbumView_albumImages
    }
}
`

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const albumView = useLazyLoadQuery<pagePaginatedAlbumViewQuery>(albumQuery, { id })
    const album = albumView.albums![0]!;
    const {
        data,
        hasNext,
        loadNext,
        isLoadingNext
    } = usePaginationFragment<pagePaginatedAlbumViewQuery, pagePaginatedAlbumView_albumImages$key>(albumsFragment, { ...album });

    return (
        <div className="max-w-[1200px] ml-auto mr-auto">
            <div className="grid grid-cols-1 min-md:grid-cols-2">
                <div>
                    <h1 className="text-4xl m-0.5 mt-4 mb-1">{album.name}</h1>
                    <h4 className="m-0.5 mb-2">{album.count} photos.</h4>
                </div>
                <div className="flex items-center justify-end mr-0.5">
                    <Button>Upload</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 -mx-2">
                {...data.imagesConnection.edges!.map((image) => (
                    <img key={image?.node?.id} 
                         src={image?.node?.url} 
                         alt={image?.node?.description ?? undefined}
                         className="object-contain mx-2 rounded-md" />
                ))}
            </div>
        </div>
    )
}