import { Album, AlbumImage, Image } from "./database.js";
import { GalleryAlbum, GalleryImage } from "./__generated__/resolvers-types.js";

export function createAlbum(album: Album): GalleryAlbum {
    return ({
        id: album.id,
        name: album.name
    }) as GalleryAlbum;
}

export function createImage(image: Image): GalleryImage {
    return ({
        id: image.id,
        name: image.name,
        description: image.description,
        width: image.width,
        height: image.height,
        url: `${process.env.HOST}static/image/${image.id}`
    })
}