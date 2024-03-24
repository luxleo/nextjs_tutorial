'use client';

import FilterNavBar from "@/app/ui/subpage/businesses/project/filter_bar";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {useState} from "react";
import clsx from "clsx";

//TODO: mock up으로 해두어서 다시 하기
export default function ProjectsContainer() {
    const [toggleImage, setToggleImage] = useState<boolean>(false);

    return (
        <div className={'w-full flex'}>
            <FilterNavBar setToggleImage={setToggleImage}/>
            <Image src={CONTENT_URL.PROJECTS1} alt={'ORGANIZATION'}
                   width={1227}
                   height={435}
                   className={clsx('w-full mb-20',{
                       'hidden' : toggleImage
                   })}
            />
            <Image src={CONTENT_URL.PROJECTS2} alt={'ORGANIZATION'}
                   width={1227}
                   height={435}
                   className={clsx('w-full mb-20',{
                       'hidden' : !toggleImage
                   })}
            />
        </div>
    )
};