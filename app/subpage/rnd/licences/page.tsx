import {Suspense} from "react";
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import LicenceList from "@/app/ui/subpage/rnd/licence/licence_list";
// import {getLicences} from "@/app/subpage/rnd/action";
import {licences} from "@/app/ui/subpage/rnd/licence/licence_dummy_data";
import {Metadata} from "next";
import CommonContainer from "@/app/ui/subpage/commom-container";
export const metadata : Metadata = {
    title: "업·면허 등록 현황"
}
export default async function Page(){
    return (
        <CommonContainer>
            <Suspense>
                <SectionTitle title={'업·면허 등록 현황'}/>
            </Suspense>
            <Suspense>
                <LicenceList licences={licences}/>
            </Suspense>
        </CommonContainer>
    );
}