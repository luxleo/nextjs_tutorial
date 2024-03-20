'use client';

import {useSearchParams} from "next/navigation";
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";

export default function Page() {
    const searchParams = useSearchParams();
    const subLinkName = searchParams.get('subLinkName');


    return (
        <section className={'w-full'}>
            <SectionTitle title={subLinkName as string}/>
            <div className={'mt-20 w-full flex flex-col items-start'}>
                <Image src={CONTENT_URL.GREETING} alt={'greeting'}
                       width={922}
                        height={548}
                       className={'w-[90%]'}
                       />
                <Image src={CONTENT_URL.GREETING_BANNER} alt={'greeting'}
                       width={922}
                       height={548}
                       className={'w-full mt-20'}
                />
            </div>
        </section>
    )
};