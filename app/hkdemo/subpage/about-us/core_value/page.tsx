import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {Suspense} from "react";

export default function Page() {

    return (
        <section className={'w-full'}>
            <Suspense>
                <SectionTitle title={null}/>
            </Suspense>
            <div className={'mt-20 w-full flex flex-col items-start'}>
                <Image src={CONTENT_URL.CORE_VALUE} alt={'core value'}
                       width={1415}
                       height={548}
                       className={'w-full mb-20'}
                />
                <SectionTitle title={'공유가치'}/>
                <Image src={CONTENT_URL.SHARE_VALUE} alt={'greeting'}
                       width={1210}
                       height={300}
                       className={'w-full mt-20'}
                />
            </div>
        </section>
    )
};