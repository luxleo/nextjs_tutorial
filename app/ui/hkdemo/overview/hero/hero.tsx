'use client';

import {useEffect, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import { RxExternalLink } from "react-icons/rx";
import { BsArrowDown } from "react-icons/bs";

import './hero_style.css';
import {HeroTextContainerProp} from "@/app/ui/hkdemo/overview/hero/definitions";
import {IconContext} from "react-icons";
import Link from "next/link";

const heroImageUrlPrefix = '/hkdemo/hero_images/';
const heroImageUrls = ['city1.jpg', 'road1.jpg', 'water1.jpg'];

type heroAction = {
    actionName: string;
    href: string;
}

//TODO: action name type 정하기
const tempHeroActions = ['회사 소개','프로젝트','오시는 길'];
const heroActions : heroAction[] = [{
    actionName: '회사 소개',
    href: '/hk/about-us/greeting?mainLinkName=회사소개&subLinkName=인사말'
},{
    actionName:'프로젝트',
    href: '/hk/businesses/projects?mainLinkName=사업소개&subLinkName=프로젝트'
},{
    actionName:'오시는 길',
    href: '/hk/contact/location?mainLinkName=Contact+Us&subLinkName=오시는+길'
}];

// TODO: 이미지 전환 될때 레이아웃 남겨두면서 부드럽게 전환하가
// TODO: 이미지 화면에 랜더링 될때 요청한다. => 최초 랜더링시 모든 이미지 요청까지 시간이 걸린다. 해결하기 => hidden으로 하지 않고 opacity를 주었음.
export default function Hero() {
    const [heroIdx, setHeroIdx] = useState<number>(0);

    const changeHeroImage = ()=>{
        setHeroIdx(prev => {
            if (prev == heroImageUrls.length-1)
                return 0;
            return prev+1;
        });
    }

    // LEARN: useEffect dependany array 비워도 가능하다.
    useEffect(()=>{
        const interval = setInterval(
            changeHeroImage, 3000
        );
        return ()=>{
            clearInterval(interval);
        }
    })

    return (
        <section className={'h-screen w-full'}>
            <div className={'relative w-full h-full overflow-hidden'}>
                {heroImageUrls.map((url,idx) => (
                    <HeroImageContainer key={idx} idx={idx} currentIdx={heroIdx} imageURL={`${heroImageUrlPrefix}${url}`}/>
                ))}
                <HeroTextContainer props={{heading: 'Human Korea Technology', subheading:'사람과 기술로 혁신하는 기업'}}/>
            </div>
        </section>
    );
};

function HeroImageContainer({idx, currentIdx, imageURL}:
                                {
                                    idx: number;
                                    currentIdx: number;
                                    imageURL: string;
                                }) {
    return <Image src={imageURL} alt={'hero image'}
                  fill
                  sizes={'100vw'}
                  style={{
                      objectFit: 'cover'
                  }}
                  className={clsx('absolute top-0 left-0 -z-10', {
                      'opacity-0': idx != currentIdx,
                      'activate': idx == currentIdx
                  })}
    />;
}

function HeroTextContainer({props}:
                               {props: HeroTextContainerProp}){
    return (
        <div className={'w-full h-full flex flex-col text-white pl-[10%]'}>
            {/* layout용 */}
            <div className={'grow'}></div>

            {/* text section */}
            <div className={'grow text-4xl text-inherit flex flex-col justify-center gap-6'}>
                <h1 className={'text-inherit'}>
                    {props.heading}
                </h1>
                <h2 className={'text-inherit text-2xl'}>
                    {props.subheading}
                </h2>
                <div className={'flex gap-3'}>
                    {heroActions.map((action,idx) => (
                        <HeroAction key={`${idx}-${action}`} heroAction={action} />
                        ))}
                </div>
            </div>

            {/* footer section */}
            <div className={'grow flex items-end justify-center'}>
                <div className={'bounce-icon'} >
                    <IconContext.Provider value={{color:'white', size:'3rem'}}>
                        <BsArrowDown />
                    </IconContext.Provider>
                </div>
                <div className={'text-lg'}>
                    scroll down
                </div>
            </div>
        </div>
    )
}

function HeroAction({heroAction}:{
    heroAction: heroAction;
}){
    return (
        <div className={'p-1 md:p-2 border-white border-[1px]'}>
            <Link href={heroAction.href} className={'flex items-center gap-1 md:gap-2'}>
            <h3 className={'text-inherit text-[1rem] md:text-lg'}>
                {heroAction.actionName}
            </h3>
            <div>
                <IconContext.Provider value={{color:'white', size:'1rem'}}>
                    <RxExternalLink/>
                </IconContext.Provider>
            </div>
            </Link>
        </div>
    )
}