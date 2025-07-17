import { Album, Image, User, sequelize } from "../database.js";
import { QueryResolvers, Resolvers } from "../__generated__/resolvers-types.js";
import { createAlbum, createImage, createUser } from "../adapter.js";

import { ApolloContext } from "../index.js";
import { Op } from "sequelize";

export const queryResolvers: QueryResolvers = {
    user: async (parent, params, context) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        return createUser(context.user);
    },
    albums: async (parent, params, context) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        if (params.ids) {
            return (await Album.findAll({ where: { id: { [Op.in]: [...params.ids] }, UserId: context.user.id } }))
                .map(createAlbum)
        }

        return (await Album.findAll({ where: { UserId: context.user.id } }))
            .map(createAlbum)
    },
    node: async (parent, params) => {
        if (!params.id)
            return null;

        const idx = params.id.indexOf('_');
        const type = params.id.substring(0, idx).toLowerCase();
        const id = params.id;

        switch (type) {
            case "user":
                return createUser(await User.findByPk(id));
            case "album":
                return createAlbum(await Album.findByPk(id));
            case "image":
                return createImage(await Image.findByPk(id));
        }

        return null;
    }
};