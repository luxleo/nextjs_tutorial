'use client';
import PageContainer from "@/app/hkdemo/applications/ui/pageContainer";
import BreadCrumbs from "@/app/hkdemo/applications/ui/breadCrumbs";
import FormContainer, {InputLargeTitle} from "@/app/hkdemo/applications/ui/formContainer";
import {useWindLoadFormStore} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form-store";
import WindLoadFormContainer from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form";

export default function Page() {
    const toggleWindLoadFormModal = useWindLoadFormStore(state => state.toggleModalOn);
    const isWindLoadFormModalOn = useWindLoadFormStore(state => state.isModalOn);
    return (
        <PageContainer>
            <div className={'w-full mb-10'}>
                <BreadCrumbs breadLink={{menuName:'비계',subMenuName:"강관비계"}}/>
            </div>
            <div className={'w-[40%]'}>
                <FormContainer title={'적용하중'}>
                    <div className={'w-full flex flex-col gap-y-3'}>
                        <div>
                            <InputLargeTitle title={'고정하중'}/>
                            <div className={'w-full flex-col flex py-2 gap-y-2'}>
                                <div>
                                    <label htmlFor={'self-weight'}>강재 자중</label>
                                    <div>
                                        <input id={'self-weight'} name={'self-weight'} placeholder={'자중 사용'}
                                               className={'w-[300px]'}/> <span>kN/m<sup>2</sup></span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={'steel-plank-weight'}>발판 자중</label>
                                    <div>
                                        <input id={'steel-plank-weight'} name={'steel-plank-weight'}
                                               placeholder={'자중 사용'}
                                               className={'w-[300px]'}/> <span>kN/m<sup>2</sup></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <InputLargeTitle title={'작업하중'}/>
                            <div className={'w-full flex-col flex py-2 gap-y-2'}>
                                <div>
                                    <input id={'working-load'} name={'working-load'} placeholder={'자중 사용'}
                                           className={'w-[300px]'}/> <span>kN/m<sup>2</sup></span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <InputLargeTitle title={'풍하중'}/>
                            <div className={'w-full flex py-2 gap-x-2'}>
                                <div>
                                    <input id={'wind-load'} name={'wind-load'} placeholder={'자중 사용'}
                                           className={'w-[300px]'}/> <span>kN/m<sup>2</sup></span>
                                </div>
                                <button className={'text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow'}
                                        onClick={toggleWindLoadFormModal}
                                >상세 설정</button>
                            </div>
                        </div>
                    </div>
                </FormContainer>
            </div>
            {isWindLoadFormModalOn && <WindLoadFormContainer/>}
        </PageContainer>
    )
};