import React, {Suspense} from "react";
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import MapsAndAddress from "@/app/subpage/contact/location/MapsAndAddress";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "오시는 길",
};

export default async function Page() {

    return (
        <section className={'w-full pb-10 sm:pb-20 px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={'오시는 길'}/>
            </Suspense>
            <MapsAndAddress/>
        </section>
    );
};
