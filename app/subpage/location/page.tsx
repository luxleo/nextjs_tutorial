import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense} from "react";
import Inner from "@/app/subpage/location/Inner";
import {Metadata} from "next";
import CommonContainer from "@/app/ui/subpage/commom-container";

export const metadata : Metadata = {
    title: "오시는 길"
}
export default function Page() {

    return (
        <CommonContainer>
            <Suspense>
                <SectionTitle title={'오시는 길'}/>
            </Suspense>
            <Inner/>
        </CommonContainer>
    );
};
