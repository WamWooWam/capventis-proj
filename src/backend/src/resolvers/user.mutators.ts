import { BinaryLike, createHmac, pbkdf2, randomBytes, randomUUID } from "crypto";

import { ApolloContext } from "../index.js"
import { MutationResolvers } from "../__generated__/resolvers-types.js";
import { User } from "../database.js";
import { createUser } from "../adapter.js";
import { getAuthHmacKey } from "../util.js";

const hashPassword = (password: string, salt: BinaryLike) =>
    new Promise<ArrayBuffer>((resolve, reject) =>
        pbkdf2(password, salt, 100_000, 64, 'sha512', (err, key) => {
            if (err)
                reject(err);

            resolve(key)
        })
    );

export const userMutators: Partial<MutationResolvers> = {
    createUser: async (parent, args, context: ApolloContext) => {
        const { name, email, password } = args.input;

        const salt = randomBytes(32);
        const hash = await hashPassword(password, salt);

        const user = await User.create({
            id: `User_${randomUUID()}`,
            name: name,
            email: email,
            hash, salt
        })

        return createUser(user);
    },
    createLogin: async (parent, args, context: ApolloContext) => {
        const { email, password } = args.input;
        const authKey = getAuthHmacKey()
        const expireDate = new Date(Date.now() + (10 * 60_000)).toISOString();

        const user = await User.findOne({ where: { email } });
        if (!user)
            throw new Error("Invalid email/password.");

        const hash = await hashPassword(password, Buffer.from(user.salt));
        if (Buffer.from(hash).compare(Buffer.from(user.hash)) !== 0)
            throw new Error("Invalid email/password.");

        const key = `${btoa(user.id)}.${btoa(expireDate)}`
        const keyHash = createHmac('sha256', authKey)
            .update(key)
            .digest('base64')

        return { token: `${key}.${keyHash}` };
    },
}