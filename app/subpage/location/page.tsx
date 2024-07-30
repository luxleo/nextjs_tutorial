import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense} from "react";
import Inner from "@/app/subpage/location/Inner";
import {Metadata} from "next";

export const metadata : Metadata = {
    title: "오시는 길"
}
export default function Page() {

    return (
        <section className={'w-full pb-10 md:pb-20 px-[5%] md:px-[10%]'}>
            <Suspense>
                <SectionTitle title={'오시는 길'}/>
            </Suspense>
            <Inner/>
        </section>
    );
};
