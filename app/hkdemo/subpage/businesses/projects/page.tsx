import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense} from "react";
import FilterNavBar from "@/app/ui/subpage/businesses/project/filter_bar";
import ProjectsContainer from "@/app/ui/subpage/businesses/project/project_content";

export default function Page() {

    return (
        <section className={'w-full px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={null}/>
            </Suspense>
            <div className={'mt-20 w-full flex items-start'}>
                <ProjectsContainer/>
            </div>
        </section>
    )
};