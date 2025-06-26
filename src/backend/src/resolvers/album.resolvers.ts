import { AlbumImage, Image } from "../database.js";
import { GalleryAlbumImagesConnection, GalleryAlbumResolvers, GalleryImage } from "../__generated__/resolvers-types.js";

import { Op } from "sequelize";
import { cleanId, createImage } from "../adapter.js";

export const albumResolvers: GalleryAlbumResolvers = {
    count: async (parent, args, contextValue, info): Promise<number> => {
        return await AlbumImage.count({ where: { AlbumId: cleanId(parent.id) } })
    },
    images: async (parent, args, contextValue, info): Promise<GalleryImage[]> => {
        const result = await AlbumImage.findAll({
            where: {
                AlbumId: cleanId(parent.id)
            },
            include: [Image],
            order: ["index"]
        })

        return result.filter(m => m.Image?.width != -1).map(m => createImage(m.Image!))
    },
    imagesConnection: async (parent, args)
        : Promise<GalleryAlbumImagesConnection> => {
        const { first, after } = args;
        if (first != null && first < 0)
            throw new Error("first must be positive");

        const edges = await AlbumImage.findAll({
            where: {
                AlbumId: cleanId(parent.id)
            },
            include: [Image],
            order: ["index"],
            limit: !!first ? first + 1 : undefined,
            offset: !!after ? after : undefined
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