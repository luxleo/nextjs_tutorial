'use client';

import {Suspense, useEffect, useState} from "react";
import {domain, getDepartmentInfo, getDomains} from "@/app/lib/hk/domainsData";
import clsx from "clsx";
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";



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
        <div className={'w-full'}>
            <Image src={content.domains_info} alt={'ORGANIZATION'}
                       width={1227}
                       height={435}
                       className={'w-full mb-10'}
                />
                <div className={'sm:text-xl flex'}>
                    {content.domains_description}
                </div>
                <Suspense>
                    <SectionTitle title={'부서 사업영역'}/>
                </Suspense>
                <Image src={content.domains_domains} alt={'ORGANIZATION'}
                       width={1219}
                       height={399}
                       className={'w-full mb-20'}
                />

                <Suspense>
                   <SectionTitle title={'부서 주요실적'}/>
                </Suspense>
                <Image src={content.domains_projects} alt={'ORGANIZATION'}
                       width={1221}
                       height={793}
                      className={'w-full mb-20'}/>
        </div>
    );
}
