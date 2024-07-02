'use server';

const SERVER_URL_PREFIX = process.env.SERVER_URL;
const URLS = {
    "licences": "licences"
};

export async function getLicences() {
    return await fetch(`${SERVER_URL_PREFIX}/${URLS.licences}`)
        .then(res => res.json());
}
