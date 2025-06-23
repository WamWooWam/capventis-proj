import { memo } from "react";

type AlbumViewProps = {
    readonly id?: string | undefined;
    readonly name?: string | undefined;
    readonly imagesConnection?: {
        readonly images: ReadonlyArray<{
            readonly description: string | null | undefined;
            readonly height: number;
            readonly name: string | null | undefined;
            readonly url: string;
            readonly width: number;
        } | null | undefined> | null | undefined;
    }
}

const AlbumView = memo((a: AlbumViewProps) => (
    <a className="border rounded shadow-lg cursor-pointer m-2" href="#">
        <p>{a.name}</p>
        {a.imagesConnection?.images?.[0] ? <img src={a.imagesConnection.images[0].url} /> : undefined}
    </a>
))

export default AlbumView