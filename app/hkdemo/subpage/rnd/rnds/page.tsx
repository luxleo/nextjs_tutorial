import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {Suspense} from "react";

export default function Page() {

    return (
        <section className={'w-full px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={'연구'}/>
            </Suspense>
            <div className={'mt-20 w-full flex flex-col items-start'}>
                <Image src={CONTENT_URL.RND_RESEARCH} alt={'ORGANIZATION'}
                       width={1277}
                       height={872}
                       className={'w-full mb-20'}
                />
            </div>
            <Suspense>
                <SectionTitle title={'연구과제'}/>
            </Suspense>
            <div className={'mt-20 w-full flex flex-col items-start'}>
                <Image src={CONTENT_URL.RND_RESEARCH_ASSIGNMENT} alt={'ORGANIZATION'}
                       width={1277}
                       height={872}
                       className={'w-full mb-20'}
                />
            </div>
        </section>
    )
};