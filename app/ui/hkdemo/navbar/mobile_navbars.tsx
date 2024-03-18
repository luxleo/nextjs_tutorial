'use client';

import {useEffect, useState} from "react";
import {mainLink, subLink} from "@/app/ui/hkdemo/navbar/link_types";
import Link from "next/link";
import Image from "next/image";

import {RxHamburgerMenu} from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import clsx from "clsx";

import './navbar_style.css';
import {IconContext} from "react-icons";
import {links} from "@/app/ui/hkdemo/navbar/link_data";

export function PhoneNavBar({responsiveStlye}:{
    responsiveStlye: string
}) {
    const [sublinks, setSubLinks] = useState<subLink[] | undefined>([]);
    const [isPopup, setIsPopUp] = useState<boolean>(false);

    return (
        <div className={clsx("relative flex md:hidden w-full max-h-[80px] h-[10vh] px-[5%] py-2 text-sm shadow-sm",
            {
                'bg-white': responsiveStlye == 'scroll-downed',
                'text-white': responsiveStlye == 'default',
            })}>
            {/*left side*/}
            <section className={`grow-[0.2] flex justify-start w-[calc(120px+3.4vw)]`}>
                <div className={'relative w-full aspect-[2/1] flex items-center'}>
                    <Link href={"/hkdemo"}>
                        <Image className={'left-0'} src={"/hkdemo/hkenc_logo.png"} alt={"company logo"} width={1000} height={300}
                               priority={true}/>
                    </Link>
                </div>
            </section>
            <section className={'grow'}>
            </section>

            {/* right side*/}
            <section className={"grow-[0.2] flex items-center justify-end gap-8"}>
                <div className={clsx(
                    'block shadow-md rounded-md p-1 z-50',
                    {
                        'shadow-xl' : !isPopup
                    }

                ) }
                     onClick={() => {
                         setIsPopUp(!isPopup);
                     }}>
                    {isPopup? <IconContext.Provider value={{color:'white'}}>
                            <GrClose fill={'white'} className={'min-h-[20px] min-w-[20px] aspect-[1/1]'}/>
                        </IconContext.Provider>:
                        <IconContext.Provider value={{color: responsiveStlye == 'default'? 'white' : 'black'}}>
                            <RxHamburgerMenu className={'min-h-[20px] min-w-[20px] aspect-[1/1]'}/>
                        </IconContext.Provider>
                        }

                </div>
            </section>

            {/*    side nav pop up*/}
            {isPopup && <PopUpRootLayout/>}
        </div>
    );
}

function PopUpRootLayout(){
    return (
        <section className={'absolute right-0 top-0 z-40 w-full min-h-screen backdrop-blur flex justify-end'}>
            <div id={'PopUpWrapper'}
                 className={'flex flex-col w-[80%] rounded-l-xl bg-gradient-to-tr from-neutral-700 to-neutral-800'}>
                <div className={'h-[10vh] max-h-[80px]'}>

                </div>
                <div className={'max-h-[80vh] flex flex-col grow overflow-y-scroll'} >
                {links.map((mainLink) => (
                    <MainNavLink key={mainLink.name} mainLink={mainLink}/>
                ))}
                </div>
            </div>
        </section>
    );
}

function MainNavLink({mainLink}:{
    mainLink: mainLink;
}){
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <div className={"flex flex-col items-start justify-center pl-4 pb-3 text-neutral-50 text-[1.3rem] font-semibold"}
        onClick={()=>{
            setIsFocused(!isFocused);
        }}>
            <div className={'relative'}>
                <span className={clsx('link_hover_mobile',{
                    'active_link_hover' : isFocused
                })}>
                    {mainLink.name}
                </span>
            </div>
            <ul className={'pl-6 mt-3 overflow-x-hidden'}>
            {isFocused && mainLink.sub_link?.map((subLink) => (
                <SubNavLink key={subLink.name} subLink={subLink}/>
            ))}
            </ul>
        </div>
    );
}

function SubNavLink({subLink}: {
    subLink: subLink;
}) {
    return (
        <li className={'text-[1rem] text-neutral-50 py-[.43rem] font-light sub_nav'}>
            <Link href={subLink.href}>
                {subLink.name}
            </Link>
        </li>
    )
}