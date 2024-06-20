'use client';

import {Suspense, useEffect, useState} from "react";
import {
    departmentDomain,
    departmentInfo,
    departmentProject,
    domain,
} from "@/app/lib/hk/domainsData";
import clsx from "clsx";
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {PROJECT_IMG_PREFIX} from "@/app/hkdemo/subpage/businesses/projects/data";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
export default function DomainMenuWrapper({domains,currentDomain, currentDepartment, departmentInfo}:{
    domains: domain[];
    currentDomain: domain;
    currentDepartment: string;
    departmentInfo: departmentInfo;
}){
    // const [currentDomain, setCurrentDomain] = useState<domain>(domains[0]);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    function onClickHandler(domainName: string){
        const params = new URLSearchParams(searchParams);
        params.set('currentDomain', domainName);
        params.delete('currentDepartment');

        replace(`${pathname}?${params.toString()}`)
    }
    return (
        <div className={''}>
            <div className={'w-full flex justify-center bg-neutral-100'}>
                <div className={'w-[80%] md:w-[50%] flex justify-between overflow-x-scroll md:overflow-x-clip gap-3'}>
                {domains.map(domain => (
                    <div key={domain.menu} onClick={() => onClickHandler(domain.menu)}
                         className={clsx('whitespace-nowrap text-center text-xl py-6 md:py-8 hover:cursor-pointer', {
                             'text-neutral-900 border-b-red-500 border-b-4': domain === currentDomain
                         })}>
                            {domain.menu}
                    </div>
                ))}
                </div>
            </div>
            <div className={'px-[5%] md:px-[10%]'}>
                <div className={'mt-10 md:mt-20 w-full flex justify-center text-2xl md:text-3xl md:font-extrabold'}>
                    {currentDomain.menu}
                </div>
                <DomainDepartmentNavBar departments={currentDomain.departments} currentDomain={currentDomain} currentDepartment={currentDepartment} departmentInfo={departmentInfo}/>
            </div>
        </div>
    )
}

function DomainDepartmentNavBar({departments,currentDomain,currentDepartment,departmentInfo}: {
    departments: string[];
    currentDomain: domain;
    currentDepartment: string;
    departmentInfo: departmentInfo;
}) {
    //const [currentDepartment, setCurrentDepartment] = useState<string>(departments[0]);

    //useEffect(()=>{
    //    setCurrentDepartment(departments[0])
    //},[departments])
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    function onClickHandler(departmentName: string){
        const params = new URLSearchParams(searchParams);
        params.set('currentDomain', currentDomain.menu);
        params.set('currentDepartment', departmentName);

        replace(`${pathname}?${params.toString()}`)

    }
    return (
        <div className={'w-full flex flex-col items-center mt-6 md:mt-10'}>
            <div className={'w-full flex md:justify-center md:gap-0 overflow-x-scroll md:overflow-x-hidden'}>
                {departments.map(department => (
                    <div key={department} className={clsx('text-black font-semibold whitespace-nowrap text-sm md:text-lg px-8 py-4', {
                        'text-white bg-red-600': department === currentDepartment,
                        'md:hover:bg-neutral-100': department !== currentDepartment
                    })}
                         onClick={() => onClickHandler(department)}
                    >
                        {department}
                    </div>
                    ))}
            </div>
            <DomainInfoContainer currentDepartment={currentDepartment} departmentInfo={departmentInfo}/>
        </div>
    );
}

