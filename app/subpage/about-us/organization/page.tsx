import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/subpage/prefixed";
import {Suspense} from "react";
import {Metadata} from "next";
import CommonContainer from "@/app/ui/subpage/commom-container";

export const metadata: Metadata = {
    title: "조직구조",
};
export default function Page() {


    return (
        <CommonContainer>
            <Suspense>
                <SectionTitle title={'조직구조'}/>
            </Suspense>
            <div className={'mt-20 w-full flex flex-col items-start'}>
                <Image src={CONTENT_URL.ORGANIZATION} alt={'ORGANIZATION'}
                       width={1360}
                       height={617}
                       className={'w-full mb-20'}
                />
            </div>
        </CommonContainer>
    )
};