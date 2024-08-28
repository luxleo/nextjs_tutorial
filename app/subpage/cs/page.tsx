import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import CommonContainer from "@/app/ui/subpage/commom-container";
import {Suspense} from "react";
import PhaseContainer from "@/app/subpage/cs/PhaseContainer";
import Hovering from "@/app/subpage/cs/hovering/Hovering";

export default function Page() {
    const SERVER_RECAPTCHA_SITE_KEY = process.env.SERVER_RECAPTCHA_SITE_KEY;
    return (
        <CommonContainer>
            {/*<SectionTitle title={'문의사항'}/>*/}
            <CsPageTitle/>
            <Suspense fallback={'Looding ... '}>
                <PhaseContainer siteKey={SERVER_RECAPTCHA_SITE_KEY as string}/>
            </Suspense>
        </CommonContainer>
    );
};

function CsPageTitle() {
    return (
        <div className={'flex flex-col items-center gap-y-4 mb-[5rem]'}>
            <h1 className={'text-[1.6rem] font-semibold'}>
                문의사항
            </h1>
            <h2 className={'text-neutral-600 text-[1rem] flex'}>
                <div className={'w-10'}><Hovering/></div>
                빠른 시일내에 보내주신 문의사항에 답변드리겠습니다 <div className={'w-10'}><Hovering/></div>
            </h2>
        </div>
    )
}