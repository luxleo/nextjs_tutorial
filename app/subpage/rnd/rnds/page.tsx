import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense} from "react";
import ResearchList from "@/app/ui/subpage/rnd/research/research_list";
import ResearchProjectList from "@/app/ui/subpage/rnd/research_project/research_project_list";
import {Metadata} from "next";

export const metadata : Metadata = {
    title: "연구개발"
}
export default function Page() {

    return (
        <section className={'w-full px-[5%] sm:px-[10%] sm:mb-20'}>
            <Suspense>
                <SectionTitle title={'연구'}/>
            </Suspense>
            <div className={'mt-5 sm:mt-14 w-full flex flex-col items-start'}>
                <ResearchList/>
            </div>
            <Suspense>
                <SectionTitle title={'연구과제'}/>
            </Suspense>
            <div className={'mt-5 sm:mt-14 w-full flex flex-col items-start'}>
                <ResearchProjectList/>
            </div>
        </section>
    )
};