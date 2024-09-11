'use client';
import {Dispatch, MutableRefObject, SetStateAction, useEffect, useMemo, useRef, useState, WheelEvent} from "react";
import clsx from "clsx";
import {linkForLandingPage} from "@/app/ui/hkdemo/navbar/link_types";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/app/ui/hkdemo/overview/hero/hero";
import {linksForLandingPage} from "@/app/ui/hkdemo/navbar/link_data";
import {IconContext} from "react-icons";
import {BsArrowDown} from "react-icons/bs";
import {throttling} from "@/app/lib/utils";

export default function HeroContainer() {
    const outerDivRef = useRef<HTMLDivElement | null>(null);
    const [globalHeight, setGlobalHeight] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const wheelHandler = (e : WheelEvent<HTMLDivElement>) => {
        const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
        if (pageHeight != globalHeight) {
            setGlobalHeight(pageHeight);
        }
        const {deltaY} = e;
        const scrollTop = document.documentElement.scrollTop;

        if (deltaY > 0) {
            // 스크롤 내릴 때
            if (scrollTop >= 0 && scrollTop < pageHeight) {
                //현재 1페이지
                //outerDivRef.current?
                window.scrollTo({
                    top: pageHeight,
                    left: 0,
                    behavior: "smooth",
                });
                setCurrentPage(2);
            } else if (scrollTop < pageHeight * 2 ) {
                //현재 2페이지
                window.scrollTo({
                    top: pageHeight*2,
                    left: 0,
                    behavior: "smooth",
                });
                setCurrentPage(3);
            } else if (scrollTop < pageHeight * 3 ) {
                // 현재 3페이지
                window.scrollTo({
                    top: pageHeight*3,
                    left: 0,
                    behavior: "smooth",
                });
                setCurrentPage(4);
            } else {
                // 현재 4페이지
                window.scrollTo({
                    top: document.body.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                });
                const innerHeight = window.innerHeight;
                const diff = document.body.scrollHeight - window.scrollY;
                setCurrentPage(5);
                // setCurrentWindowBottom(1);
            }
        } else {
            // 스크롤 올릴 때
            if (scrollTop >= 0 && scrollTop <=pageHeight ) {
                //현재 1페이지
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
                setCurrentPage(1);
            } else if (scrollTop <= pageHeight * 2) {
                //현재 2페이지
                window.scrollTo({
                    top: pageHeight,
                    left: 0,
                    behavior: "smooth",
                });
                setCurrentPage(2);
            } else if (scrollTop <= pageHeight * 3) {
                // 현재 3페이지
                window.scrollTo({
                    top: pageHeight* 2,
                    left: 0,
                    behavior: "smooth",
                });
                setCurrentPage(3);
            }
            // else {
            //     window.scrollTo({
            //         top: pageHeight* 3,
            //         left: 0,
            //         behavior: "smooth",
            //     });
            //     setCurrentPage(4);
            // }
        }
    }

    useEffect(() => {
        function preventDefaultWheel (e : any) {
            e.preventDefault();
            // footer가 화면에 렌더링 되면서 필요없어졌다.
            // if(window.scrollY === (document.body.scrollHeight - window.innerHeight)){
            //     window.scrollTo({
            //         top: 0,
            //         left: 0,
            //         behavior: "smooth",
            //     });
            //     setCurrentPage(4);
            // }
            const pageHeight = window.innerHeight;
            const {deltaY} = e;
            if (deltaY <0 && window.scrollY > pageHeight * 3) {
                window.scrollTo({
                    top: pageHeight * 3,
                    left: 0,
                    behavior: "smooth",
                });
                setCurrentPage(4);
            }
        }


        setGlobalHeight(window.innerHeight);
        window.addEventListener('wheel', preventDefaultWheel, {
            passive: false,
        });


        return () => {
            window.removeEventListener('wheel',preventDefaultWheel);
        };
    }, []);

    const throttleWheelHandler = useMemo(() => throttling(600), []);
    return (
        <div id={'indexContainer'} ref={outerDivRef}
             className={"relative w-full justify-center items-center"}
             onWheel={(e) => {
                 throttleWheelHandler(() => wheelHandler(e));
             }}
        >
            <Dots currentPage={currentPage} contentPointer={outerDivRef} setCurrentPage={setCurrentPage}
                  pageHeight={globalHeight}/>
            <Hero/>
            {linksForLandingPage.map(data => (
                <SectionContainer key={data.title} title={data.title} description={data.description}
                                  sub_link={data.sub_link}
                                  bg_URL={data.bg_URL}/>

            ))}

            <div className={clsx('sticky hidden bottom-1 md:flex flex-col items-center justify-end', {
                'md:hidden': currentPage === 5
            })}>
                <div className={'bounce-icon'}>
                    <IconContext.Provider value={{color: 'white', size: '1.5rem'}}>
                        <BsArrowDown/>
                    </IconContext.Provider>
                </div>
                <div className={'text-white text-sm'}>
                    scroll down
                </div>
            </div>
        </div>
    );
};

