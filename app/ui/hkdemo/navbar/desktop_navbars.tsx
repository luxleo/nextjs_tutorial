'use client';

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {mainLink, subLink} from "@/app/ui/hkdemo/navbar/link_types";

import {RxHamburgerMenu} from "react-icons/rx";
import {links} from "@/app/ui/hkdemo/navbar/link_data";
import './navbar_style.css';
import clsx from "clsx";

// INFO: 데스크탑 브라우져와 폰 브라우져를 분리한 이유 => navbar 이탈시 이벤트나 다른 이벤트들을 분리하기 위해서

export default function HomeNavBar({responsiveBackground}:{
    responsiveBackground: string;
}) {
    const [sublinks, setSubLinks] = useState<subLink[] | undefined>(undefined);

    const targetClassName = 'active_link_hover'
    function removeUnderLines() {
        let targets = document.getElementsByClassName(targetClassName);
        let size = targets.length;
        if (size > 0) {
            for (let i = 0; i < size; i++) {
                targets[i].classList.remove(targetClassName);
            }
        }
    }
    return (
        <div className={clsx("relative hidden md:flex w-full px-[10%] py-2 text-sm shadow-md",
            {
                'bg-white': responsiveBackground == 'scroll-downed',

            })}
             onMouseLeave={() => {
                 //TODO: 현재 참조한 링크에 해당하는 서브 링크들 랜더링 종료
                 setSubLinks(undefined);
                 removeUnderLines();
             }}>
            {/*left side*/}
            <section className={`grow-[0.2] flex basis-0 justify-start w-[calc(86px+3.4vw)]`}>
                <div className={'relative md:w-[120px] w-[18vw] aspect-[2/1] flex items-center'}>
                    <Link href={"/hkdemo"}>
                        <Image className={'left-0'} src={"/hk_log.png"} alt={"company logo"} width={120} height={60}
                               priority={true}/>
                    </Link>
                </div>
            </section>
            <section className={'grow flex basis-0 justify-center items-center gap-[3vw]'}>
                {links.map(mainlink => (
                    <div key={mainlink.name} onMouseEnter={()=>{
                        setSubLinks(mainlink.sub_link);
                    }}>
                        <NavMainLink link={mainlink}/>
                    </div>
                ))}
            </section>

            {/* right side*/}
            <section className={"grow-[0.2] flex basis-0 items-center justify-end gap-8"}>
            </section>

            {/* 서브링크 랜더링*/}
            <section
                className={`${sublinks != undefined && sublinks.length > 0 ? 'absolute left-0 top-[100%] w-full flex justify-center' : ''}`}>
                <div className={'gap-10 flex justify-center items-center py-4 rounded-lg shadow-md w-[80%]'}>
                    {sublinks?.map((sublink) => (
                        <NavSubLink key={sublink.name} link={sublink}/>
                    ))}
                </div>
            </section>
        </div>
    )
};

function NavMainLink({link}:
                         {
                             link: mainLink;
                         }) {
    function onMouseEnterHandler(e: any) {
        const targetClassName = 'active_link_hover'
        let targets = document.getElementsByClassName(targetClassName);
        let size = targets.length;
        if (size > 0) {
            for (let i = 0; i < size; i++) {
                targets[i].classList.remove(targetClassName);
            }
        }
        document.getElementById(`span-${link.name}`)?.classList.add(targetClassName);
    }

    return (
        <div className={'group px-2'} onMouseEnter={onMouseEnterHandler}>
            <p className={'relative cursor-pointer flex items-center gap-2 text-neutral-600 group-hover:text-black text-xl font-bold'}>
                <span id={`span-${link.name}`}
                      className={'link_hover'}>{link.name}</span>
            </p>
        </div>
    );
}

function NavSubLink({link}: {
    link: subLink
}) {
    return (
        <div>
            <Link href={link.href}>
                <p className={'text-lg font-medium text-neutral-600 hover:text-black hover:font-semibold'}>
                   <span>
                        {link.name}
                   </span>
                </p>
            </Link>
        </div>
    );
}