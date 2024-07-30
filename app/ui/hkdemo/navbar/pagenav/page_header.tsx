'use client';
import {mainLink, pageMainLink} from "@/app/ui/hkdemo/navbar/link_types";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import {findMainLinkWithName} from "@/app/ui/hkdemo/navbar/link_data";
import Link from "next/link";
import {useEffect, useState} from "react";

//LEARN: min-h는 h를 부여하지 않아서 자식 요소가 참조할 요소가 없음.
//TODO: 현재는 search param으로 메뉴이름들을 받아 오는 형식 => 추후 서버에서 받는 형식으로 해야할 거 같다.
export default function PageHeader(){
    const pathname = usePathname();
    const [mainLinkName, setMainLinkName] = useState<string>(getMainLinkName(pathname));
    const [subLinkName, setSubLinkName] = useState<string>(getSubLinkName(pathname));
    useEffect(() => {
        setMainLinkName(getMainLinkName(pathname));
        setSubLinkName(getSubLinkName(pathname))
    }, [pathname]);

    const imageURLPrefix = '/hkdemo/subpage_images/';
    const imageURL = `${imageURLPrefix}${findImageURL(pathname)}.jpg`;
    const currentLink = findMainLinkWithName(mainLinkName);
    function getMainLinkName (pathName: string) {
        const splitted = pathName.split('/');
        let result = "";
        if (splitted.length > 1) {
            result =  splitted[splitted.length - 2];
        }
        return result;
    }
    function getSubLinkName (pathName: string) {
        const splitted = pathName.split('/');
        let result = "";
        if (splitted.length > 1) {
            result =  splitted[splitted.length - 1];
        }
        return result;
    }
    function findImageURL(rawURL: string) {
        const splitURL = rawURL.split('/');
        let result = "";
        if (splitURL.length > 2) {
            result =  splitURL[splitURL.length - 2];
        } else {
            result = splitURL[splitURL.length-1];
        }
        return result;
    }

    return (
        <section className={'relative w-full flex flex-col h-[200px] sm:h-[350px]'}>
            <PageNavbarBackgroundImage imageURL={imageURL}/>
            <PageNavbarWrapper mainLinkName={mainLinkName} subLinkName={subLinkName} mainLink={currentLink}/>
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
                'None'}
            </div>
        </div>
    )
}

function PageNavbar({mainLink,subLinkName}:{
    mainLink: mainLink;
    subLinkName: string | undefined;
}) {
    const router = useRouter();
    return (
        <div className={'relative flex flex-col h-full items-center w-full'}>
            <div className={'text-2xl md:text-3xl lg:text-5xl lg:pb-10 text-white'}>
                {mainLink?.name}
            </div>
            <div className={'absolute bottom-0 flex w-full md:w-[90%]'}>
                {mainLink?.sub_link?.map(sublink=>(
                    <div key={sublink.name} className={clsx('grow h-[3rem] text-md md:h-[4rem] md:text-xl lg:h-[5rem] lg:text-xl font-light',
                        {
                            'bg-neutral-900 bg-opacity-60 text-white' : sublink.eng_name != subLinkName,
                            'bg-red-600 bg-opacity-100 text-white': sublink.eng_name == subLinkName
                        })}
                         onClick={()=>router.push(sublink.href)}
                    >
                        <div
                            className={'w-full h-full flex items-center justify-center'}
                        >
                            {sublink.name}
                        </div>
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
                  sizes={'60vw'}
                  style={{
                      objectFit: 'cover'
                  }}
                  // placeholder={'blur'}
                  className={'absolute top-0 left-0 -z-10 brightness-75'}
                  priority={true}
    />;
}