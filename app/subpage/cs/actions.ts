'use server';
import { render } from '@react-email/components';
import {SERVER_URL_PREFIXED} from "@/app/subpage/prefixed";
import {ContactPayload} from "@/app/subpage/cs/contact-form";
import nodemailer from 'nodemailer';
import Template from "@/app/emails/InquiryEmailVerificationEmail";

const URL_PREFIXED = `${SERVER_URL_PREFIXED}/api/safe/inquiry`;
const GMAIL_AUTHENTICATION = process.env.GMAIL_AUTHENTICATION;

const URLS = {
    "create_inquiry": `${URL_PREFIXED}/create`
}

//TODO: 발신전용 메일로 교환해주어야한다. => G_SUITE 이용 권장
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'lux00leo@gmail.com',
        pass: GMAIL_AUTHENTICATION,
    },
})

export const sendVerificationEmail = async (targetEmail: string) => {
    const verificationCode = generateVerificationCode();
    const emailHtml = await render(Template({verificationCode:  verificationCode}));

    const options = {
        from: 'lux00leo@gmail.com',
        to: targetEmail,
        subject: 'hk verification emails test',
        html: emailHtml,
    };
    let isEmailSuccessfullyDelivered = true;
    // TODO: 존재하지 않는 이메일로 보내면 어떻게 되는지 => SMTP 프로토콜로 전달만 하기 때문에 전송 완료 여부는 알 수 없다.
    const response = await transporter.sendMail(options,(err,info)=>{
        if (err) {
            isEmailSuccessfullyDelivered = false;
        }
    });
    if(!isEmailSuccessfullyDelivered) return "fail";
    return verificationCode;
};

export const createInquiry = async (payload: ContactPayload) => {
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