const Dot = ({num, currentPage, contentPointer, setCurrentPage, pageHeight, content}: {
    pageHeight: number;
    currentPage: number;
    num: number;
    contentPointer: MutableRefObject<HTMLDivElement | null>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    content: string;
}) => {
    const DIVIDER_HEIGHT = 1;
    return (
        <div className={clsx('flex gap-2 text-sm cursor-pointer', {
            'text-white': currentPage !== num,
            'text-red-700 font-bold': currentPage === num,
        })}
             onClick={() => {
                 setCurrentPage(num);
                 // contentPointer.current?
                 window.scrollTo({
                         top: (pageHeight + DIVIDER_HEIGHT) * (num - 1),
                         left: 0,
                         behavior: 'smooth',
                     }
                 );
             }}
        >
            <div
                style={{
                    borderRadius: 999,
                    backgroundColor: "transparent",
                    transitionDuration: '1000',
                    transition: "background-color 0.5s",
                }}
                onClick={() => {
                    window.scrollTo({
                        top: num === 1 ? 0 : (pageHeight + DIVIDER_HEIGHT) * (num - 1),
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(num);
                }}
                className={clsx('w-6 h-6 flex justify-center items-center', {
                    'border-4 border-red-700': currentPage === num,
                })}
            >
                <div className={clsx('w-1 h-1 rounded-full', {
                    'bg-red-700': currentPage === num,
                    'bg-white': currentPage !== num,
                })}></div>
            </div>
            {content}
        </div>
    );
};

const Dots = ({ currentPage,contentPointer, setCurrentPage,pageHeight }:{
    currentPage : number;
    contentPointer: MutableRefObject<HTMLDivElement | null>;
    setCurrentPage : Dispatch<SetStateAction<number>>;
    pageHeight: number;
}) => {
    return (
        <div style={{ position: "fixed", top: "50%", right: 100 }} className={'z-10 p-4 hidden md:block'}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                    height: 130,
                }}
            >
                <Dot num={1} currentPage={currentPage} contentPointer={contentPointer}
                     setCurrentPage={setCurrentPage} pageHeight={pageHeight} content={'HK ENC'}/>
                <Dot num={2} currentPage={currentPage} contentPointer={contentPointer}
                     setCurrentPage={setCurrentPage} pageHeight={pageHeight} content={'BUSINESSES'}/>
                <Dot num={3} currentPage={currentPage} contentPointer={contentPointer}
                     setCurrentPage={setCurrentPage} pageHeight={pageHeight} content={'R&D'}/>
                <Dot num={4} currentPage={currentPage} contentPointer={contentPointer}
                     setCurrentPage={setCurrentPage} pageHeight={pageHeight} content={'PR CENTER'}/>
            </div>
        </div>
    );
};

function SectionContainer(data : linkForLandingPage){
    return (
        <div className={'w-full sticky top-0 h-[100vh] flex flex-col justify-center items-center'}>
            <Image src={data.bg_URL} alt={'hero image'}
                   fill
                   sizes={'50vw'}
                   style={{
                       objectFit: 'cover'
                   }}
                   className={'absolute top-0 left-0 -z-10 brightness-75'}
            />
            <div className={'text-5xl font-semibold text-white'}>
                {data.title}
            </div>
            <div className={'w-[90%] md:w-1/2 text-xl md:text-2xl mt-10 md:mt-14 text-center text-white font-semibold'}>
                {data.description}
            </div>
            <div className={'w-full flex justify-center gap-3 mt-10 md:mt-20'}>
                {data.sub_link.map((item) => (
                    <div key={`${item.name}-sublink-forMain`} className={'flex justify-center items-center border-2 text-sm md:text-xl text-white hover:text-black hover:bg-white text-center'}>
                        <Link href={{
                            pathname: item.href,
                        }} className={'w-full h-full flex justify-center items-center px-5 md:px-20 py-2'}>
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}