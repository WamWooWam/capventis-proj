import { Album } from "../database.js";
import { ApolloContext } from "../index.js";
import { MutationResolvers } from "../__generated__/resolvers-types.js";
import { createAlbum } from "../adapter.js";
import { randomUUID } from "crypto";

export const albumMutators: Partial<MutationResolvers> = {
    createAlbum: async (parent, args, context: ApolloContext) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        const album = await Album.create({
            id: `Album_${randomUUID()}`,
            name: args.input.name,

            UserId: context.user.id
        });

        return createAlbum(album);
    },
    updateAlbum: async (parent, args, context: ApolloContext) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        const { id } = args.input;
        const album = await Album.findByPk(id);
        if (!album || album.UserId !== context.user.id)
            throw new Error("Not found!");

        if (args.input.name) {
            album.name = args.input.name;
        }

        await album.save();

        return createAlbum(album)
    },
    deleteAlbum: async (parent, args, context: ApolloContext) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        let ids = []
        for (const id of args.input) {
            try {
                const album = await Album.findByPk(id);
                if (!album || album.UserId !== context.user.id)
                    throw new Error("Not found!");
                
                await album.destroy();

                ids.push(id);
            }
            catch (e) {

            }
        }

        return ids;
    }
}