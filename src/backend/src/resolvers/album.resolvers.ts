import { Album, AlbumImage, Image, User } from "../database.js";
import { GalleryAlbumImagesConnection, GalleryAlbumResolvers, GalleryImage, GalleryUser } from "../__generated__/resolvers-types.js";
import { createImage, createUser } from "../adapter.js";

import { Op } from "sequelize";

export const albumResolvers: GalleryAlbumResolvers = {
    owner: async (parent, args, context, info): Promise<GalleryUser> => {
        // little bit expensive but this shouldnt be too bad
        const result = await Album.findByPk(parent.id)

        return createUser(await User.findByPk(result?.UserId));
    },
    count: async (parent, args, context, info): Promise<number> => {
        return await AlbumImage.count({
            where: {
                AlbumId: parent.id
            },
            include: [{
                model: Image,
                where: {
                    width: { [Op.ne]: -1 },
                    height: { [Op.ne]: -1 }
                }
            }]
        })
    },
    images: async (parent, args, context, info): Promise<GalleryImage[]> => {
        const result = await AlbumImage.findAll({
            where: {
                AlbumId: parent.id
            },
            include: [{
                model: Image,
                where: {
                    width: { [Op.ne]: -1 },
                    height: { [Op.ne]: -1 }
                }
            }],
            order: ["index"]
        })

        return result.map(m => createImage(m.Image!))
    },
    imagesConnection: async (parent, args)
        : Promise<GalleryAlbumImagesConnection> => {
        const { first, after } = args;
        if (first != null && first < 0)
            throw new Error("first must be positive");

        const edges = await AlbumImage.findAll({
            where: {
                AlbumId: parent.id,
                index: {
                    [Op.gt]: !!after ? parseInt(after) : 0
                }
            },
            include: [{
                model: Image,
                where: {
                    width: { [Op.ne]: -1 },
                    height: { [Op.ne]: -1 }
                }
            }],
            order: ["index"],
            limit: !!first ? first + 1 : undefined
        })

        const requestedEdges = edges.slice(0, first ?? undefined);

        return {
            edges: requestedEdges.map((edge) => ({
                cursor: edge.index.toString(),
                node: createImage(edge.Image!),
            })),
            images: requestedEdges.map(m => createImage(m.Image!)),
            pageInfo: {
                startCursor: requestedEdges[0]?.index?.toString(),
                endCursor: requestedEdges[requestedEdges.length - 1]?.index?.toString(),
                hasNextPage: !first ? false : edges.length > first,
                hasPreviousPage: !!after
            },
        };
    }
}