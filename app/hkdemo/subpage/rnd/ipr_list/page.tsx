import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {Suspense} from "react";

export default function Page() {

    return (
        <section className={'w-full'}>
            <Suspense>
                <SectionTitle title={'특허목록'}/>
            </Suspense>
            <div className={'mt-20 w-full flex flex-col items-start'}>
                <Image src={CONTENT_URL.RND_IPRLIST} alt={'ORGANIZATION'}
                       width={1277}
                       height={872}
                       className={'w-full mb-20'}
                />
            </div>
        </section>
    )
};