import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/subpage/prefixed";
import {Suspense} from "react";
import styles from './styles.module.css'
import GreetingContainer from "@/app/subpage/about-us/greeting/greeting-container";
import InfoContainer from "@/app/subpage/about-us/greeting/info-container";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "인사말",
};

export default async function Page() {


    return (
        <section className={'w-full'}>
            <div className={'px-[5%] sm:px-[10%]'}>
                <Suspense>
                    <SectionTitle title={'인사말'}/>
                </Suspense>
                <div className={'mt-5 sm:mt-20 w-full flex flex-col items-start'}>

                    {/*<Image src={CONTENT_URL.GREETING} alt={'greeting'}*/}
                    {/*       width={922}*/}
                    {/*        height={548}*/}
                    {/*       className={'w-[90%]'}*/}
                    {/*       />*/}
                    {/*<Image src={CONTENT_URL.GREETING_BANNER} alt={'greeting'}*/}
                    {/*       width={922}*/}
                    {/*       height={548}*/}
                    {/*       className={'w-full mt-20'}*/}
                    {/*/>*/}
                    <GreetingContainer/>
                    <div className={'h-[50px] md:h-[200px]'}>

                    </div>
                </div>
            </div>

            <InfoContainer/>
        </section>
    )
};

