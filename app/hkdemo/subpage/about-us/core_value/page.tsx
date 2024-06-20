import styles from './core_value.module.css';
import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {Suspense} from "react";

export default function Page() {

    return (
        <section className={'w-full'}>
            <div className={'px-[5%] sm:px-[10%]'}>
                <Suspense>
                    <SectionTitle title={null}/>
                </Suspense>
            </div>
            <div className={'mt-20 w-full flex flex-col items-start px-[5%] sm:px-[10%]'}>
                <div className={'flex w-full'}>
                    <div className={`${styles.horse} basis-0 grow-[1.8] relative h-[500px]`}>
                        <Image src={CONTENT_URL.CORE_VALUE} alt={'core value'}
                               fill
                               objectFit={'cover'}
                               className={'w-full mb-20'}
                        />
                    </div>
                    <div className={`${styles.info_box} basis-0 grow flex flex-col self-center shadow-md py-8 px-8`}>
                        <div className={'text-[1.5rem] leading-none'}>
                            <span className={'font-light text-neutral-700'}>경영철학</span><br/>
                            <span className={'text-[3.2rem]'}>馬不停蹄</span>
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
            <div className={'w-full relative h-[500px] mt-10 md:mt-30 lg:mt-52'}>
                <div className={'absolute top-10 left-0 bg-white z-50'}>
                    경영이념

                </div>
                <Image src={CONTENT_URL.CORE_VALUE_FOOTER} alt={'core_value_footer'}
                       fill
                       objectFit={'cover'}
                />
            </div>
        </section>
    )
};