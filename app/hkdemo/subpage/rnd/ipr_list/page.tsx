import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {Suspense} from "react";
import IPRCardContainer from "@/app/ui/subpage/rnd/ipr_list_card";
import LicenceList from "@/app/ui/subpage/rnd/licence/licence_list";

export default function Page() {

    return (
        <section className={'w-full pb-20 px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={'특허목록'}/>
            </Suspense>
            <IPRCardContainer/>
        </section>
    )
};