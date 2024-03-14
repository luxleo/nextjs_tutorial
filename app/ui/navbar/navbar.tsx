'use client';
import Image from "next/image";

import styles from './style.module.css';
import {lusitana} from "@/app/ui/fonts";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import {useState} from "react";

/* TODO:
 * 1. link 더미 데이터 만들기
 * 2. 해당하는 대 분류 호버시에 하위 목록 만드는 섹터 만들기
 * 3. 대분류 link로 접속하면 하위 link를 포함한 페이지로 라우팅 한다.
 * 4. usestate 안쓰고 server component로 가능하면 구현하기 => 안될거 같다 usePathname 도 써야해서 ...
 */
type mainLink = {
    name: string;
    href: string;
    sub_link?: subLink[];
}
type subLink = {
    name: string;
    href: string;
}
const links : mainLink[] = [
    {
    name: "회사소개",
    href: "/navbar/company_info",
    sub_link: [
        {
            name: "비전",
            href: "/navbar/company_info/vision"
        },
        {
            name: "History",
            href: "/navbar/company_info/history"
        },
        {
            name: "Peoples",
            href: "/navbar/company_info/peoples"
        }
    ]},
    {
        name: "사업소개",
        href: "/navbar/business_info",
        sub_link: [
            {
                name: "사업영역",
                href: "/navbar/business_info/business_domain"
            },
            {
                name: "프로젝트",
                href: "/navbar/business_info/project"
            }
        ]},
    {
        name: "test",
        href: "/test"
    }
]

// TODO: onMouseLeave event로 navbar 컴포넌트 이탈시 참조중인 메인 메뉴 초기화 하기
// TODO: useState로 대분류 메뉴 => 소분류 메뉴 구분하기
// TODO: 모바일 / pc 완전히 구분해서 만들기


export default function NavBar() {
    const [sublinks, setSubLinks] = useState<subLink[] | undefined>([]);
    return (
        <>
            {/* PC 용 드랍다운 navbar */}

            <div className={"relative hidden md:flex w-full px-[15%] py-3 text-sm"}
                 onMouseLeave={() => {
                     //TODO: 현재 참조한 링크에 해당하는 서브 링크들 랜더링 종료
                     setSubLinks([]);
                 }}>
                {/*left side*/}
                <section className={`grow-[0.2] flex justify-start w-[calc(86px+3.4vw)]`}>
                    <div className={'relative md:w-[120px] w-[18vw] aspect-[2/1] flex items-center'}>
                        <Image className={'left-0'} src={"/hk_log.png"} alt={"company logo"} width={120} height={60} priority={true}/>
                    </div>
                </section>
                <section className={'grow flex items-center gap-[3vw]'}>
                    {links.map(mainlink => (
                        <div key={mainlink.name} onMouseEnter={() => {
                            setSubLinks(mainlink?.sub_link);
                        }}>
                            <NavMainLink link={mainlink}/>
                        </div>
                    ))}
                </section>

                {/* md 이상일때 레이아웃 용 섻견 */}
                <section className={'grow flex md:hidden'}>

                </section>
                {/* right side*/}
                <section className={"grow-[0.2] flex items-center justify-end gap-8"}>
                </section>

                {/* 서비링크 랜더링*/}
                <section
                    className={`${  sublinks != undefined && sublinks.length >0 ? 'absolute left-0 top-[100%] gap-6 flex items-center mx-auto w-full shadow-md rounded-lg h-10': '' }`}>
                    {sublinks?.map((sublink) => (
                        <NavSubLink key={sublink.name} link={sublink}/>
                    ))}
                </section>
            </div>

            {/*  모바일 용 dropdown navbar*/}
            <div className={"relative flex md:hidden w-full px-[5%] py-3 text-sm"}>
                {/*left side*/}
                <section className={`grow-[0.2] flex justify-start w-[calc(86px+3.4vw)]`}>
                    <div className={'relative w-[18vw] aspect-[2/1] flex items-center'}>
                        <Image className={'left-0'} src={"/hk_log.png"} alt={"company logo"} width={120} height={60} priority={true}/>
                    </div>
                </section>
                <section className={'grow hidden'}>
                </section>

                {/* md 이상일때 레이아웃 용 섻견 */}
                <section className={'grow flex'}>
                </section>
                {/* right side*/}
                <section className={"grow-[0.2] flex items-center justify-end gap-8"}>
                    <div className={'block shadow-lg border-2 rounded-md p-1 hover:shadow-2xl'}>
                        <RxHamburgerMenu className={'min-h-[20px] min-w-[20px] aspect-[1/1]'}/>
                    </div>
                </section>
            </div>
        </>

    );
};

function NavMainLink({link}:
                         { link: mainLink; }) {
    return (
        <Link href={link.href} className={'group px-2'}>
            <p className={'cursor-pointer flex items-center gap-2 text-neutral-500 group-hover:text-black text-lg font-bold'}>
                <span>{link.name}</span>
            </p>
            {/*<div*/}
            {/*    className={'absolute left-0 top-[100%] hidden gap-6 group-hover:flex items-center mx-auto w-full shadow-md rounded-lg h-10'}>*/}
            {/*    {link.sub_link?.map((sublink) => (*/}
            {/*        <NavSubLink link={sublink}/>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </Link>
    )
}

function NavSubLink({link}: {
    link: subLink
}) {
    return (
        <div>
            <Link href={link.href}>
                {link.name}
            </Link>
        </div>
    );
}