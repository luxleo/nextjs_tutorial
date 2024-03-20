import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense} from "react";

export default function Page() {

    return (
        <section className={'w-[90%]'}>
            <Suspense>
                <SectionTitle title={null}/>
            </Suspense>
        </section>
    )
};