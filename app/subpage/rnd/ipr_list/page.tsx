import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense} from "react";
import IPRCardContainer from "@/app/ui/subpage/rnd/ipr_list_card";

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