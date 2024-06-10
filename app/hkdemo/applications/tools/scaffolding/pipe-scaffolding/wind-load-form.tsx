import {useWindLoadFormStore} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form-store";
import {InputLargeTitle} from "@/app/hkdemo/applications/ui/formContainer";
import {useCallback, useEffect, useState} from "react";
import {windData, windDataList} from "@/app/hkdemo/applications/data/basic-wind-velocity";
import {useImmer} from "use-immer";
import {RxCross2} from "react-icons/rx";
import {clsx} from "clsx";

import './wind-load-form.css';

export default function WindLoadFormContainer() {
    const toggleModalOn = useWindLoadFormStore(state => state.toggleModalOn);
    return (
        <div className={'w-full h-[100vh] fixed top-0 left-0 flex flex-col justify-center items-center bg-black bg-opacity-40'}
        onClick={toggleModalOn}>
            <WindLoadForm/>
        </div>
    )
};

export type windLoadValue = {
    defaultVelocity: number;
    surfaceRoughness: 'A' | 'B' | 'C' | 'D';
    terrainType: 'flat land' | 'hill' | 'slope';
    importanceCoefficient: '특' | '1' | '2' | '3';
    panelType: 'on' | 'above';
    panelInfo: {
        width: number;
        length: number;
        height?: number;
    }
}

