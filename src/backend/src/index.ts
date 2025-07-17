import 'dotenv/config'

import { User, sync } from "./database.js"

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import cors from 'cors';
import { createHmac } from 'crypto';
import express from 'express';
import { expressMiddleware } from '@as-integrations/express5';
import { fileURLToPath } from 'url';
import { getAuthHmacKey } from './util.js';
import http from 'http';
import { readFile } from "fs/promises";
import registerStaticRoutes from "./controllers/static-controller.js";
import { resolvers } from './resolvers/index.js';

export interface ApolloContext {
    user: User | null
}

(async () => {
    await sync();

    const typeDefsFile = fileURLToPath(import.meta.resolve("@capventis-proj/schema/gallery.graphql"))
    const typeDefs = await readFile(typeDefsFile, { encoding: 'utf-8' });

    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer<ApolloContext>({
        typeDefs,
        resolvers: resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(cors<cors.CorsRequest>())

    app.use('/graphql',
        express.json(),
        expressMiddleware(server, {
            // TODO: probably a different file
            context: async ({ req, res }) => {
                const now = Date.now();
                const uploadKey = getAuthHmacKey()
                if (!uploadKey) {
                    return { user: null }
                }

                let token = req.header("authorization")?.trim();
                if (!token) {
                    token = req.cookies?.["token"].trim();
                    if (!token) {
                        return { user: null }
                    }
                }

                const parts = token.substring(0, token.lastIndexOf('.'));
                const hash = token.substring(token.lastIndexOf('.') + 1);
                const correctHash = createHmac('sha256', uploadKey)
                    .update(parts)
                    .digest('base64')

                // invalid HMAC signature, reject imediately
                if (hash !== correctHash) {
                    return { user: null }
                }

                const id = atob(parts.substring(0, parts.lastIndexOf('.')));
                const expiresAt = Date.parse(atob(parts.substring(parts.lastIndexOf('.') + 1)))
                const delta = now - expiresAt;
                // token has expired, reject
                if (delta >= 0) {
                    return { user: null }
                }

                return { user: await User.findByPk(id) }
            }
        }),
    );

    registerStaticRoutes(app);

    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();