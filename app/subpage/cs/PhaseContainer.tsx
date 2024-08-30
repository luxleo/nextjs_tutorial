'use client';
import ReCAPTCHA from "react-google-recaptcha";
import React, {createContext, useCallback, useContext, useRef, useState} from "react";
import ContactForm, {ContactPayload, initialContactFormValue} from "@/app/subpage/cs/contact-form";
import OTPVerification from "@/app/subpage/cs/otp-verfication";

interface FormContext {
    siteKey: string;
    isOTPDialogOn: boolean;
    controlOTPDialog: (value: boolean) => void
    verificationCode: string;
    changeVerificationCode: (value: string) => void
    phase: number;
    incPhase: () => void
    inquiryFormPayload: ContactPayload;
    fillInquiryForm: (form: ContactPayload) => void;
}

const initialFormContextValue: FormContext = {
    siteKey: "",
    isOTPDialogOn: false,
    controlOTPDialog: (value) => {
    },
    verificationCode: "",
    changeVerificationCode: (value) => {
    },
    phase: 1,
    incPhase: () => {
    },
    inquiryFormPayload: initialContactFormValue,
    fillInquiryForm: (form) => {

    }
};

export const FormContext = createContext<FormContext>(initialFormContextValue);

export default function PhaseContainer({siteKey}:{ siteKey: string;}) {
    const [isOTPDialogOn, setIsOTPDialogOn] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [phase, setPhase] = useState<number>(1);
    const [inquiryFormPayload, setInquiryFormPayload] = useState<ContactPayload>(initialContactFormValue);

    const controlOTPDialog = useCallback((value: boolean) => {
        setIsOTPDialogOn(value);
    }, []);
    const changeVerificationCode = useCallback((value: string) => {
        setVerificationCode(value);
    }, []);
    const incPhase = useCallback(()=>{
            setPhase(prev => prev + 1);
        },[])
    const fillInquiryForm = useCallback((form: ContactPayload)=> {
            setInquiryFormPayload(form);
        }
        ,[])

    const FormContextValue : FormContext = {
        siteKey: siteKey,
        isOTPDialogOn: isOTPDialogOn,
        controlOTPDialog: controlOTPDialog,
        verificationCode: verificationCode,
        changeVerificationCode: changeVerificationCode,
        phase: phase,
        incPhase: incPhase,
        inquiryFormPayload: inquiryFormPayload,
        fillInquiryForm: fillInquiryForm,
    }
    return (
        //TODO: verification dialog 여기서 띄운다.
        <FormContext.Provider value={FormContextValue}>
            <section className={'w-full flex max-w-[1440px] h-full'}>
                <ColumnPadding/>
                <Renderer/>
                <ColumnPadding/>
                {isOTPDialogOn && <OTPVerification />}
            </section>
        </FormContext.Provider>
    );
};

function Renderer() {
    const formContext = useContext(FormContext);

    switch (formContext.phase){
        case 1:
            return <RecaptchaContainer incPhase={formContext.incPhase}/>;
        case 2:
            return <ContactForm incPhase={formContext.incPhase}/>
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
    const formContext = useContext(FormContext);
    return (
        <div className={'w-full flex justify-center h-full'}>
            <div className={'w-[500px] flex justify-center bg-slate-300 items-center'}>
                <ReCAPTCHA sitekey={formContext.siteKey} ref={recaptchaREF} onChange={onChangeHandler}/>
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

