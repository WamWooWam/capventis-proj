import PaginatedAlbumView from "./components/PaginatedAlbumView"

export default async function AlbumPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (<PaginatedAlbumView albumId={id} />)
}