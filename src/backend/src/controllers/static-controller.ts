import { Album, Image, ImageData } from '../database.js';
import { Request, Response, Router } from 'express';
import { createHmac, verify } from 'crypto';
import multer, { memoryStorage } from 'multer'

import { fileTypeFromBuffer } from 'file-type/core'
import { imageSize } from 'image-size'
import { getUploadHmacKey } from '../util.js';
import sharp from 'sharp';

const upload = multer({ storage: memoryStorage(), limits: { fileSize: 5_000_000 } });

// /static/image/:id
async function getImage(req: Request, resp: Response) {
    const { id } = req.params;

    if (!id) {
        resp
            .status(400)
            .send("Bad request.");
        return;
    }

    const image = await Image.findByPk(id, {
        include: ImageData
    });

    if (!image || !image.ImageDatum) {
        resp
            .status(404)
            .send("Not found.");
        return;
    }

    const data = image.ImageDatum;

    resp.contentType(data.mimeType)
        .send(data.data)
}

async function getImageThumbnail(req: Request, resp: Response) {
    const { id } = req.params;

    if (!id) {
        resp
            .status(400)
            .send("Bad request.");
        return;
    }

    const image = await Image.findByPk(id, {
        include: ImageData
    });

    if (!image || !image.ImageDatum) {
        resp
            .status(404)
            .send("Not found.");
        return;
    }

    const data = image.ImageDatum;

    resp.contentType("image/jpeg")
        .send(data.thumbnail)
}


async function uploadImage(req: Request, resp: Response) {
    const now = Date.now();
    const uploadKey = getUploadHmacKey()
    if (!!!uploadKey) {
        resp
            .status(500)
            .send("Internal server error.");
        return;
    }

    const token = req.header("authorization")?.trim();
    if (!!!token) {
        resp
            .status(401)
            .send("Unauthorized.");
        return;
    }

    const parts = token.substring(0, token.lastIndexOf('.'));
    const hash = token.substring(token.lastIndexOf('.') + 1);
    const correctHash = createHmac('sha256', uploadKey)
        .update(parts)
        .digest('base64')

    // invalid HMAC signature, reject imediately
    if (hash !== correctHash) {
        resp
            .status(401)
            .send("Unauthorized.");
        return;
    }

    const id = atob(parts.substring(0, parts.lastIndexOf('.')));
    const expiresAt = Date.parse(atob(parts.substring(parts.lastIndexOf('.') + 1)))
    const delta = now - expiresAt;
    // token has expired, reject
    if (delta >= 0) {
        resp
            .status(401)
            .send("Unauthorized.");
        return;
    }

    const image = await Image.findByPk(id)
    if (!image) {
        resp
            .status(404)
            .send("Not found.");
        return;
    }

    const file = req.file;
    if (!file) {
        resp
            .status(400)
            .send("Bad request.");
        return;
    }

    const type = await fileTypeFromBuffer(file?.buffer!)
    if (!type || !type.mime.startsWith("image/")) {
        resp
            .status(400)
            .send("Bad request.");
        return;
    }

    const imageBuffer = new Uint8Array(file?.buffer!);
    const sImage = sharp(imageBuffer);

    const metadata = await sImage.metadata();
    if (!metadata.width || !metadata.height) {
        resp
            .status(400)
            .send("Bad request.");
        return;
    }

    const thumbnail = await sImage
        .clone()
        .resize(400, 400, { fit: 'inside' })
        .toFormat('jpeg', { mozjpeg: true })
        .toBuffer();

    image.width = metadata.width;
    image.height = metadata.height;

    await image.createImageDatum({
        data: <ArrayBuffer>req.file!.buffer,
        thumbnail: thumbnail,
        mimeType: type.mime
    });

    await image.save();

    resp
        .status(200)
        .send("OK");
}

export default function registerRoutes(router: Router) {
    router.use((req, resp, next) => {
        resp.setHeader("Cache-Control", "public, max-age=604800, immutable");
        next();
    });

    router.get('/static/image/:id', getImage);
    router.get('/static/image/:id/thumb', getImageThumbnail);
    router.post('/static/image', upload.single('image'), uploadImage)
}
