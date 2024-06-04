import PageContainer from "@/app/hkdemo/applications/ui/pageContainer";
import BreadCrumbs from "@/app/hkdemo/applications/ui/breadCrumbs";

export default function Page() {
    return (
        <PageContainer>
            <div className={'w-full flex flex-col'}>
                <BreadCrumbs breadLink={{menuName:'비계',subMenuName:"쌍관줄비계"}}/>
            </div>
        </PageContainer>
    )
};