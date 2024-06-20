import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {Suspense} from "react";
import {history_data} from "@/app/hkdemo/subpage/about-us/history/history_data";
import HistoryBigCard from "@/app/hkdemo/subpage/about-us/history/history-card";

export default function Page() {

    return (
        <section className={'w-full px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={null}/>
            </Suspense>
            <div className={'flex justify-center items-center py-10 text-[3.5rem]'}>
                <span className={'text-hkred pr-3'}>HK</span> <span className={'font-light'}>HISTORY</span>
            </div>
            <div className={'flex justify-center items-center text-[2rem] py-10 shadow-sm'}>
                멈추지 않고 끊임없이 발전하는 기업
            </div>
            <div className={'mt-20 w-full flex flex-col gap-y-12 items-center pb-10'}>
                {history_data.map((el,idx)=>(
                    <HistoryBigCard key={`${idx}-historyBigCard`} year={el.year} action={el.action}/>
                ))}
            </div>
        </section>
    )
};