function WindLoadForm() {
    const [isWithLocation, setIsWithLocation] = useState<boolean>(false);
    const [locationList, setLocationList] = useState<windData[]>(windDataList);
    const [locationSearchWord, setLocationSearchWord] = useState<string>('');
    const [windLoadValue, setWindLoadValue] = useImmer<windLoadValue>({
        defaultVelocity: 0,
        surfaceRoughness: 'A',
        terrainType: 'flat land',
        importanceCoefficient: '3',
        panelType: 'above',
        panelInfo: {
            width: 0,
            length: 0,
        }
    });

    const updateVelocity = useCallback((velocity: number) => {
        setWindLoadValue((draft) => {
            draft.defaultVelocity = velocity;
        })
    }, []);

    const updateSurfaceRoughness = useCallback((value: windLoadValue['surfaceRoughness']) => {
        setWindLoadValue((draft) => {
            draft.surfaceRoughness = value;
        })
    }, []);

    const updateTerrainType = useCallback((value: windLoadValue['terrainType']) => {
        setWindLoadValue((draft) => {
            draft.terrainType = value;
        })
    }, []);

    const updatePanelType = useCallback((value: windLoadValue['panelType']) => {
        setWindLoadValue((draft) => {
            draft.panelType = value;
        })
    }, []);

    useEffect(() => {
        setLocationList(windDataList.filter(el => el.cityName.includes(locationSearchWord)));
    }, [locationSearchWord]);

    const surfaceRoughnessData: { value: windLoadValue['surfaceRoughness']; description: string; }[] = [
        {value: 'A', description: '대도시 중심부에서 고층건축물(10층이상)이 밀집해 있는 지역'},
        {value: 'B', description: '수목, 높이 3.5m 정도의 주택과 같은 건축물이 밀집해 있는 지역\n중층건물(4~9층)이 산재해 있는 지역'},
        {value: 'C', description: '높이 1.5~10m 정도의 장애물이 산재해 있는 지역\n수목, 저층건축물이 산재해 있는 지역'},
        {value: 'D', description: '장애물이 거의 없고, 주변 장애물의 평균높이가 1.5m 이하인 지역\n해안, 초원, 비행장'},
    ];

    const terrainTypeData: { value: windLoadValue['terrainType']; name: string; }[]=[
        {value: 'flat land', name: '평지'},
        {value: 'hill', name: '언덕, 산'},
        {value: 'slope', name: '경사지'},
    ];

    const panelTypeData: { value: windLoadValue['panelType']; name: string; }[] = [
        {value: 'on', name: '지면과 공간을 두고 설치'},
        {value: 'above', name: '지면에 붙여 설치'},
    ];

    return (
        <div className={'w-[1000px] py-10 px-10 bg-white flex flex-col relative h-[80vh] overflow-y-scroll'}
             onClick={e => e.stopPropagation()}>
            <div className={'text-2xl font-semibold mb-5'}>
                풍하중 설정
            </div>
            <div className={'w-full flex flex-col gap-y-12'}>
                <div>
                    <InputLargeTitle title={'기본풍속'}/>
                    <div className={'flex items-center gap-x-3'}>
                        <div>
                            <input className={'text-center'} name={'default-velocity'}
                                   value={windLoadValue.defaultVelocity}
                                   onChange={(e)=> updateVelocity(parseFloat(e.target.value))}
                            /> <span>m/s</span>
                        </div>
                        <div>
                            {!isWithLocation ? <button
                                    className={'text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow'}
                                    onClick={() => setIsWithLocation(prev => !prev)}
                                >지역으로
                                    검색하기</button>
                                :
                                <div className={'relative'}>
                                    <input type={'search'}
                                           className={'h-[20px]'}
                                           onChange={(event) => setLocationSearchWord(event.target.value)}
                                           placeholder={'지명을 입력하세요'}
                                    />
                                    <div
                                        className={'absolute top-[20px] flex flex-col max-h-[100px] overflow-y-scroll bg-white border-2 border-t-0 border-black'}>
                                        <div
                                            className={'w-full flex justify-end hover:cursor-pointer hover:text-orange-500'}
                                            onClick={() => setIsWithLocation(prev => !prev)}
                                        ><RxCross2 size={'1.5rem'}/></div>
                                        {locationList?.map((el, idx) => (
                                            <div key={`${idx}-${el.cityName}`}
                                                 className={'select-none hover:bg-neutral-200 hover:cursor-pointer py-1 px-2'}
                                                 onClick={() => {
                                                     updateVelocity(el.velocity);
                                                     setLocationList(windDataList);
                                                     setIsWithLocation(prev => !prev);
                                                 }}
                                            >
                                                {`${el.cityName} | ${el.velocity}m/s`}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <InputLargeTitle title={'지표조도구분'}/>
                    <div className={'grid grid-cols-2 gap-x-2 gap-y-2'}>
                        {surfaceRoughnessData.map((el, idx) => (
                            <div key={`${el.value}-surfaceRoughness`}
                                 className={clsx('flex px-4 py-2 border rounded-md hover:cursor-pointer', {
                                     'border-black': el.value !== windLoadValue.surfaceRoughness,
                                     'border-blue-500 bg-blue-50': el.value === windLoadValue.surfaceRoughness,

                                 })}
                                 onClick={() => updateSurfaceRoughness(el.value)}
                            >
                                <div className={'flex flex-col'}>
                                    <div className={'flex items-center gap-x-1'}>
                                        <input id={`${el.value}-surfaceRoughnessData`}
                                               className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                               type={'radio'}
                                               name={'surfaceRoughness'}
                                               value={el.value}
                                               checked={el.value === windLoadValue.surfaceRoughness}
                                               onChange={() => updateSurfaceRoughness(el.value)}
                                        />
                                        <label className={'pb-[0.15rem]'}
                                               htmlFor={`${el.value}-surfaceRoughnessData`}>{el.value}</label>
                                    </div>
                                    <div className={'whitespace-pre text-sm select-none'}>
                                        {el.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <InputLargeTitle title={'지형구분'}/>
                    <div className={'flex gap-x-3'}>
                        {terrainTypeData.map((el, idx) => (
                            <div key={`${el.value}-terrainData`} className={'flex items-center gap-x-1'}
                                 onClick={() => updateTerrainType(el.value)}>
                                <input type={'radio'}
                                       className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                       value={el.value}
                                       name={'terrainType'}
                                       id={`${el.value}-terrainData`}
                                       checked={el.value === windLoadValue.terrainType}
                                       onChange={() => updateTerrainType(el.value)}
                                />
                                <label className={'pb-[0.15rem]'}
                                       htmlFor={`${el.value}-terrainData`}>{el.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                {/*TODO:    중요도 0.6으로 고정해두었는데 추후에 수정해야한다.*/}
                <div>
                    {/*TODO: 비계 일때만 해당되는 항목으로 해당되지 않을때를 위하여 전역상태로 조건부 렌더링 해야한다.*/}
                    <InputLargeTitle title={'비계 지지방법'}/>
                    <table className={'w-full'} id={'scaffolding_type_table'}>
                        <thead>
                        <tr>
                            <th>비계의 종류</th>
                            <th>풍력방향</th>
                            <th>적용부분</th>
                            <th>선택</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={'text-center'}>독립적으로 지지되는 비계</td>
                            <td className={'text-center'}>정압,부압</td>
                            <td className={'text-center'}>전 부분</td>
                            <td className={'text-center'}><input type={"checkbox"}/></td>
                        </tr>
                        <tr>
                            <td className={'text-center'} rowSpan={5}>구조물에 지지되는 비계</td>
                            <td className={'text-center'} rowSpan={2}>정압</td>
                            <td className={'text-center'}>상부 2개층</td>
                            <td className={'text-center'}><input type={"checkbox"}/></td>
                        </tr>
                        <tr>
                            <td className={'text-center'}>기타 부분</td>
                            <td className={'text-center'}><input type={"checkbox"}/></td>
                        </tr>
                        <tr>
                            <td className={'text-center'} rowSpan={3}>부압</td>
                            <td className={'text-center'}>개구부 인접부 및 돌출부</td>
                            <td className={'text-center'}><input type={"checkbox"}/></td>
                        </tr>
                        <tr>
                            <td className={'text-center'}>우각부에서 2스팬 이내</td>
                            <td className={'text-center'}><input type={"checkbox"}/></td>
                        </tr>
                        <tr>
                            <td className={'text-center'}>기타부분</td>
                            <td className={'text-center'}><input type={"checkbox"}/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <InputLargeTitle title={'보호망 또는 패널'}/>
                    <div className={'grid grid-cols-2 w-full gap-x-2'}>
                        <div className={'flex flex-col gap-y-4'}>
                            <div className={'flex gap-x-5'}>
                                {panelTypeData.map((el, idx) => (
                                    <div key={`${el.value}-panel`} className={'flex gap-x-1 items-center text-sm'}
                                         onClick={() => updatePanelType(el.value)}
                                    >
                                        <input type={'radio'} name={'panelTypes'} value={el.value}
                                               id={`${el.value}-panel`}
                                               className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                               onChange={() => updatePanelType(el.value)}
                                               checked={windLoadValue['panelType'] === el.value}
                                        />
                                        <label htmlFor={`${el.name}-panel`}>{el.name}</label>
                                    </div>
                                ))}
                            </div>
                            <div className={'flex flex-col h-36 gap-y-2'}>
                                <div className={'flex justify-between'}>
                                    <label htmlFor={'panel-width'} className={''}>망 또는 패널의 길이 <span
                                        className={'text-lg'}>(l)</span></label>
                                    <div>
                                        <input className={'w-20 h-8'} type={'number'} name={''} id={'panel-width'}/>
                                        <label htmlFor={'panel-width'} className={'ml-2'}>m</label>
                                    </div>
                                </div>
                                <div className={'flex justify-between'}>
                                    <label htmlFor={'panel-length'} className={''}>망 또는 패널의 높이 <span
                                        className={'text-lg'}>(h)</span></label>
                                    <div>
                                        <input className={'w-20 h-8'} type={'number'} name={''} id={'panel-length'}/>
                                        <label htmlFor={'panel-length'} className={'ml-2'}>m</label>
                                    </div>
                                </div>
                                {windLoadValue['panelType'] === 'above' &&
                                    <div className={'flex justify-between'}>
                                        <label htmlFor={'panel-height'} className={''}>망 또는 패널의 지면으로 부터 높이 <span
                                            className={'text-lg'}>(T)</span></label>
                                        <div>
                                            <input className={'w-20 h-8'} type={'number'} name={''}
                                                   id={'panel-height'}/>
                                            <label htmlFor={'panel-height'} className={'ml-2'}>m</label>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={''}>

                        </div>
                    </div>
                </div>
                <div>
                    <InputLargeTitle title={'충실률(Ø)'}/>
                    <div>
                        <input type={'number'} className={'w-16 h-8'} defaultValue={0.3} onChange={()=>{}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}