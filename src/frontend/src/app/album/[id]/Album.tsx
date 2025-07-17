"use client"

import { use, useEffect, useState } from "react"
import { useLazyLoadQuery, usePaginationFragment } from "react-relay"

import { AlbumQuery } from "@/__generated__/AlbumQuery.graphql"
import { Album_albumImages$key } from "@/__generated__/Album_albumImages.graphql"
import Button from "@/components/Button"
import Link from "next/link"
import UploadDialog from "./components/UploadDialog"
import dynamic from "next/dynamic"
import { graphql } from "relay-runtime"
import { useInView } from "react-intersection-observer"

const albumsFragment = graphql`
    fragment Album_albumImages on GalleryAlbum
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "ID" }
    )
    @refetchable(queryName: "AlbumImagesPaginationQuery") {
        imagesConnection(first: $first, after: $after)
            @connection(key: "Album__imagesConnection") {
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
    query AlbumQuery($id: ID!) {
        albums(ids: [$id]) {
            id,
            name,
            count,
            ...Album_albumImages
        }
    }
`

function _AlbumPage({ id }: { id: string }) {
    const albumView = useLazyLoadQuery<AlbumQuery>(albumQuery, { id })
    const album = albumView.albums![0]!;
    const {
        data,
        hasNext,
        loadNext,
        isLoadingNext,
    } = usePaginationFragment<AlbumQuery, Album_albumImages$key>(albumsFragment, { ...album });

    const [isShowingUpload, setIsShowingUpload] = useState<boolean>(false);
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView && hasNext && !isLoadingNext) {
            loadNext(10);
        }
    }, [inView, hasNext, isLoadingNext]);

    return (
        <>
            <UploadDialog albumId={album.id} isOpen={isShowingUpload} onClosed={() => setIsShowingUpload(false)} />

            <div className="grid grid-cols-1 min-md:grid-cols-2">
                <div>
                    <h1 className="text-4xl m-0.5 mt-4 mb-1">{album.name}</h1>
                    <h4 className="m-0.5 mb-2">{album.count} photos - <Link href='/' className="text-blue-500">Back to list</Link></h4>
                </div>
                <div className="flex items-center justify-end mr-0.5">
                    <Button onClick={() => setIsShowingUpload(true)}>Upload</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {...data.imagesConnection.edges!.map((image) => (
                    <img key={image?.node?.id}
                        src={image?.node?.url}
                        alt={image?.node?.description ?? undefined}
                        className="w-full h-full object-contain rounded-md object-bottom aspect-square" />
                ))}
                <div ref={ref} />
            </div>
        </>
    )
}

const AlbumPage = dynamic(() => Promise.resolve(_AlbumPage), { ssr: false });
export default AlbumPage;