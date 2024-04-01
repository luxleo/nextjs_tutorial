'use client';
import {mainLink, pageMainLink} from "@/app/ui/hkdemo/navbar/link_types";
import {usePathname, useSearchParams} from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import {findMainLinkWithName} from "@/app/ui/hkdemo/navbar/link_data";
import Link from "next/link";
import {useEffect} from "react";

//LEARN: min-h는 h를 부여하지 않아서 자식 요소가 참조할 요소가 없음.
//TODO: 현재는 search param으로 메뉴이름들을 받아 오는 형식 => 추후 서버에서 받는 형식으로 해야할 거 같다.
export default function PageHeader(){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const mainLinkName = searchParams.get('mainLinkName');
    const subLinkName = searchParams.get('subLinkName');

    const imageURLPrefix = '/hkdemo/subpage_images/';
    const imageURL = `${imageURLPrefix}${pathname.split('/')[2]}.jpg`;
    const currentLink = findMainLinkWithName(mainLinkName as string);

    useEffect(() => {
        console.log(imageURL);
    }, []);
    return (
        <section className={'relative w-full flex flex-col h-[300px] sm:h-[300px] lg:h-[450px]'}>
            <PageNavbarBackgroundImage imageURL={pathname.split('/').includes('location')? `${imageURLPrefix}contact.jpg` : imageURL}/>
            <PageNavbarWrapper mainLinkName={mainLinkName?.toString()} subLinkName={subLinkName?.toString()} mainLink={currentLink}/>
        </section>
    );
}

function PageNavbarWrapper({mainLinkName, subLinkName,mainLink}:{
    mainLinkName: string | undefined;
    subLinkName: string | undefined;
    mainLink: mainLink;
}) {
    return (
        <div className={'w-full min-h-full flex flex-col px-[10%]'}>
            {/* guide layout section */}
            <div className={'grow'}></div>
            <div className={'min-h-[30%]'}></div>

            {/* page navbar section*/}
            <div className={'grow flex flex-col'}>
                {mainLinkName !== undefined ? <PageNavbar mainLink={mainLink} subLinkName={subLinkName}/> :
                ''}
            </div>
        </div>
    )
}

function PageNavbar({mainLink,subLinkName}:{
    mainLink: mainLink;
    subLinkName: string | undefined
}) {
    return (
        <div className={'relative flex flex-col h-full items-center w-full'}>
            <div className={'text-2xl sm:text-3xl lg:text-5xl text-white'}>
                {mainLink?.name}
            </div>
            <div className={'absolute bottom-0 flex w-full sm:w-[90%]'}>
                {mainLink?.sub_link?.map(sublink=>(
                    <div key={sublink.name} className={clsx('grow h-[3rem] text-md sm:h-[4rem] sm:text-xl lg:h-[5rem] lg:text-xl font-light',
                        {
                            'bg-neutral-900 bg-opacity-60 text-white' : sublink.name != subLinkName,
                            'bg-red-700 bg-opacity-100 text-white': sublink.name == subLinkName
                        })}>
                        <Link href={{
                            pathname: sublink.href,
                            query: {
                                mainLinkName: mainLink.name,
                                subLinkName: sublink.name
                            }
                        }} className={'w-full h-full flex items-center justify-center'}
                        >
                            {sublink.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

function PageNavbarBackgroundImage({ imageURL}:
                                {
                                    imageURL: string;
                                }) {
    return <Image src={imageURL} alt={'hero image'}
                  fill
                  sizes={'100vw'}
                  style={{
                      objectFit: 'cover'
                  }}
                  className={'absolute top-0 left-0 -z-10 brightness-75'}
    />;
}