'use client';
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";

import {Suspense} from "react";
import BusinessMenuWrapper from "@/app/ui/hkdemo/overview/business/business_menu";


export default function Companyinfo({content}:{
    content: string
}){
    return (
        <div className={'mt-20 text-lg md:text-xl whitespace-pre-wrap w-full'}>
            <Suspense>
                <SectionTitle title={'사업영역'}/>
            </Suspense>
            {content}
            <BusinessMenuWrapper/>
        </div>
    )
}
