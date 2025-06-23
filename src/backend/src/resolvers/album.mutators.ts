import { Album } from "../database.js";
import { MutationResolvers } from "../__generated__/resolvers-types.js";
import { createAlbum } from "../adapter.js";
import { randomUUID } from "crypto";

export const albumMutators: Partial<MutationResolvers> = {
    createAlbum: async (parent, args) => {
        const album = await Album.create({
            id: randomUUID(),
            name: args.input.name
        });

        return createAlbum(album);
    },
    updateAlbum: async (parent, args) => {
        const { id } = args.input;
        const album = await Album.findByPk(id);
        if (!album) throw new Error("Not found!");

        if (args.input.name) {
            album.name = args.input.name;
        }

        await album.save();

        return createAlbum(album)
    },
    deleteAlbum: async (parent, args) => {
        let ids = []
        for (const id of args.input) {
            try {
                const album = await Album.findByPk(id);
                if (!album) throw new Error("Not found!");
                await album.destroy();

                ids.push(id);
            }
            catch (e) {

            }
        }

        return ids;
    }
}