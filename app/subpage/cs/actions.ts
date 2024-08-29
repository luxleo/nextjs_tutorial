'use server';
import { render } from '@react-email/components';
import {SERVER_URL_PREFIXED} from "@/app/subpage/prefixed";
import {ContactPayload} from "@/app/subpage/cs/contact-form";
import nodemailer from 'nodemailer';
import {Template} from './react-email/Template';

const URL_PREFIXED = `${SERVER_URL_PREFIXED}/api/safe/inquiry`;

const URLS = {
    "create_inquiry": `${URL_PREFIXED}/create`
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'lux00leo@gmail.com',
        pass: 'zjsdbvyaxjydmifc',
    },
})

export const sendVerificationEmail = async (targetEmail: string) => {
    const verificationCode = generateVerificationCode();
    const emailHtml = await render(Template({verification_code:  verificationCode}));

    const options = {
        from: 'lux00leo@gmail.com',
        to: targetEmail,
        subject: 'hk verification email test',
        html: emailHtml,
    };

    // @ts-ignore
    const response = await transporter.sendMail(options);
    console.log(response);
    return verificationCode;
};

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

function generateVerificationCode() {
    let answer = '';
    for (let i = 0; i < 4; i++) {
        answer += Math.floor(Math.random() * 10);
    }
    return answer;
}
