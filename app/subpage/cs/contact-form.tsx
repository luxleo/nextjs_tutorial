'use client';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useCallback, useContext, useState} from "react";
import {createInquiry, sendVerificationEmail} from "@/app/subpage/cs/actions";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {FormContext} from "@/app/subpage/cs/PhaseContainer";

const contactFormSchema =z.object({
    customerName: z.coerce.string().min(2, "이름은 2자 이상, 5자 이하 로 입력해주세요").max(5, "이름은 2자 이상, 5자 이하 로 입력해주세요"),
    email: z.coerce.string().email("이메일 형식이 아닙니다."),
    title: z.coerce.string().min(5, "제목은 5자 이상입니다."),
    content: z.coerce.string().min(5, "문의내용은 5자 이상입니다."),
    type: z.union([z.literal("PROJECT"), z.literal("RECRUIT"), z.literal("ETC")], ),
    // TODO: 1. 문의 종류 : ("프로젝트 문의","채용 문의","기타 문의") 2. 첨부파일 ( 크기제한), 3. 이메일 주소 인증
})

const initialContactFormValue : ContactPayload = {
    customerName: "",
    email: "",
    title: "",
    content: "",
    type: "PROJECT"
}

export type ContactPayload = z.infer<typeof contactFormSchema>;

export default function ContactForm({incPhase}:{incPhase: ()=>void}) {
    const [verifiedEmail, setVerifiedEmail] = useState<string>("");
    const [step, setStep] = useState<number>(1);
    const [isFetchFinished, setIsFetchFinished] = useState<boolean>(false);

    const formContext = useContext(FormContext);

    const form =   useForm({
            resolver: zodResolver(contactFormSchema),
            defaultValues: initialContactFormValue
        });
    const register = form.register;
    const handleSubmit = form.handleSubmit;
    const errors = form.formState.errors;
    const submitTester1 = () => {
        console.log("================submit tester 1");
    }
    const submitTester2 = () => {
        console.log("================submit tester 2");
    }
    const onSubmitHandler = useCallback(async (payload: ContactPayload) => {
        console.log(JSON.stringify(payload));
        const isOk = await createInquiry(payload);
        if (isOk) {
            setIsFetchFinished(true);
        }
    },[])

    const onEmailChangeHandler = useCallback(()=>{

    },[])

    return (
        <>
            {!isFetchFinished  &&
                <Form {...form}>
                <form className={'w-full flex flex-col gap-y-6'} onSubmit={handleSubmit(async formData => {
                    console.log(`data : ${JSON.stringify(formData)}`);
                    if (step === 1) {
                        // 유저 이메일로 검증 코드를 보내어 이메일을 확인한다. + verified Email 에 현재 이메일을 저장하여 나중에 수정하지 못하도록 조치한다.
                        // TODO 1 : 폼 전송시 이메일 인증 메일 발송 후 검증 코드 입력하는 Dialog 컴포넌트 렌더링
                        // TODO 2 : Dialog 검증 코드 입력 일치 할 경우 서버에 문의 저장, => useRef로 form submit 수동 조작
                        // TODO 3 : 저장후 전송 완료 컴포넌트 렌더링 (step == 3)

                        formContext.controlOTPDialog(true);
                        // const verificationCode = await sendVerificationEmail(formData.email);
                        let verificationCode = '';
                        for (let i = 0; i < 4; i++) {
                            verificationCode += Math.floor(Math.random() * 10);
                        }

                        formContext.changeVerificationCode(verificationCode);
                    } else if (step === 2) {

                        // 이메일 검증을 위하여 입력한 경우이다. + 검증 코드를 비교하고 일치할 경우 verified Email 과 현재 Email을 비교하여 같은 경우에만 다음으로 진행한다.
                        // 유저가 작성한 inquiry를 서버로 전송하여 저장한다.
                        incPhase();
                    }

                        // return onSubmitHandler(formData);
                    }
                )}>
                    <div className={'flex flex-col gap-y-4 md:gap-y-0 md:!flex-row md:gap-x-6'}>
                        <LabelWrapper title={'성함'}>
                            <Input type={'text'} className={'h-[3.2rem] text-[1rem]'} placeholder={'성함을 입력해주세요'} {...register('customerName')}/>
                            {errors.customerName && <ErrorMessageBox errorMessage={errors.customerName.message}/>}
                        </LabelWrapper>
                        <LabelWrapper title={'이메일'}>
                            <Input type={'email'} className={'h-[3.2rem] text-[1rem]'} placeholder={'이메일을 입력해주세요'} {...register('email')} />
                            {errors.email && <ErrorMessageBox errorMessage={errors.email.message}/>}
                        </LabelWrapper>
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name={"type"}
                            render={({field}) => (
                                <FormItem>
                                    <LabelWrapper title={"문의분류"}>
                                        <Select onValueChange={field.onChange} defaultValue={'PROJECT'} >
                                            <FormControl>
                                                <SelectTrigger className={'h-[3.2rem] text-[1rem]'}>
                                                    <SelectValue placeholder="Select a verified email to display"  />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent {...register('type')}>
                                                <SelectItem value={'PROJECT'}>
                                                    프로젝트 문의
                                                </SelectItem>
                                                <SelectItem value={'RECRUIT'}>
                                                    채용
                                                </SelectItem>
                                                <SelectItem value={'ETC'}>
                                                    기타 문의
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && <ErrorMessageBox errorMessage={errors.type.message}/>}
                                        <FormMessage />
                                    </LabelWrapper>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <LabelWrapper title={'제목'}>
                            <Input type={'text'} className={'h-[3.2rem] text-[1rem]'} placeholder={'제목을 입력해주세요'} {...register('title')} />
                            {errors.title && <ErrorMessageBox errorMessage={errors.title.message}/>}
                        </LabelWrapper>
                    </div>
                    <div>
                        <LabelWrapper title={'문의내용'}>
                            <Textarea className={'h-[9rem]'} placeholder={"문의 내용을 입력해주세요"} {...register('content')} />
                            {errors.content && <ErrorMessageBox errorMessage={errors.content.message}/>}
                        </LabelWrapper>
                    </div>
                    <button className={'bg-slate-300 w-full flex py-3 justify-center items-center rounded-md hover:shadow-inner hover:shadow-slate-500'}>
                        제출
                    </button>
                </form>
                </Form>
            }
        </>

    );
};

function LabelWrapper({title, children}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className={'flex flex-col w-full gap-y-1'}>
            <div>
                {title}
            </div>
            {children}
        </div>
    )
}

function ErrorMessageBox({errorMessage}: {
    errorMessage: string | undefined;
}) {
    return (
        <p className={'pt-1 text-red-300 text-sm'}>
            {errorMessage}
        </p>
    );
}