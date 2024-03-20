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
                <Image src={CONTENT_URL.ORGANIZATION} alt={'ORGANIZATION'}
                       width={693}
                       height={358}
                       className={'w-full mb-20'}
                />
            </div>
        </section>
    )
};