import { Image, ImageData } from "../database.js";

import { GalleryImageResolvers } from "../__generated__/resolvers-types.js";

export const imageResolvers: GalleryImageResolvers = {
    url: (parent) => {
        return `${process.env.HOST}static/image/${parent.id}`
    },
    thumbUrl: async (parent) => {
        return `${process.env.HOST}static/image/${parent.id}/thumb`
    }
}