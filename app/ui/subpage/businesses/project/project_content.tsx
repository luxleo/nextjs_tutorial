'use client';

import FilterNavBar from "@/app/ui/subpage/businesses/project/filter_bar";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {departmentProject} from "@/app/lib/hk/domainsData";

//TODO: mock up으로 해두어서 다시 하기
//TODO: content box
export default function ProjectsContainer({initialProjects}:{
    initialProjects: departmentProject[];
}) {
    const [toggleImage, setToggleImage] = useState<boolean>(false);
    const [projects, setProjects] = useState<departmentProject[]>(initialProjects);
    return (
        <div className={'w-full flex gap-10'}>
            <div className={'whitespace-nowrap hidden sm:block'}>
                <FilterNavBar setToggleImage={setToggleImage} setProjects={setProjects}/>
            </div>
            <div className={'grow basis-0 h-[100vh] overflow-y-scroll'}>
                {/*<Image src={CONTENT_URL.PROJECTS1} alt={'ORGANIZATION'}*/}
                {/*       width={1150}*/}
                {/*       height={680}*/}
                {/*       className={clsx('w-full mb-20', {*/}
                {/*           'hidden': toggleImage*/}
                {/*       })}*/}
                {/*/>*/}
                {/*<Image src={CONTENT_URL.PROJECTS2} alt={'ORGANIZATION'}*/}
                {/*       width={1150}*/}
                {/*       height={680}*/}
                {/*       className={clsx('w-full mb-20', {*/}
                {/*           'hidden': !toggleImage*/}
                {/*       })}*/}
                {/*/>*/}
                <div>
                    {/*LEARN key값이 중복될경우 흔적기관 처럼 남더라 항상 고유하게 해줘야함*/}
                    <ProjectContainer projects={projects}/>
                </div>
            </div>
        </div>
    );
};

//TODO: 페이지네이션 적용하기
function ProjectContainer({projects}:{
    projects: departmentProject[];
}) {
    return (
        <div className={'w-full sm:w-[90%] flex justify-center items-center'}>
            <table className={'hidden sm:!table w-full'}>
                <thead className={'pb-10'}>
                <tr className={'border-b-2'}>
                    <th scope={'col'} className={'w-[8%] pb-4'}>번호</th>
                    <th scope={'col'} className={'w-[50%] pb-4'}>과업명</th>
                    <th scope={'col'} className={'w-[25%] pb-4'}>발주처</th>
                    <th scope={'col'} className={'w-[15%] pb-4'}>착수일</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project, idx) => (
                    <tr key={`${idx}-${project.name}`} className={'font-light border-b'}>
                        <td className={'py-3 w-[8%] text-center'}>{idx}</td>
                        <td className={'py-3 w-[30%]'}>{project.name}</td>
                        <td className={'py-3 w-[30%]'}>{project.projectOwner}</td>
                        <td className={'py-3 w-[20%] pl-10'}>{project.startDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={'w-full flex flex-col gap-5 justify-center items-start sm:hidden'}>
                {projects.map((project,idx) => (
                    <div key={`${idx}-${project.name}`}
                         className={'w-full flex pl-2 flex-col justify-center items-start border-b-2'}>
                        <div className={'text-lg'}>
                            {project.name}
                        </div>
                        <div className={'flex flex-col gap-1'}>
                            <div className={'text-neutral-600'}>
                                {project.projectOwner}
                            </div>
                            <div className={'flex text-xs gap-2 text-neutral-500'}>
                                <div>
                                    {project.startDate}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}