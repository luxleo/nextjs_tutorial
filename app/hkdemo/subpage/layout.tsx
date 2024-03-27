import {ReactNode, Suspense} from "react";
import PageHeader from "@/app/ui/hkdemo/navbar/pagenav/page_header";

export default function Layout({children}:
                                   {
                                       children: ReactNode
                                   }){
    return (
        <div className={'w-full min-h-screen'}>
            {/*TODO: Suspense 처리해주자*/}
            <Suspense fallback={<div>loading...</div>}>
                <PageHeader/>
            </Suspense>
            <section className={'flex justify-center'}>
                <div className={'w-full'}>
                    {children}
                </div>
            </section>
        </div>
    )
}