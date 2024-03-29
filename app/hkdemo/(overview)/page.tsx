'use client';
import Hero from "@/app/ui/hkdemo/overview/hero/hero";
import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import '../hk_global.css';
import {IconContext} from "react-icons";
import {BsArrowDown} from "react-icons/bs";
import clsx from "clsx";


export default function Page() {
    // 쓰로틀링 조절 변수
    let scrollThrottler : any = null;
    const outerDivRef = useRef<HTMLDivElement | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isInit, setIsInit] = useState<boolean>(false);

    useEffect(() => {
        const wheelHandler = (e : WheelEvent) => {
            const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
            const DIVIDER_HEIGHT = 1;
            e.preventDefault();
            if(!scrollThrottler){
                scrollThrottler = setTimeout(function () {
                    scrollThrottler = null;
                    const { deltaY } = e;
                    const { scrollTop } = outerDivRef.current as HTMLDivElement; // 스크롤 위쪽 끝부분 위치


                    if (deltaY > 0) {
                        // 스크롤 내릴 때
                        if (scrollTop >= 0 && scrollTop < pageHeight) {
                            //현재 1페이지
                            console.log("현재 2페이지, down");
                            outerDivRef.current?.scrollTo({
                                top: pageHeight + DIVIDER_HEIGHT,
                                left: 0,
                                behavior: "smooth",
                            });
                            setCurrentPage(2);
                        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                            //현재 2페이지
                            console.log("현재 3페이지, down");
                            outerDivRef.current?.scrollTo({
                                top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                                left: 0,
                                behavior: "smooth",
                            });
                            setCurrentPage(3);
                        } else if(scrollTop >= pageHeight && scrollTop < pageHeight * 3){
                            // 현재 3페이지
                            console.log("현재 4페이지, down");
                            outerDivRef.current?.scrollTo({
                                top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
                                left: 0,
                                behavior: "smooth",
                            });
                            setCurrentPage(4);
                        }else{
                            // 현재 4페이지
                            console.log("현재 4페이지, deep down");
                            window.scrollTo({
                                top: document.body.scrollHeight,
                                left: 0,
                                behavior: "smooth",
                            });
                            setCurrentPage(5);
                        }
                    } else {
                        // 스크롤 올릴 때
                        if (scrollTop >= 0 && scrollTop <= pageHeight + DIVIDER_HEIGHT) {
                            //현재 1페이지
                            console.log("현재 1페이지, up");
                            outerDivRef.current?.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                            setCurrentPage(1);
                        } else if (scrollTop >= pageHeight && scrollTop <= (pageHeight + DIVIDER_HEIGHT)*2) {
                            //현재 2페이지
                            console.log("현재 2페이지, up");
                            outerDivRef.current?.scrollTo({
                                top: (pageHeight + DIVIDER_HEIGHT),
                                left: 0,
                                behavior: "smooth",
                            });
                            setCurrentPage(2);
                        } else if(scrollTop >= pageHeight && scrollTop <= (pageHeight + DIVIDER_HEIGHT)*3 && window.scrollY == 0){
                            // 현재 3페이지
                            console.log("현재 3페이지, up");
                            outerDivRef.current?.scrollTo({
                                top: (pageHeight + DIVIDER_HEIGHT)*2,
                                left: 0,
                                behavior: "smooth",
                            });
                            setCurrentPage(3);
                        }else{
                            console.log("현재 4페이지, deep up");
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                            setCurrentPage(4);
                        }
                    }
                },200);
            }
        };
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent?.addEventListener("wheel", wheelHandler);
        setIsInit(true);
        return () => {
            outerDivRefCurrent?.removeEventListener("wheel", wheelHandler);
        };
    }, []);
    return (
        <div id={'indexContainer'} ref={outerDivRef}
             className={"relative h-[100vh] overflow-y-scroll w-full justify-center items-center"}>
            <Dots currentPage={currentPage} contentPointer={outerDivRef} setCurrentPage={setCurrentPage}/>
            <Hero/>
            <div className={'w-full h-[1px] bg-neutral-400'}></div>
            <div id={'index2'} className={'w-full h-[100vh] bg-neutral-400'}>
                <SectionContainer title={'Business'}/>
            </div>
            <div className={'w-full h-[1px] bg-neutral-400'}></div>
            <div id={'index3'} className={'w-full h-[100vh] bg-neutral-500'}>
                <SectionContainer title={'R&D'}/>
            </div>
            <div className={'w-full h-[1px] bg-neutral-400'}></div>
            <div id={'index4'} className={'w-full h-[100vh] bg-neutral-600'}>
                <SectionContainer title={'PR CENTER'}/>
            </div>

            <div className={clsx('sticky bottom-1 flex flex-col items-center justify-end',{
                'hidden' : currentPage === 5
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
    )
};

const Dot = ({ num, currentPage,contentPointer,setCurrentPage }:{
    currentPage : number;
    num : number;
    contentPointer: MutableRefObject<HTMLDivElement| null>;
    setCurrentPage : Dispatch<SetStateAction<number>>;
}) => {
    const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
    const DIVIDER_HEIGHT = 1;
    return (
        <div
            style={{
                borderRadius: 999,
                backgroundColor: "transparent",
                transitionDuration: '1000',
                transition: "background-color 0.5s",
            }}
            onClick={()=>{
                contentPointer.current?.scrollTo({
                    top: num ===1? 0 : (pageHeight + DIVIDER_HEIGHT)*(num-1),
                    left: 0,
                    behavior: "smooth",
                });
                setCurrentPage(num);
            }}
            className={clsx('w-6 h-6 flex justify-center items-center',{
                'border-2 border-red-700' : currentPage === num,
            })}
        >
            <div className={clsx('w-1 h-1 rounded-full',{
                'bg-red-700' : currentPage === num,
                'bg-white' : currentPage !== num,
            })}></div>
        </div>
    );
};

const Dots = ({ currentPage,contentPointer, setCurrentPage }:{
    currentPage : number;
    contentPointer: MutableRefObject<HTMLDivElement | null>;
    setCurrentPage : Dispatch<SetStateAction<number>>;
}) => {
    return (
        <div style={{ position: "fixed", top: "50%", right: 100 }} className={'z-10 p-4 hidden sm:block'}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                    height: 130,
                }}
            >
                <div className={clsx('flex gap-2 text-sm',{
                    'text-white' : currentPage !== 1,
                    'text-red-700' : currentPage === 1,
                })}><Dot num={1} currentPage={currentPage} contentPointer={contentPointer}
                                             setCurrentPage={setCurrentPage}/> HK ENC
                </div>
                <div className={clsx('flex gap-2 text-sm',{
                    'text-white' : currentPage !== 2,
                    'text-red-700' : currentPage === 2,
                })}>
                    <Dot num={2} currentPage={currentPage} contentPointer={contentPointer}
                         setCurrentPage={setCurrentPage}/> BUSINESSES
                </div>
                <div className={clsx('flex gap-2 text-sm',{
                    'text-white' : currentPage !== 3,
                    'text-red-700' : currentPage === 3,
                })}>
                    <Dot num={3} currentPage={currentPage} contentPointer={contentPointer}
                         setCurrentPage={setCurrentPage}/> R&D
                </div>
                <div className={clsx('flex gap-2 text-sm',{
                    'text-white' : currentPage !== 4,
                    'text-red-700' : currentPage === 4,
                })}>
                    <Dot num={4} currentPage={currentPage} contentPointer={contentPointer}
                         setCurrentPage={setCurrentPage}/> PR CENTER
                </div>
            </div>
        </div>
    );
};

function SectionContainer({title}:{
    title:string;
}){
    return (
        <div className={'w-full h-full flex flex-col justify-center items-center'}>
            <div className={'text-3xl text-white'}>
                {title}
            </div>
            <div className={'w-full flex justify-center gap-3 mt-10 sm:mt-20'}>
                <div className={'rounded-full bg-white w-20 h-20 text-center'}>링크1</div>
                <div className={'rounded-full bg-white w-20 h-20 text-center'}>링크2</div>
                <div className={'rounded-full bg-white w-20 h-20 text-center'}>링크3</div>
                <div className={'rounded-full bg-white w-20 h-20 text-center'}>링크4</div>
            </div>
        </div>
    )
}