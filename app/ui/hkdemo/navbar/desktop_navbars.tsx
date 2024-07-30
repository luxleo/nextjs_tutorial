'use client';

import {Dispatch, SetStateAction, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {mainLink, subLink} from "@/app/ui/hkdemo/navbar/link_types";

import {links} from "@/app/ui/hkdemo/navbar/link_data";
import './navbar_style.css';
import clsx from "clsx";

// INFO: 데스크탑 브라우져와 폰 브라우져를 분리한 이유 => navbar 이탈시 이벤트나 다른 이벤트들을 분리하기 위해서

export default function HomeNavBar({responsiveBackground}:{
    responsiveBackground: string;
}) {
    const [sublinks, setSubLinks] = useState<subLink[] | undefined>(undefined);
    const [mainLinkName, setMainLinkName] = useState<string>('');
    const targetClassName = 'active_link_hover';

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
        // LEARN: important -> 속성을 최우선순위로 둔다. tailwind css 에서는 !으로 important를 설정한다.
        <div className={clsx("relative md:!flex hidden w-full h-[10vh] px-[10%] py-5 text-sm shadow-md group",
            {
                'bg-white': responsiveBackground == 'scroll-downed',
                'text-white bg-neutral-900 bg-opacity-10 hover:bg-white hover:bg-opacity-100': responsiveBackground == 'default'
            })}

             onMouseLeave={() => {
                 //TODO: 현재 참조한 링크에 해당하는 서브 링크들 랜더링 종료
                 setSubLinks(undefined);
                 setMainLinkName('');
                 removeUnderLines();
             }}>
            {/*left side*/}
            <section className={`md:grow-[0.2] flex basis-0 justify-start w-[calc(150px+3.4vw)]`}>
                <div className={'relative md:w-full w-[18vw] flex items-center'}>
                    <Link href={"/"}>
                        <Image className={'left-0'} src={"/hkdemo/hkenc_logo.png"} alt={"company logo"} width={300} height={300}
                               priority={true}/>
                    </Link>
                </div>
            </section>
            <section className={'grow flex basis-0 justify-center items-center gap-[3vw]'}>
                {links.map(mainlink => (
                    <div key={mainlink.name} onMouseEnter={()=>{
                        setSubLinks(mainlink.sub_link);
                        setMainLinkName(mainlink.name);
                    }}
                    >
                        <NavMainLink link={mainlink} responsiveStyle={responsiveBackground}/>
                    </div>
                ))}
            </section>

            {/* right side*/}
            <section className={"grow-[0.2] flex basis-0 items-center justify-end gap-8"}>
            </section>

            {/* 서브링크 랜더링*/}
            <section
                className={`${sublinks != undefined && sublinks.length > 0 ? 'absolute left-0 top-[100%] w-full flex justify-center' : ''}`}>
                <div className={'gap-10 flex justify-center items-center py-4 rounded-b-md shadow-inner w-[80%] bg-white'}>
                    {sublinks?.map((sublink) => (
                        <NavSubLink key={sublink.name} link={sublink} mainLinkName={mainLinkName}/>
                    ))}
                </div>
            </section>
        </div>
    )
};

function NavMainLink({link,responsiveStyle}:
                         {
                             link: mainLink;
                             responsiveStyle: string;
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
        <>
            {link.href === undefined ?
                <div className={'px-2'} onMouseEnter={onMouseEnterHandler}>
                <p className={clsx('relative cursor-pointer flex items-center gap-2 text-xl text-black hover:text-inherit',
                    {
                        'text-black': responsiveStyle == 'scroll-downed',
                        'text-white group-hover:text-black': responsiveStyle == 'default'
                    })}>
                <span id={`span-${link.name}`}
                      className={'link_hover'}>{link.name}</span>
                </p>
                </div> :
                <div className={'px-2'} onMouseEnter={onMouseEnterHandler}>
                    <Link href={link.href}>
                        <p className={clsx('relative cursor-pointer flex items-center gap-2 text-xl text-black hover:text-inherit',
                            {
                                'text-black': responsiveStyle == 'scroll-downed',
                                'text-white group-hover:text-black': responsiveStyle == 'default'
                            })}>
                        <span id={`span-${link.name}`}
                            className={'link_hover'}>{link.name}</span>
                        </p>
                    </Link>
                </div>
            }
        </>
    );
}

//LEARN: 링크로 연결된 컴포넌트에 동적 랜더링을 위해서 searchParam을 이용한다.
function NavSubLink({link, mainLinkName}: {
    link: subLink;
    mainLinkName: string
}) {
    return (
        <div>
            <Link href={{
                pathname: link.href
            }}>
                <p className={'text-lg font-medium hover:text-black hover:font-semibold text-neutral-600'}>
                   <span>
                        {link.name}
                   </span>
                </p>
            </Link>
        </div>
    );
}