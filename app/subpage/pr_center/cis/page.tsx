import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import Image from "next/image";
import {CONTENT_URL} from "@/app/subpage/prefixed";
import {Suspense} from "react";

export default function Page() {

    return (
        <section className={'w-full px-[5%] md:px-[10%] pb-10'}>
            <Suspense>
                <SectionTitle title={'CI 자료'}/>
            </Suspense>
            <div className={'w-full grid grid-cols-1 md:grid-cols-3 md:gap-y-[15rem]'}>
                {/*symbol mark section*/}
                <div className={'text-4xl md:text-5xl'}>
                    <div className={'border-b-2 md:max-w-[20vw] border-red-700 pb-2'}>
                        Symbol Mark
                    </div>
                </div>
                <div className={'w-full flex flex-col mt-10 md:mt-0 mb-20 md:mb-0 items-start md:col-span-2'}>
                    <div className={'w-[40vw] md:w-[20vw]'}>
                        <Image src={CONTENT_URL.PR_CI} alt={'ORGANIZATION'}
                               width={1277}
                               height={872}
                               className={'w-full'}
                        />
                    </div>
                    <div className={'w-full mt-6 md:mt-10 md:text-xl'}>
                        <span className={'text-hkred font-bold'}>HK</span>의 새로운 CI는 건설엔지니어링 전문기업으로서의 전문성을 표현하기 위하여 건설을
                        통해 만들고자 하는
                        유연한 대처의 곡선과 진취성을 의미하는 직선으로 구성되어 있습니다. 이와 더불어 Human korea를 의마하는 H | K 알파벳과 열정의
                        색상인 붉은색, 통합과 순수를 의미하는 흰색으로 상징화 하여 21세기 무한성장 기업으로서의 <span
                        className={'text-hkred font-bold'}>HK</span>의
                        비전을 표현하고 있습니다.
                    </div>
                </div>
                {/*footer color section*/}
                <div className={'text-4xl md:text-5xl'}>
                    <div className={'border-b-2 md:max-w-[20vw] border-red-700 pb-2'}>
                        Color System
                    </div>
                </div>
                <div className={'w-full flex flex-col mt-10 md:mt-0 items-start md:col-span-2'}>
                    <div className={'flex flex-col w-full'}>
                        <div className={'flex items-center w-full text-3xl'}>
                            Main Color
                            <div className={'grow border-black border'}></div>
                        </div>
                        <div className={'flex flex-col gap-y-3 items-end w-full pt-10'}>
                            <div
                                className={'w-[90%] rounded-br-lg rounded-tl-lg bg-hkred text-white pl-10 py-2 font-semibold h-[3rem] text-xl'}>
                                HK RED
                            </div>
                            <div className={'w-[85%] flex justify-start'}>
                                <ul className={'list-disc'}>
                                    <li>
                                        <span className={'font-semibold'}>C</span> 0 <span
                                        className={'font-semibold'}>M</span> 100 <span
                                        className={'font-semibold'}>Y</span> 90 <span
                                        className={'font-semibold'}>K</span> 0
                                    </li>
                                    <li>
                                        <span className={'font-semibold'}>R</span> 237 <span
                                        className={'font-semibold'}>G</span> 26 <span
                                        className={'font-semibold'}>B</span> 46
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={'mt-14 flex items-center w-full text-3xl'}>
                            Sub Color
                            <div className={'grow border-black border'}></div>
                        </div>
                        <div className={'flex flex-col gap-y-3 items-end w-full pt-10'}>
                            <div
                                className={'w-[90%] rounded-br-lg rounded-tl-lg bg-hkcyan text-white pl-10 py-2 font-semibold h-[3rem]'}>
                            </div>
                            <div className={'w-[85%] flex justify-start'}>
                                <ul className={'list-disc'}>
                                    <li>
                                        <span className={'font-semibold'}>C</span> 64 <span
                                        className={'font-semibold'}>M</span> 10 <span
                                        className={'font-semibold'}>Y</span> 4 <span
                                        className={'font-semibold'}>K</span> 0
                                    </li>
                                    <li>
                                        <span className={'font-semibold'}>R</span> 71 <span
                                        className={'font-semibold'}>G</span> 181 <span
                                        className={'font-semibold'}>B</span> 224
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-y-3 items-end w-full pt-10'}>
                            <div
                                className={'w-[90%] rounded-br-lg rounded-tl-lg bg-hkivory text-white pl-10 py-2 font-semibold h-[3rem]'}>
                            </div>
                            <div className={'w-[85%] flex justify-start'}>
                                <ul className={'list-disc'}>
                                    <li>
                                        <span className={'font-semibold'}>C</span> 14 <span
                                        className={'font-semibold'}>M</span> 6 <span
                                        className={'font-semibold'}>Y</span> 16 <span
                                        className={'font-semibold'}>K</span> 0
                                    </li>
                                    <li>
                                        <span className={'font-semibold'}>R</span> 217 <span
                                        className={'font-semibold'}>G</span> 224 <span
                                        className={'font-semibold'}>B</span> 212
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-y-3 items-end w-full pt-10'}>
                            <div
                                className={'w-[90%] rounded-br-lg rounded-tl-lg bg-hkdarkblue text-white pl-10 py-2 font-semibold h-[3rem]'}>
                            </div>
                            <div className={'w-[85%] flex justify-start'}>
                                <ul className={'list-disc'}>
                                    <li>
                                        <span className={'font-semibold'}>C</span> 100 <span
                                        className={'font-semibold'}>M</span> 85 <span
                                        className={'font-semibold'}>Y</span> 35 <span
                                        className={'font-semibold'}>K</span> 30
                                    </li>
                                    <li>
                                        <span className={'font-semibold'}>R</span> 21 <span
                                        className={'font-semibold'}>G</span> 50 <span
                                        className={'font-semibold'}>B</span> 92
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
};