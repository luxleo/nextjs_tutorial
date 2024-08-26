'use server';
import {SERVER_URL_PREFIXED} from "@/app/subpage/prefixed";
import {ContactPayload} from "@/app/subpage/cs/contact-form";

const URL_PREFIXED = `${SERVER_URL_PREFIXED}/api/safe/inquiry`;

const URLS = {
    "create_inquiry": `${URL_PREFIXED}/create`
}

export const createInquiry = async (payload: ContactPayload) => {
    console.log(`============ server comp called payload : ${JSON.stringify(payload)}\nrequest to : ${URLS.create_inquiry}`);
    return await fetch(URLS.create_inquiry, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.ok);
}