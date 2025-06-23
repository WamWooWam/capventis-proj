import { Album, AlbumImage, Image } from "../database.js";
import { createHmac, randomUUID } from "crypto";

import { MutationResolvers } from "../__generated__/resolvers-types.js";
import { albumMutators } from "./album.mutators.js";
import { createAlbum } from "../adapter.js";
import { imageMutators } from "./image.mutators.js";

export const mutationResolvers: MutationResolvers = {
    ...albumMutators,
    ...imageMutators,
}