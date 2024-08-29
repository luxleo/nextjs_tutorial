import {useCallback, useContext, useState} from "react";
import {FormContext} from "@/app/subpage/cs/PhaseContainer";
import {Skeleton} from "@/components/ui/skeleton";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {useRouter} from "next/navigation";

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
    const onSubmitHandler= ()=>{
        if (value !== verificationCode) {
            if (checkCount === 3) {
                router.replace('/');
                return;
            }
            onNotCorrectHandler();
            return;
        }
        // TODO: 성공로직 =>  서버에 전달하고 마무리 스테이지로 넘긴다.
        formContext.controlOTPDialog(false);
        formContext.incPhase();
    }
    return (
        <div className={'space-y-3 bg-white w-[500px] h-[400px] pt-10 flex flex-col items-center'}>
            <div className={'text-xl pb-3'}>
                인증 코드를 입력해주세요
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
            {checkCount > 0 && <div className={''}>
                다시 한번 확인해주세요, <span className="text-red-600">{checkCount}/3</span>
            </div>}
            <button className={'bg-hk-blue-300'} disabled={value.length !== 4} onClick={onSubmitHandler}>
                제출
            </button>
        </div>
    );
}

function SkeletonOTP() {
    return (
        <div className={'w-[500px] h-[400px] flex flex-col items-center bg-white pt-10 space-y-3'}>
            <div className={'text-xl pb-3'}>인증 이메일 전송중</div>
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