import {ReactNode, Suspense} from "react";
import PageHeader from "@/app/ui/hkdemo/navbar/pagenav/page_header";

export default async function Layout({children}:
                                   {
                                       children: ReactNode
                                   }){
    return (
        <div className={'w-full h-full'}>
            <Suspense fallback={<div>loading...</div>}>
                <PageHeader/>
                <section className={'flex w-full'}>
                    <div className={'w-full'}>
                        {children}
                    </div>
                </section>
            </Suspense>
        </div>
    )
}