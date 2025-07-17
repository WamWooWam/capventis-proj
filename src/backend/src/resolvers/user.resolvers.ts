import { Album } from "../database.js";
import { GalleryUserResolvers } from "../__generated__/resolvers-types.js";
import { createAlbum } from "../adapter.js";

export const userResolvers: GalleryUserResolvers = {
    albums: async (parent, params, context) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        return (await Album.findAll({ where: { UserId: parent.id } }))
            .map(createAlbum)
    }
}