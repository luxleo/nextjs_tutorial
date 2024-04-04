'use client';

import {Suspense, useEffect, useState} from "react";
import {
    departmentDomain,
    departmentInfo,
    departmentProject,
    domain,
    getDepartmentInfo,
    getDomains
} from "@/app/lib/hk/domainsData";
import clsx from "clsx";
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {PROJECT_IMG_PREFIX} from "@/app/hkdemo/subpage/businesses/projects/data";



export default function DomainMenuWrapper({domains}:{
    domains: domain[];
}){
    const [currentDomain, setCurrentDomain] = useState<domain>(domains[0]);
    return (
        <div className={''}>
            <div className={'w-full flex justify-center bg-neutral-100'}>
                <div className={'w-[60%] sm:w-[50%] flex justify-between overflow-x-scroll sm:overflow-x-clip gap-3'}>
                {domains.map(domain => (
                    <div key={domain.menu} onClick={() => setCurrentDomain(domain)}
                         className={clsx('whitespace-nowrap text-center text-xl py-6 sm:py-8 hover:cursor-pointer', {
                             'text-neutral-900 border-b-red-500 border-b-4': domain === currentDomain
                         })}>
                            {domain.menu}
                    </div>
                ))}
                </div>
            </div>
            <div className={'px-[5%] sm:px-[10%]'}>
                <div className={'mt-16 sm:mt-20 w-full flex justify-center text-3xl sm:font-extrabold'}>
                    {currentDomain.menu}
                </div>
                <DomainDepartmentNavBar departments={currentDomain.departments}/>
            </div>
        </div>
    )
}

function DomainDepartmentNavBar({departments}: {
    departments: string[];
}) {
    const [currentDepartment, setCurrentDepartment] = useState<string>(departments[0]);
    useEffect(()=>{
        setCurrentDepartment(departments[0])
    },[departments])
    return (
        <div className={'w-full flex flex-col items-center mt-6 sm:mt-10'}>
            <div className={'w-full flex sm:justify-center sm:gap-0 overflow-x-scroll sm:overflow-x-hidden'}>
                {departments.map(department => (
                    <div key={department} className={clsx('text-black font-semibold whitespace-nowrap text-lg px-8 py-4', {
                        'text-white bg-red-600': department === currentDepartment,
                        'sm:hover:bg-neutral-100': department !== currentDepartment
                    })}
                         onClick={() => setCurrentDepartment(department)}
                    >
                        {department}
                    </div>
                ))}
            </div>
            <DomainInfoContainer currentDepartment={currentDepartment}/>
        </div>
    );
}

function DomainInfoContainer({currentDepartment}:{
    currentDepartment: string;
}) {
    const content = getDepartmentInfo(currentDepartment);
    return (
        <div className={'w-full mb-10 sm:mb-20'}>
            {
                content.infoImageURL !== undefined ?
                    <Image src={content.infoImageURL as string} alt={'ORGANIZATION'}
                           width={1227}
                           height={435}
                           className={'w-full mb-10'}
                    />
                    :
                    <div className={'w-full text-3xl flex justify-center items-center aspect-[3/1] border-2 mb-10'}>No Image</div>
            }

            <div className={'text-2xl sm:text-3xl mb-5 w-1/2 sm:w-1/5 border-b-2 border-b-red-700 pb-2'}>
                {content.name}
            </div>
                <div className={'sm:text-xl flex'}>
                    {content.description}
                </div>
                <Suspense>
                    <SectionTitle title={'부서 사업영역'}/>
                </Suspense>
            {
                !content.isImplemented?
                    <Image src={content.domains as string} alt={'ORGANIZATION'}
                           width={1219}
                           height={399}
                           className={'w-full mb-20'}
                    />
                    :
                    <DepartmentBusinessDomainContainer content={content}/>
            }

                <Suspense>
                   <SectionTitle title={'부서 주요실적'}/>
                </Suspense>
            {
                !content.isImplemented?
                    <Image src={content.projects as string} alt={'ORGANIZATION'}
                           width={1221}
                           height={793}
                           className={'w-full mb-20'}/>
                    :
                    <DepartmentProjectsContainer projects={content.projects as departmentProject[]}/>
            }
        </div>
    );
}

function DepartmentBusinessDomainContainer({content} : {
    content: departmentInfo }){
    const currentDomains = content.domains as departmentDomain[];
    return (
        <div className={'w-full flex flex-col'}>
            <div className={'w-full sm:pl-4 text-lg sm:text-xl text-neutral-400 font-semibold'}>
                {`${content.name} 사업영역입니다.`}
            </div>
            <div className={'mt-6 grid grid-cols-1 sm:grid-cols-2 w-full sm:gap-x-6 gap-y-14 sm:gap-y-20'}>
                {currentDomains.map((domain,idx)=>(
                    <div key={idx} className={'w-full'}>
                        <DepartmentBusinessDomain departmentDomain={domain}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

function DepartmentBusinessDomain({departmentDomain}:{
    departmentDomain : departmentDomain
}){
    return (
        <div className={'w-full border-t-2 border-black pl-2 sm:pl-4 pt-2 sm:pt-3'}>
            <div className={'text-xl sm:text-2xl font-semibold'}>
                {departmentDomain.name}
            </div>
            <div className={'flex flex-col mt-3'}>
                {departmentDomain.actions.map((action,idx) => (
                    <div key={`${departmentDomain.name}${idx}`} className={'text-neutral-600'}>
                        - {action}
                    </div>
                ))}
            </div>
        </div>
    )
}

function DepartmentProjectsContainer({projects}:{
    projects: departmentProject[];
}){
    return(
        <div className={'w-full grid grid-cols-1 sm:grid-cols-4 sm:gap-x-8 gap-y-14 sm:gap-y-20'}>
            {projects.map((project, idx)=>{
                project.imageURL = `${PROJECT_IMG_PREFIX}/${project.name}.jpg`;
                return (
                <div key={`${idx}-project`} className={'w-full'}>
                    <DepartmentProejectCard project={project}/>
                </div>
                );
            })}
        </div>
    )
}

function DepartmentProejectCard({project}:{
    project: departmentProject;
}){
    return (
        <div className={'w-full flex flex-col'}>
            <div className={'relative aspect-square'}>
                <Image
                    src={project.imageURL as string} alt={"project image"}
                    fill
                    sizes={'100vw'}
                    style={{objectFit: 'cover'}}
                    className={'absolute top-0 left-0'}
                />
            </div>
            <div className={'flex flex-col aspect-[3/1]'}>
                <div className={'text-lg text-black font-semibold pb-2 h-[60%]'}>
                    {project.name}
                </div>
                <div className={'text-sm text-neutral-600 pb-1'}>
                    {project.projectOwner}
                </div>
                <div className={'text-sm text-neutral-500'}>
                    {project.startYear}
                </div>
            </div>

        </div>
    )
}
