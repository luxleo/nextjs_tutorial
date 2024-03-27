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
            <div className={'mt-20 w-full flex flex-col items-center'}>
                <Image src={CONTENT_URL.HISTORY} alt={'HISTORY'}
                       width={957}
                       height={816}
                       className={'w-[80%] mb-20'}
                />
            </div>
        </section>
    )
};