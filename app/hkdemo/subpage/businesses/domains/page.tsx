import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {Suspense} from "react";
import BusinessMenuWrapper from "@/app/ui/hkdemo/overview/business/business_menu";

export default function Page() {

    return (
        <section className={'w-full'}>
            <Suspense>
                <SectionTitle title={null}/>
            </Suspense>
            <div className={'sm:mt-20 w-full flex flex-col items-start'}>
                <BusinessMenuWrapper/>
                <Image src={CONTENT_URL.DOMAINS_INFO} alt={'ORGANIZATION'}
                       width={1227}
                       height={435}
                       className={'w-full mb-20'}
                />
                <Suspense>
                    <SectionTitle title={'부서 사업영역'}/>
                </Suspense>
                <Image src={CONTENT_URL.DOMAINS_DOMAINS} alt={'ORGANIZATION'}
                       width={1219}
                       height={399}
                       className={'w-full mb-20'}
                />

                <Suspense>
                    <SectionTitle title={'부서 주요실적'}/>
                </Suspense>
                <Image src={CONTENT_URL.DOMAINS_PROJECTS} alt={'ORGANIZATION'}
                       width={1221}
                       height={793}
                       className={'w-full mb-20'}
                />
            </div>
        </section>
    )
};