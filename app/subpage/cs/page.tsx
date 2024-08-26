import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import CommonContainer from "@/app/ui/subpage/commom-container";
import ContactForm from "@/app/subpage/cs/contact-form";
import {Suspense} from "react";

export default function Page() {
    return (
        <CommonContainer>
            <SectionTitle title={'문의사항'}/>
            <Suspense>
                <ContactForm/>
            </Suspense>
        </CommonContainer>
    )
};