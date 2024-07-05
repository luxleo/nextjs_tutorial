import Image from "next/image";
import {CONTENT_URL} from "@/app/subpage/prefixed";
import {Suspense} from "react";
import {motion} from "framer-motion";

import styles from './core_value.module.css';
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {ShareValue} from "@/app/subpage/about-us/core_value/core-value-framers";

export default function Page() {

    return (
        <section className={'w-full'}>
            <div className={'px-[5%] sm:px-[10%]'}>
                <Suspense>
                    <SectionTitle title={null}/>
                </Suspense>
            </div>
            <div className={'mt-20 w-full flex flex-col items-start px-[5%] sm:px-[10%]'}>
                <div className={'flex flex-col md:flex-row w-full'}>
                    <div className={`${styles.horse} w-full h-[250px] md:basis-0 md:grow-[1.8] relative md:h-[300px] lg:h-[450px]`}>
                        <Image src={CONTENT_URL.CORE_VALUE} alt={'core value'}
                               fill
                               objectFit={'cover'}
                        />
                    </div>
                    <div className={`${styles.info_box} w-full md:basis-0 md:grow flex flex-col self-center shadow-md py-8 px-8`}>
                        <div className={'text-[1.5rem] leading-none'}>
                            <span className={'font-light text-neutral-700'}>경영철학</span><br/>
                            <span className={'text-[3.2rem]'}>馬不停蹄 <span className={'text-[1.2rem] text-neutral-500'}>| 마부정제</span></span>
                        </div>
                        <div className={'mt-[1.5rem] text-[1.6rem]'}>
                            달리는 말은 말굽을 멈추지 않는다.
                        </div>
                        <div className={`mt-[3.2rem] text-[1.1rem] font-light`}>
                            달리는 말이 굽을 멈추지 않듯<br/>
                            잠시의 열정이 아닌 지속되는 노력으로<br/>
                            난관에 멈추지 않고 해결책을 구함으로<br/>
                            우리는 노력을 멈추지 않고 끊임없이 발전합니다.
                        </div>
                    </div>
                </div>
            </div>
            <div className={'w-full relative h-[500px] mt-[250px] md:mt-[300px] lg:mt-[350px]'}>
                <ShareValue/>
                <Image src={CONTENT_URL.CORE_VALUE_FOOTER} alt={'core_value_footer'}
                       fill
                       objectFit={'cover'}
                />
            </div>
        </section>

    )
};
