import { Album, AlbumImage, Image } from "./database.js";
import { GalleryAlbum, GalleryImage } from "./__generated__/resolvers-types.js";

export function createAlbum(album: Album | null): GalleryAlbum {
    if (!album)
        return null!;
    return ({
        id: `Album_${album.id}`,
        name: album.name
    }) as GalleryAlbum;
}

export function createImage(image: Image | null): GalleryImage {
    if (!image)
        return null!;
    return ({
        id: `Image_${image.id}`,
        name: image.name,
        description: image.description,
        width: image.width,
        height: image.height,
        url: `${process.env.HOST}static/image/${image.id}`
    })
}

/**
 * @deprecated TODO: this wont be necessary 
 */
export function cleanId(id: string) {
    const idx = id.indexOf('_');
    if (idx != -1) {
        return id.substring(idx + 1);
    }

    return id;
}