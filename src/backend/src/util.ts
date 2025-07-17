import { randomBytes } from "crypto";

let uploadKey: string | null = null;
let authKey: string | null = null;

// HMAC key generated per worker, in a bigger deployment this should 
// be some kind of distributed system via redis or memcached
export function getUploadHmacKey(): string {
    if (uploadKey === null) {
        uploadKey = randomBytes(64).toString('base64');
    }

    return uploadKey;
}

export function getAuthHmacKey(): string {
    if (authKey === null) {
        authKey = randomBytes(64).toString('base64');
    }

    return authKey;
}