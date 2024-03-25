'use client';

import FilterNavBar from "@/app/ui/subpage/businesses/project/filter_bar";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {useState} from "react";
import clsx from "clsx";

//TODO: mock up으로 해두어서 다시 하기
//TODO: content box
export default function ProjectsContainer() {
    const [toggleImage, setToggleImage] = useState<boolean>(false);

    return (
        <div className={'w-full flex gap-10'}>
            <div className={'whitespace-nowrap'}>
                <FilterNavBar setToggleImage={setToggleImage}/>
            </div>
            <div className={'grow basis-0'}>
                <Image src={CONTENT_URL.PROJECTS1} alt={'ORGANIZATION'}
                       width={1150}
                       height={680}
                       className={clsx('w-full mb-20',{
                           'hidden' : toggleImage
                       })}
                />
                <Image src={CONTENT_URL.PROJECTS2} alt={'ORGANIZATION'}
                       width={1150}
                       height={680}
                       className={clsx('w-full mb-20',{
                           'hidden' : !toggleImage
                       })}
                />
            </div>
        </div>
    )
};