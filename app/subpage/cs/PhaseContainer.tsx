'use client';
import ReCAPTCHA from "react-google-recaptcha";
import React, {createContext, useCallback, useContext, useRef, useState} from "react";
import ContactForm from "@/app/subpage/cs/contact-form";

const SiteKeyContext = createContext<string>("");

export default function PhaseContainer({siteKey}:{ siteKey: string;}) {
    return (
        <SiteKeyContext.Provider value={siteKey}>
            <section className={'w-full flex max-w-[1440px]'}>
                <ColumnPadding/>
                <Renderer/>
                <ColumnPadding/>
            </section>
        </SiteKeyContext.Provider>
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
    const siteKey = useContext(SiteKeyContext);
    return (
        <div className={'w-full flex justify-center h-[10rem]'}>
            <div className={'w-[500px] flex justify-center bg-slate-300 items-center'}>
                <ReCAPTCHA sitekey={siteKey} ref={recaptchaREF} onChange={onChangeHandler}/>
            </div>
        </div>
    );
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

function ColumnPadding() {
    return (
        <div className={'w-0 md:w-[122px]'}>

        </div>
    )
}

