import {getDomains} from "@/app/lib/hk/domainsData";
import DomainMenuWrapper from "@/app/ui/subpage/businesses/domains/domainContainer";

export default async function Page() {
    const domains = await getDomains();
    return (
        <section className={'w-full'}>
            <DomainMenuWrapper domains={domains}/>
            {/*<Suspense>*/}
            {/*    <SectionTitle title={null}/>*/}
            {/*</Suspense>*/}
            {/*<div className={'sm:mt-15 w-full flex flex-col items-start'}>*/}
            {/*    <BusinessMenuWrapper/>*/}
            {/*    <Image src={CONTENT_URL.DOMAINS_INFO} alt={'ORGANIZATION'}*/}
            {/*           width={1227}*/}
            {/*           height={435}*/}
            {/*           className={'w-full mb-20'}*/}
            {/*    />*/}
            {/*    <Suspense>*/}
            {/*        <SectionTitle title={'부서 사업영역'}/>*/}
            {/*    </Suspense>*/}
            {/*    <Image src={CONTENT_URL.DOMAINS_DOMAINS} alt={'ORGANIZATION'}*/}
            {/*           width={1219}*/}
            {/*           height={399}*/}
            {/*           className={'w-full mb-20'}*/}
            {/*    />*/}

            {/*    <Suspense>*/}
            {/*        <SectionTitle title={'부서 주요실적'}/>*/}
            {/*    </Suspense>*/}
            {/*    <Image src={CONTENT_URL.DOMAINS_PROJECTS} alt={'ORGANIZATION'}*/}
            {/*           width={1221}*/}
            {/*           height={793}*/}
            {/*           className={'w-full mb-20'}*/}
            {/*    />*/}
            {/*</div>*/}
        </section>
    )
};