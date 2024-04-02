import {getDomains} from "@/app/lib/hk/domainsData";
import DomainMenuWrapper from "@/app/ui/subpage/businesses/domains/domainContainer";

export default async function Page() {
    const domains = await getDomains();
    return (
        <section className={'w-full'}>
            <DomainMenuWrapper domains={domains}/>
        </section>
    )
};