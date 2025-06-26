import { QueryResolvers, Resolvers } from "../__generated__/resolvers-types.js";

import { Album, Image, sequelize } from "../database.js";
import { createAlbum, createImage } from "../adapter.js";
import { Op } from "sequelize";

export const queryResolvers: QueryResolvers = {
    albums: async (parent, params) => {
        if (params.ids) {
            return (await Album.findAll({ where: { id: { [Op.in]: [...params.ids] } } }))
                .map(createAlbum)
        }
        return (await Album.findAll()).map(createAlbum)
    },
    node: async (parent, params) => {
        if (!params.id)
            return null;

        const idx = params.id.indexOf('_');
        const type = params.id.substring(0, idx).toLowerCase();
        const id = params.id.substring(idx + 1);

        switch (type) {
            case "album":
                return createAlbum(await Album.findByPk(id));
            case "image":
                return createImage(await Image.findByPk(id));
        }

        return null;
    }
};