function DomainInfoContainer({currentDepartment, departmentInfo}:{
    currentDepartment: string;
    departmentInfo: departmentInfo;
}) {
    const content = departmentInfo;
    return (
        <div className={'w-full mb-10 md:mb-20'}>
            {
                content.infoImageURL !== undefined ?
                    <div className={'w-full relative aspect-[2/1] md:aspect-[3/1] mb-10'}>
                        <Image src={content.infoImageURL as string} alt={'ORGANIZATION'}
                               fill
                               sizes={'100vw'}
                               className={'w-full object-cover'}
                               priority
                        />
                    </div>
                    :
                    <div className={'w-full relative aspect-[2/1] md:aspect-[3/1] mb-10'}>
                        <Image src={CONTENT_URL.DOMAINS_INFO} alt={'ORGANIZATION'}
                               fill
                               sizes={'100vw'}
                               className={'w-full object-cover'}
                        />
                    </div>
            }
            <div className={'text-2xl md:text-3xl mb-5 w-1/2 md:w-1/5 border-b-2 border-b-red-700 pb-2'}>
                {content.name}
            </div>
            <div className={'md:text-xl flex'}>
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

            {/*    <Suspense>*/}
            {/*       <SectionTitle title={'부서 주요실적'}/>*/}
            {/*    </Suspense>*/}
            {/*{*/}
            {/*    !content.isImplemented?*/}
            {/*        <Image src={content.projects as string} alt={'ORGANIZATION'}*/}
            {/*               width={1221}*/}
            {/*               height={793}*/}
            {/*               className={'w-full mb-20'}/>*/}
            {/*        :*/}
            {/*        <DepartmentProjectsContainer projects={content.projects as departmentProject[]} currentDepartment={currentDepartment}/>*/}
            {/*}*/}
        </div>
    );
}

function DepartmentBusinessDomainContainer({content} : {
    content: departmentInfo }){
    const currentDomains = content.domains as departmentDomain[];
    return (
        <div className={'w-full flex flex-col'}>
            {/*<div className={'w-full md:pl-4 text-lg md:text-xl text-neutral-400 font-semibold'}>*/}
            {/*    {`${content.name} 사업영역입니다.`}*/}
            {/*</div>*/}
            <div className={'mt-6 grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-6 gap-y-14 md:gap-y-20'}>
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
        <div className={'w-full border-t-2 border-black pl-2 md:pl-4 pt-2 md:pt-3'}>
            <div className={'text-xl md:text-2xl font-semibold'}>
                {departmentDomain.name}
            </div>
            <div className={'flex flex-col mt-3'}>
                {departmentDomain.actions?.map((action,idx) => (
                    <div key={`${departmentDomain.name}${idx}`} className={'text-neutral-600'}>
                        - {action}
                    </div>
                ))}
            </div>
        </div>
    )
}

function DepartmentProjectsContainer({projects, currentDepartment}:{
    projects: departmentProject[];
    currentDepartment: string;
}){
    return(
        <div className={'w-full grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 gap-y-14 sm:gap-y-20'}>
            {projects.map((project, idx)=>{
                //project.imageURL = `${PROJECT_IMG_PREFIX}/${project.name}.jpg`;
                return (
                <div key={`${idx}-${project.name}`} className={'w-full px-[10%] sm:px-0'}>
                    <DepartmentProejectCard project={project} currentDepartment={currentDepartment}/>
                </div>
                );
            })}
        </div>
    )
}

function DepartmentProejectCard({project, currentDepartment}:{
    project: departmentProject;
    currentDepartment: string;
}){
    //TODO: process.env로 로컬과 원격 환경 image src 관리해주기
    return (
        <div className={'w-full flex flex-col pb-2 border-neutral-300 border-b-2 sm:border-0 sm:pb-0'}>
            <div className={'relative aspect-square'}>
                <Image
                    src={`${PROJECT_IMG_PREFIX}/${project.imageURL[currentDepartment]}`} alt={"project image"}
                    fill
                    sizes={'100vw'}
                    style={{objectFit: 'cover'}}
                    className={'absolute top-0 left-0'}
                />
            </div>
            <div className={'flex flex-col'}>
                <div className={'text-sm md:text-lg text-black font-semibold md:h-[60%]'}>
                    {project.name}
                </div>
                <div className={'text-xs md:text-sm text-neutral-600 pb-1'}>
                    {project.projectOwner}
                </div>
                <div className={'text-xs md:text-sm text-neutral-500'}>
                    {project.startDate?.split('.')[0]}
                </div>
            </div>

        </div>
    )
}
