import { PointerEvent, useState } from "react";

type AlbumImagesProps = {
    readonly images: ReadonlyArray<{
        readonly description: string | null | undefined;
        readonly height: number;
        readonly name: string | null | undefined;
        readonly url: string;
        readonly width: number;
    } | null | undefined>;
}

const AlbumImages = (props: AlbumImagesProps) => {
    const [imageIndex, setImageIndex] = useState(0);

    const pointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const domRect = e.currentTarget.getBoundingClientRect();
        const x = e.pageX - domRect.x;
        const idx = Math.floor((x / domRect.width) * props.images.length);
        setImageIndex(idx);
    }

    const pointerCancel = (e: PointerEvent) => {
        setImageIndex(0);
    }

    const image = props.images![imageIndex];

    return (
        <div onPointerMove={pointerMove}
            onPointerLeave={pointerCancel}
            onPointerCancel={pointerCancel}
            className="w-[100%] h-[100%]">
            {image ? <img className="rounded-md object-cover w-[100%] h-[100%]" src={image.url} /> : undefined}
        </div>
    )
};

export default AlbumImages;