import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/subpage/prefixed";
import {Suspense} from "react";

export default function Page() {

    return (
        <section className={'w-full px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={'문의하기'}/>
            </Suspense>
            <div className={'mt-20 w-full flex flex-col items-start'}>
                <Image src={CONTENT_URL.CONTACT_QUERY} alt={'ORGANIZATION'}
                       width={1196}
                       height={679}
                       className={'w-full mb-20'}
                />
            </div>
        </section>
    )
};