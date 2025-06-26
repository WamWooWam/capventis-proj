import { memo } from "react";
import AlbumImages from "./AlbumImages";
import Link from "next/link";

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
    <Link className="cursor-pointer" href={`/album/${a.id}`}>
        <div className="aspect-square mb-2 rounded-md bg-gray-300 transition-all hover:drop-shadow-md hover:-translate-1">
            <AlbumImages images={a.imagesConnection?.images ?? []} />
        </div>
        <p>{a.name}</p>
    </Link>
))

export default AlbumView