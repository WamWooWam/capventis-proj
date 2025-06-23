import { QueryResolvers, Resolvers } from "../__generated__/resolvers-types.js";

import { Album } from "../database.js";
import { createAlbum } from "../adapter.js";

export const queryResolvers: QueryResolvers = {
    albums: async () =>
        (await Album.findAll()).map(createAlbum),
};