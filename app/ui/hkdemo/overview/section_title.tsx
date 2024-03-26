'use client';
import {useSearchParams} from "next/navigation";

export default function SectionTitle({title}:{
    title: string | null;
}) {
    const searchParams = useSearchParams();
    const subLinkName = searchParams.get('subLinkName');

    const displayTitle = title == null ? subLinkName?.toString() : title;

    return (
        <h1 className={'w-full flex items-center text-xl md:text-2xl mb-5 sm:mb-10 pt-10 sm:pt-20'}>
            <TitleIcon/> <span className={'pl-2 text-inherit font-medium'}>{displayTitle}</span>
        </h1>
    )
};

function TitleIcon() {
    return (
        <div className={'flex items-center justify-center bg-[#ff1919] w-5 h-5 sm:w-6 sm:h-6 rounded-br-lg rounded-tl-lg'}>
            <div className={'bg-white w-3 h-3 sm:w-4 sm:h-4 rounded-br-sm rounded-tl-sm'}></div>
        </div>
    )
}