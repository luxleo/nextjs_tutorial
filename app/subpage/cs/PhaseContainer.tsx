'use client';
import ReCAPTCHA from "react-google-recaptcha";
import {useCallback, useRef, useState} from "react";
import ContactForm from "@/app/subpage/cs/contact-form";

export default function PhaseContainer() {
    return (
        <section className={'w-full'}>
            <Renderer/>
        </section>
    );
};

//TODO: context provider로 구현 해보자
function Renderer() {
    const [phase, setPhase] = useState<number>(1); // INFO: phase 1 : recaptcha , phase 2 : form validation && email verification , phase 3 : email send
    const incPhase = useCallback(() => setPhase(prev => ++prev), []);

    switch (phase){
        case 1:
            return <RecaptchaContainer incPhase={incPhase}/>;
        case 2:
            return <ContactForm incPhase={incPhase}/>
        case 3:
            return <FinalContainer/>
    }
}

function RecaptchaContainer({
    incPhase
                            }:{incPhase: ()=>void}) {
    const recaptchaREF = useRef<null | ReCAPTCHA>(null);
    const onChangeHandler = () => {
        incPhase();
    }
    return (
        <div>
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} ref={recaptchaREF} onChange={onChangeHandler} />
        </div>
    )
}

function FinalContainer() {
    return (
        <div className={'flex flex-col'}>
            <div>
                check
            </div>
            <div>
                문의가 전송되었습니다.
            </div>
        </div>
    )
}

