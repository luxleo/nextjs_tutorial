import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {Suspense} from "react";

export default function Page() {


    return (
        <section className={'w-full px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={null}/>
            </Suspense>
            <div className={'mt-20 w-full flex flex-col items-start'}>
                <Image src={CONTENT_URL.GREETING} alt={'greeting'}
                       width={922}
                        height={548}
                       className={'w-[90%]'}
                       />
                <Image src={CONTENT_URL.GREETING_BANNER} alt={'greeting'}
                       width={922}
                       height={548}
                       className={'w-full mt-20'}
                />
            </div>
        </section>
    )
};