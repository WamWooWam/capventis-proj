import { MutationResolvers } from "../__generated__/resolvers-types.js";
import { albumMutators } from "./album.mutators.js";
import { imageMutators } from "./image.mutators.js";
import { userMutators } from "./user.mutators.js";

export const mutationResolvers: MutationResolvers = {
    ...albumMutators,
    ...imageMutators,
    ...userMutators,
}