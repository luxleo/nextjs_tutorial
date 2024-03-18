import Hero from "@/app/ui/hkdemo/overview/hero/hero";
import Companyinfo from "@/app/ui/hkdemo/overview/company_info/companyinfo";
import FullContainer from "@/app/ui/hkdemo/container/full_container";

const companyInfoContent = '㈜ 에이치케이이앤씨는 우수하고 진취적 사고의 전문인력과 함께 우리나라 건설기술의 선진화에 기여합니다.'

export default function Page() {
    return (
        <div className={"min-h-screen w-full flex flex-col justify-center items-center"}>
            <Hero/>
            <FullContainer>
                <Companyinfo content={companyInfoContent}/>
            </FullContainer>

        </div>
    );
};