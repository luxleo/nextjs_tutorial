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
            <div className={'mt-20 w-full flex flex-col items-center'}>
                <Image src={CONTENT_URL.HISTORY} alt={'HISTORY'}
                       width={957}
                       height={816}
                       className={'w-[80%] mb-20'}
                />
            </div>
        </section>
    )
};