import {ReactNode} from "react";
import PageHeader from "@/app/ui/hkdemo/navbar/pagenav/page_header";

export default function Layout({children}:
                                   {
                                       children: ReactNode
                                   }){
    return (
        <div className={'w-full min-h-screen'}>
            {/*TODO: Suspense 처리해주자*/}
            <PageHeader/>
            {children}
        </div>
    )
}