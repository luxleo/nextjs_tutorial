import {Suspense} from "react";
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import LicenceList from "@/app/ui/subpage/rnd/licence/licence_list";
// import {getLicences} from "@/app/subpage/rnd/action";
import {licences} from "@/app/ui/subpage/rnd/licence/licence_dummy_data";

export default async function Page(){
    return (
        <div className={'w-full pb-10 sm:pb-20 px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={'업·면허 등록 현황'}/>
            </Suspense>
            <Suspense>
                <LicenceList licences={licences}/>
            </Suspense>
        </div>
    );
}