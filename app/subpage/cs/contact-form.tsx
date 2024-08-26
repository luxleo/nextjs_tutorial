'use client';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useCallback, useState} from "react";
import {createInquiry} from "@/app/subpage/cs/actions";

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

export default function ContactForm() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isFetchFinished, setIsFetchFinished] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } =
        useForm({
            resolver: zodResolver(contactFormSchema),
            defaultValues: initialContactFormValue
        });

    const onSubmitHandler = useCallback(async (payload: ContactPayload) => {
        console.log(JSON.stringify(payload));
        const isOk = await createInquiry(payload);
        if (isOk) {
            setIsFetchFinished(true);
        }
    },[])

    return (
        <>
            {!isFetchFinished ?
                <form className={'w-full'} onSubmit={handleSubmit(formData => onSubmitHandler(formData))}>
                    <div className={'flex flex-col md:!flex-row'}>
                        <LabelWrapper title={'성함'}>
                            <input type={'text'} placeholder={'성함을 입력해주세요'} {...register('customerName')}/>
                            {errors.customerName && <ErrorMessageBox errorMessage={errors.customerName.message}/>}
                        </LabelWrapper>
                        <LabelWrapper title={'이메일'}>
                            <input type={'email'} placeholder={'이메일을 입력해주세요'} {...register('email')} />
                            {errors.email && <ErrorMessageBox errorMessage={errors.email.message}/>}
                        </LabelWrapper>
                    </div>
                    <div>
                        <LabelWrapper title={"문의분류"}>
                            <select defaultValue={'PROJECT'} {...register('type')}>
                                <option value={'PROJECT'}>
                                    프로젝트 문의
                                </option>
                                <option value={'RECRUIT'}>
                                    채용
                                </option>
                                <option value={'ETC'}>
                                    기타 문의
                                </option>
                            </select>
                            {errors.type && <ErrorMessageBox errorMessage={errors.type.message}/>}
                        </LabelWrapper>
                    </div>
                    <div>
                        <LabelWrapper title={'제목'}>
                            <input type={'text'} placeholder={'제목을 입력해주세요'} {...register('title')} />
                            {errors.title && <ErrorMessageBox errorMessage={errors.title.message}/>}
                        </LabelWrapper>
                    </div>
                    <div>
                        <LabelWrapper title={'문의내용'}>
                            <textarea placeholder={"문의 내용을 입력해주세요"} {...register('content')} />
                            {errors.content && <ErrorMessageBox errorMessage={errors.content.message}/>}
                        </LabelWrapper>
                    </div>
                    <button className={'bg-slate-300'}>
                        제출
                    </button>
                </form>
                :
                <div className={'flex flex-col'}>
                    <div>
                        check
                    </div>
                    <div>
                        문의가 전송되었습니다.
                    </div>
                </div>
            }

        </>

    )
};

function LabelWrapper({title, children}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className={'flex flex-col'}>
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