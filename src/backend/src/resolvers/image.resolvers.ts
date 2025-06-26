import { GalleryImageResolvers } from "../__generated__/resolvers-types.js";
import { cleanId } from "../adapter.js";

export const imageResolvers: GalleryImageResolvers = {
    url: (parent) => {
        return `${process.env.HOST}static/image/${cleanId(parent.id)}`
    }
}