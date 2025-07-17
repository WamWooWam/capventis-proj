import { Album, AlbumImage, Image, User } from "./database.js";
import { GalleryAlbum, GalleryImage, GalleryUser } from "./__generated__/resolvers-types.js";

export function createAlbum(album: Album | null): GalleryAlbum {
    if (!album)
        return null!;
    return ({
        __typename: 'GalleryAlbum',
        id: album.id,
        name: album.name
    }) as GalleryAlbum;
}

export function createImage(image: Image | null): GalleryImage {
    if (!image)
        return null!;
    return ({
        __typename: 'GalleryImage',
        id: image.id,
        name: image.name,
        description: image.description,
        width: image.width,
        height: image.height
    }) as GalleryImage
}

export function createUser(user: User | null): GalleryUser {
    if (!user)
        return null!

    return ({
        id: user.id,
        name: user.name,
        email: user.email
    }) as GalleryUser
}