'use client';

import {useEffect, useState} from "react";
import {departmentProject} from "@/app/lib/hk/domainsData";
import {clsx} from "clsx";
import {useProjectStore} from "@/app/subpage/businesses/projects/project_store";
import styles from './projects.module.css';
import { getFilterdProject} from "@/app/subpage/businesses/projects/action";

//TODO: mock up으로 해두어서 다시 하기
//TODO: content box
export default function ProjectsContainer({initialProjects}:{
    initialProjects: departmentProject[];
}) {
    const currentYear = useProjectStore(state => state.year);
    const [projects, setProjects] = useState<departmentProject[]>(initialProjects);

    useEffect(() => {
        (async function (year: number) {
            await getFilterdProject({year}, initialProjects)
                .then(res => setProjects(res));
        })(currentYear);
    }, [currentYear]);
    return (
        <div className={'w-full flex flex-col gap-10 pb-10'}>
            <div className={'w-full'}>
                <FilterBar/>
            </div>
            <div className={'w-full overflow-y-scroll'}>
                <div>
                    {/*LEARN key값이 중복될경우 흔적기관 처럼 남더라 항상 고유하게 해줘야함*/}
                    <ProjectContainer projects={projects}/>
                </div>
            </div>
        </div>
    );
};

const range = (start: number, end: number, step: number) => Array.from({length: (end - start) / step + 1}, (el, idx) => start + idx * step);

function FilterBar() {
    const year = useProjectStore(state => state.year);
    const updateYear = useProjectStore(state => state.updateYear);
    return (
        <div className={'w-full flex gap-x-5 overflow-x-scroll md:overflow-x-visible'}>
            {range(2017, 2023, 1).map(el => (
                <div key={el} className={clsx('flex justify-center items-center py-3 px-6 text-lg select-none hover:cursor-pointer', {
                    'border-2 hover:border-red-500': el !== year,
                    'border-red-700 border-[.4rem] outline outline-[.3rem] outline-red-600' : el === year
                })}
                onClick={()=> updateYear(el)}>
                    {el}
                </div>
            ))}
        </div>
    );
}

//TODO: 페이지네이션 적용하기
function ProjectContainer({projects}:{
    projects: departmentProject[];
}) {
    return (
        <div className={'w-full md:w-[90%] flex justify-center items-center'}>
            <table className={'hidden md:!table w-full'}>
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
            <div className={'w-full flex flex-col gap-5 justify-center items-start md:hidden'}>
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