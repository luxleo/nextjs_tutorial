import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_IMG_URL, CONTENT_URL} from "@/app/subpage/prefixed";
import {Suspense} from "react";
import { MdOutlineSimCardDownload } from "react-icons/md";
import {Metadata} from "next";
import CommonContainer from "@/app/ui/subpage/commom-container";

//TODO: 브로슈어 지금은 올라가있는 파일 다운로드하게
// 되어있는데 추후에 서버로 요청해서 내려받도록 하자. + 다운로드 횟수도 카운트 해보기
export const metadata : Metadata = {
    title: "브로슈어"
}
export default function Page() {

    return (
        <CommonContainer>
            <Suspense>
                <SectionTitle title={'브로슈어'}/>
            </Suspense>
            <div className={'w-full flex flex-col sm:items-start '}>
                <div className={'mb-4 flex items-center gap-2'}>
                    <div className={'sm:text-2xl'}>
                    HK E&C 브로슈어
                    </div>
                    <div className={'px-2 rounded-sm py-2 bg-neutral-200 text-black text-sm hover:bg-neutral-400'}>
                        <a href={'/hkdemo/content/brochure/00_HK E&C(2023년)지명원수정230925.pdf'} download>
                            <div className={'flex items-center gap-1'}>
                                <MdOutlineSimCardDownload/> 다운로드
                            </div>
                        </a>
                    </div>
                </div>
                <div className={'w-full sm:w-[400px]'}>
                    <Image
                        width={573}
                        height={827}
                        src={CONTENT_IMG_URL.BROCHURE_COVER}
                        alt={'브로슈어 커버이미지'}
                        className={'object-cover'}
                        priority={true}
                        />
                </div>

        </div>
        </CommonContainer>
)
};