import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense} from "react";
import {history_data} from "@/app/subpage/about-us/history/history_data";
import HistoryBigCard from "@/app/subpage/about-us/history/history-card";
import HistorySmallCard from "@/app/subpage/about-us/history/history-small-card";

export default function Page() {

    return (
        <section className={'w-full px-[5%] sm:px-[10%] pb-10'}>
            <Suspense>
                <SectionTitle title={null}/>
            </Suspense>
            <div className={'flex justify-center items-center py-5 md:py-10 text-[3rem] md:text-[3.5rem]'}>
                <span className={'text-hkred pr-3'}>HK</span> <span className={'font-light'}>HISTORY</span>
            </div>
            <div className={'flex justify-center items-center text-[1.4rem] md:text-[2rem] py-5 md:py-10 shadow-sm'}>
                멈추지 않고 끊임없이 발전하는 기업
            </div>
            <div className={'mt-20 w-full hidden md:flex flex-col gap-y-12 items-center'}>
                {history_data.map((el,idx)=>(
                    <HistoryBigCard key={`${idx}-historyBigCard`} year={el.year} action={el.action}/>
                ))}
            </div>
            <div className={'mt-10 w-full flex md:hidden flex-col gap-y-16 items-center'}>
                {history_data.map((el,idx)=>(
                    <HistorySmallCard key={`${idx}-historyBigCard`} year={el.year} action={el.action}/>
                ))}
            </div>
        </section>
    )
};