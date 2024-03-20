'use client';

import {useSearchParams} from "next/navigation";
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";

export default function Page() {
    const searchParams = useSearchParams();
    const subLinkName = searchParams.get('subLinkName');


    return (
        <section className={'w-[90%]'}>
            <SectionTitle title={subLinkName as string}/>
        </section>
    )
};