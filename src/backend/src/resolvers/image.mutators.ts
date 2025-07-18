import { createHmac, randomUUID } from "crypto";
import { MutationResolvers } from "../__generated__/resolvers-types.js";
import { Album, AlbumImage, Image } from "../database.js";
import { createImage } from "../adapter.js";
import { getUploadHmacKey } from "../util.js";
import { ApolloContext } from "../index.js";

export const imageMutators: Partial<MutationResolvers> = {
    createImage: async (parent, args, context: ApolloContext) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        const album = await Album.findByPk(args.input.album)
        if (!album || album.UserId !== context.user.id)
            throw new Error("Album not found!")

        const uploadKey = getUploadHmacKey()
        if (!uploadKey)
            throw new Error("Uploads are not configured on this server.")

        const expireDate = new Date(Date.now() + (10 * 60_000)).toISOString();
        const maxIndex = <number>(await AlbumImage.max("index", { where: { AlbumId: album.id } })) + 10;

        const keys = [];
        for (let i = 0; i < args.input.requests.length; i++) {
            const request = args.input.requests[i];
            const { name, description } = request

            const id = `Image_${randomUUID()}`;
            const image = await Image.create({
                id,
                name,
                description,
                width: -1,
                height: -1,

                UserId: context.user.id
            });

            await album.addImage(image, { through: { index: maxIndex + (i * 10) } })

            // this generates a key that is usable by the client to upload a file, they provide this as the Authorization header
            // and it encodes within it the album ID, and it's own expiry time
            // the last part is a HMAC hash of the first two parts using our secret key, this ensures only we can generate the 
            // required hashes for validation :D
            const key = `${btoa(id)}.${btoa(expireDate)}`
            const hash = createHmac('sha256', uploadKey)
                .update(key)
                .digest('base64')

            keys.push({
                token: `${key}.${hash}`,
                expiresAt: expireDate
            })
        }

        return keys;
    },
    updateImage: async (parent, args, context: ApolloContext) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        const { id } = args.input;
        const image = await Image.findByPk(id);
        if (!image || image.UserId !== context.user.id)
            throw new Error("Not found!");

        if (args.input.name) {
            image.name = args.input.name;
        }

        if (args.input.description) {
            image.description = args.input.description;
        }

        await image.save();

        return createImage(image)
    },
    deleteImage: async (parent, args, context: ApolloContext) => {
        if (context.user === null)
            throw new Error("Unauthorised");

        let ids = []
        for (const id of args.input) {
            try {
                const image = await Image.findByPk(id);
                if (!image || image.UserId !== context.user.id)
                    throw new Error("Not found!");
                await image.destroy();

                ids.push(id);
            }
            catch (e) {

            }
        }

        return ids;
    }
}