import {useCallback, useContext, useState} from "react";
import {FormContext} from "@/app/subpage/cs/PhaseContainer";
import {Skeleton} from "@/components/ui/skeleton";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {useRouter} from "next/navigation";
import {createInquiry} from "@/app/subpage/cs/actions";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {clsx} from "clsx";
import { TfiClose } from "react-icons/tfi";

export default function OTPVerification() {
    const formContext = useContext(FormContext);
    return (
        <div className={'w-full h-[100vh] fixed top-0 left-0 flex flex-col justify-center items-center bg-black bg-opacity-40 z-50'}
        >
            {formContext.verificationCode.length ===4 ? <FormOTP verificationCode={formContext.verificationCode}/>
            :
                <SkeletonOTP/>
            }
            {/*<SkeletonOTP/>*/}
        </div>
    )
};

//TODO: enter 입력시 바로 전송되도록 form 으로 바꾼다.
function FormOTP({verificationCode}:{
    verificationCode: string;
}) {
    const [value, setValue] = useState<string>("");
    const [checkCount, setCheckCount] = useState<number>(0);

    const formContext = useContext(FormContext);
    const router = useRouter();

    const onNotCorrectHandler = useCallback(() => {
        setCheckCount(prev => prev + 1);
    }, []);
    const onSubmitHandler= async ()=>{
        if (value !== verificationCode) {
            if (checkCount === 3) {
                router.replace('/');
                return;
            }
            onNotCorrectHandler();
            return;
        }
        // TODO: 성공로직 =>  서버에 전달하고 마무리 스테이지로 넘긴다.
        await createInquiry(formContext.inquiryFormPayload)
            .then(res => {
                console.log("문의 사항 생성에 성공했습니다.")
            formContext.incPhase();
            formContext.controlOTPDialog(false);
        });
    }
    const onCancelHandler = () => {
        formContext.controlOTPDialog(false);
    }
    return (
        <div className={'relative gap-y-3 bg-white w-[500px] h-[400px] pt-10 flex flex-col items-center'}>
            <div className={'absolute w-[3rem] h-[3rem] text-[2rem] font-semibold text-white -top-0 -right-[3rem] flex justify-center items-start hover:text-neutral-700'}
                 onClick={onCancelHandler}
            >
                <TfiClose/>
            </div>
            <div className={'text-2xl pb-3'}>
                인증 코드를 입력해주세요
            </div>
            <div className={'text-neutral-500'}>
                {formContext.inquiryFormPayload.email}
            </div>
            <InputOTP maxLength={4}
                      value={value}
                      onChange={(value) => setValue(value)}
                      autoFocus={true}
            >
                <InputOTPGroup>
                    <InputOTPSlot cursorHeight={'h-14'} index={0} className={"text-[3rem] w-20 h-24"}/>
                    <InputOTPSlot cursorHeight={'h-14'} index={1} className={"text-[3rem] w-20 h-24"}/>
                    <InputOTPSlot cursorHeight={'h-14'} index={2} className={"text-[3rem] w-20 h-24"}/>
                    <InputOTPSlot cursorHeight={'h-14'} index={3} className={"text-[3rem] w-20 h-24"}/>
                </InputOTPGroup>
            </InputOTP>
            <div>
                you entered : {value}
            </div>
            <div>
                true code : {verificationCode}
            </div>
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger className={clsx('',{
                        'cursor-not-allowed': value.length < 4
                    })}>
                        <Button disabled={value.length < 4} className={'disabled:bg-red-600 disabled:opacity-80 bg-green-600 hover:bg-green-700 w-[320px]'}
                        onClick={onSubmitHandler}>
                            submit
                        </Button>
                    </TooltipTrigger>
                    { value.length < 4 &&
                        <TooltipContent>
                            <p>
                                먼저 인증코드 4자리를 입력해주세요.
                            </p>
                        </TooltipContent>
                    }
                </Tooltip>
            </TooltipProvider>
            {checkCount > 0 && <div className={''}>
                다시 한번 확인해주세요, <span className="text-red-600">{checkCount}/3</span>
            </div>}
        </div>
    );
}

function SkeletonOTP() {
    const formContext = useContext(FormContext);
    return (
        <div className={'w-[500px] h-[400px] flex flex-col items-center bg-white pt-10 space-y-3'}>
            <div className={'text-xl pb-3'}>인증 코드를 {formContext.inquiryFormPayload.email} 전송중</div>
            <div className={'flex flex-col items-start space-y-3'}>
                <Skeleton className={'w-[400px] h-[100px]'}/>
                <Skeleton className={'w-[350px] h-[1rem]'}/>
                <Skeleton className={'w-[300px] h-[1rem]'}/>
                <Skeleton className={'w-[250px] h-[1rem]'}/>
                <div className={'flex mt-3 justify-between w-full'}>
                    <Skeleton className={'w-[200px] h-[1rem]'}/>
                    <Skeleton className={'w-[150px] h-[1rem]'}/>
                </div>
            </div>
        </div>
    )
}