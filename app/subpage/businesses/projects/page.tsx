import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense} from "react";
import ProjectsContainer from "@/app/ui/subpage/businesses/project/project_content";
import {tempFetchInitialProjects} from "@/public/hkdemo/data/projects";

export default async function Page() {
    const initialProjects = await tempFetchInitialProjects();
    return (
        <section className={'w-full px-[5%] md:px-[10%]'}>
            <Suspense>
                <SectionTitle title={null}/>
            </Suspense>
            <div className={'mt-20 w-full flex items-start'}>
                <Suspense>
                    <ProjectsContainer initialProjects={initialProjects}/>
                </Suspense>
            </div>
        </section>
    )
};