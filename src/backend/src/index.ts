import 'dotenv/config'

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { GalleryAlbum } from './__generated__/resolvers-types.js';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@as-integrations/express5';
import { fileURLToPath } from 'url';
import http from 'http';
import { readFile } from "fs/promises";
import registerStaticRoutes from "./controllers/static-controller.js";
import { resolvers } from './resolvers/index.js';
import { sync } from "./database.js"

export interface MyContext {
    dataSources: {
        albums: GalleryAlbum[];
    };
}

(async () => {
    await sync();

    const typeDefsFile = fileURLToPath(import.meta.resolve("@capventis-proj/schema/gallery.graphql"))
    const typeDefs = await readFile(typeDefsFile, { encoding: 'utf-8' });

    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers: resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    app.use(cors<cors.CorsRequest>())
    
    app.use('/graphql',
        express.json(),
        expressMiddleware(server),
    );

    registerStaticRoutes(app);

    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();