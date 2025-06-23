import { AlbumImage, Image } from "../database.js";
import { GalleryAlbumImagesConnection, GalleryAlbumResolvers, GalleryImage } from "../__generated__/resolvers-types.js";

import { Op } from "sequelize";
import { createImage } from "../adapter.js";

export const albumResolvers: GalleryAlbumResolvers = {
    images: async (parent, args, contextValue, info): Promise<GalleryImage[]> => {
        const result = await AlbumImage.findAll({
            where: {
                AlbumId: parent.id
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
                AlbumId: parent.id
            },
            include: [Image],
            order: ["index"],
            limit: first != null ? first + 1 : undefined,
            offset: after != null ? after : undefined
        })

        const requestedEdges = edges.slice(0, first ?? undefined);

        return {
            edges: requestedEdges.map((edge) => ({
                cursor: edge.index,
                node: createImage(edge.Image!),
            })),
            images: requestedEdges.map(m => createImage(m.Image!)),
            pageInfo: {
                startCursor: requestedEdges[0]?.index,
                endCursor: requestedEdges[requestedEdges.length - 1]?.index,
                hasNextPage: !first ? false : edges.length > first,
            },
        };
    }
}