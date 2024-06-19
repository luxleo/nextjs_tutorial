'use client';
import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import {clsx} from "clsx";

export default function GreetingContainer() {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    useEffect(() => {
        // Set a timeout to change the visibility of the second div after the first animation completes
        const timer2 = setTimeout(() => {
            setIsVisible2(true);
        }, 500); // This delay should match the duration of the slideInBottom animation

        const timer1 = setTimeout(() => {
            setIsVisible(true);
        }, 200);

        // Cleanup the timeout if the component unmounts
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        }
    }, []);
    return (
        <div className={'w-full flex max-w-[1440px]'}>
            <div className={'flex flex-col md:flex-row'}>
                <div className={`md:basis-0 md:grow-[1.5] md:text-lg pt-3 shadow-md px-5 py-6 md:pr-10 bg-white md:z-50`}>
                    <div className={`${styles.slideUp} w-full h-full`}>
                        (주)에이치케이이앤씨는 2012년 창립하여 기술자 중심의 종합설계 및 안전진단 회사로 성장하였습니다.
                        <br/>
                        <br/>
                        사업 분야는 토목설계, 내진해석 및 내진성능평가, 지반안전영향평가, 각종 영향평가, 구조물 안전진단, 도시개발, 민간투자사업 등 건설시장의 빠른 환경변화에 능동적으로 대처하는
                        종합엔지니어링 회사로 발돋움하고자 노력하고 있습니다.
                        <br/>
                        <br/>
                        “달리는 말은 말굽을 멈추지 않는다.”라는 마부정제(馬不停蹄)의 경영이념으로 지난 성과에 안주하지 않고 더욱 발전하고 정진하여 우수한 기술력과 진취적인 사고의 전문기술인으로
                        최고의 기술적 서비스와 품질로 우리나라 건설기술의 선진화를 위해 도전의식과 열정을 가지고 꾸준히 노력하겠습니다.
                        <br/>
                        <br/>
                        (주)에이치케이이앤씨는 그동안 축적한 경험과 기술력에 안주하지 않고 끊임없는 기술개발과 혁신으로 더욱 사랑받는 기업이 되도록 발전하고 정진하는 기업이 되겠습니다.
                        <br/>
                        <br/>
                        대표이사 박 현 재
                    </div>
                </div>
                <div className={'order-first h-[50px] w-full md:order-last md:basis-0 md:grow-[1] hidden md:flex md:h-full'}>
                    <div className={`relative md:w-[200px] h-[80%] self-start`}>
                        <div className={clsx(`${styles.slideInLate} ${styles.hideBeforeMove} absolute top-3 h-[90%] max-h-[400px] left-0 md:text-6xl text-white w-[85%] flex justify-end pt-3 pr-2 bg-red-700 -z-20`,{
                            'hidden' : !isVisible2
                        })}>
                            K
                        </div>
                        <div className={clsx(`${styles.slideInFirst} absolute w-[60%] top-0 left-0 h-full bg-hkred shadow-lg max-h-[440px]`,{
                            'hidden' : !isVisible
                        })}>
                            <div className={'md:text-[4.3rem] text-white flex justify-end pt-0 pr-3'}>
                                <p className={'drop-shadow-lg'}>H</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}