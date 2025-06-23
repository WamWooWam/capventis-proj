import { Resolvers } from "../__generated__/resolvers-types.js";
import { albumResolvers } from "./album.resolvers.js";
import { mutationResolvers } from "./mutation.resolvers.js";
import { queryResolvers } from "./query.resolvers.js";

export const resolvers : Resolvers ={
    Query: queryResolvers,
    GalleryAlbum: albumResolvers,
    Mutation: mutationResolvers
}