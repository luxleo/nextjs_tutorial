import {useWindLoadFormStore} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form-store";
import {InputLargeTitle, InputMiddleTitle} from "@/app/hkdemo/applications/ui/formContainer";
import {useCallback, useEffect, useState} from "react";
import {windData, windDataList} from "@/app/hkdemo/applications/data/basic-wind-velocity";
import {useImmer} from "use-immer";
import {RxCross2} from "react-icons/rx";
import {clsx} from "clsx";

import './wind-load-form.css';
import {calcWindLoad} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form-action";
import {
    isWindLoadFormInValid, windLoadFormErrorState,
} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form-validation";

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
    importanceCoefficient: number;
    panelType: 'on' | 'above';
    panelInfo: {
        width: number;
        length: number;
        height?: number;
    };
    panelLocation: 'back' | 'front, one-line';
    scaffoldingSupportType: 1 | 2 | 3 | 4 | 5 | 6;
    solidityRatio: number;
}

export type windLoadResult = {
    value?: number;
    isCalculated: boolean;
}

function WindLoadForm() {
    const updateWindLoadValue = useWindLoadFormStore(state => state.updateWindLoadValue);
    const toggleWindLoadFormModal = useWindLoadFormStore(state => state.toggleModalOn);

    const [isWithLocation, setIsWithLocation] = useState<boolean>(false);
    const [locationList, setLocationList] = useState<windData[]>(windDataList);
    const [locationSearchWord, setLocationSearchWord] = useState<string>('');
    const [windLoadValue, setWindLoadValue] = useImmer<windLoadValue>({
        defaultVelocity: 0,
        surfaceRoughness: 'A',
        terrainType: 'flat land',
        importanceCoefficient: 0.6,
        panelType: 'above',
        panelInfo: {
            width: 0,
            length: 0,
        },
        scaffoldingSupportType: 1,
        solidityRatio: 0.3,
        panelLocation: 'front, one-line'
    });
    const [windLoadResult, setWindLoadResult] = useState<windLoadResult>({
        isCalculated: false
    });
    const errorInitialState : windLoadFormErrorState = {errors: {}, message: null};
    const [errorState, setErrorState] = useState<windLoadFormErrorState>(errorInitialState);

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

    const updatePanelLocation = useCallback((value: windLoadValue['panelLocation']) => {
        setWindLoadValue((draft) => {
            draft.panelLocation = value;
        })
    }, []);

    const updatePanelType = useCallback((value: windLoadValue['panelType']) => {
        setWindLoadValue((draft) => {
            draft.panelType = value;
        })
    }, []);

    const updatePanelWidth = useCallback((value: number) => {
        setWindLoadValue((draft) => {
            draft.panelInfo.width = value;
        })
    }, []);

    const updatePanelLength = useCallback((value: number) => {
        setWindLoadValue((draft) => {
            draft.panelInfo.length = value;
        })
    }, []);

    const updatePanelHeight = useCallback((value: number) => {
        setWindLoadValue((draft) => {
            draft.panelInfo.height = value;
        })
    }, []);

    const updateScaffoldingSupportType = useCallback((value: windLoadValue['scaffoldingSupportType']) => {
        setWindLoadValue((draft) => {
            draft.scaffoldingSupportType = value;
        })
    }, []);

    const updateSolidityRatio = useCallback((value: number) => {
        setWindLoadValue((draft) => {
            draft.solidityRatio = value;
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
        {value: 'on', name: '지면에 붙여 설치'},
        {value: 'above', name: '지면과 공간을 두고 설치'},
    ];

    const panelLocationData: { value: windLoadValue['panelLocation']; name: string;}[] = [
        {value: 'back', name: '쌍줄비계 후면'},
        {value: 'front, one-line', name: '쌍줄비계 전면, 외줄비계'},
    ]

    return (
        <div className={'w-[1000px] py-10 px-10 flex flex-col relative h-[80vh] overflow-y-scroll bg-neutral-200'}
             onClick={e => {
                 e.stopPropagation();
                 if (isWithLocation) setIsWithLocation(prev => !prev);
             }
             }
        >
            <div className={'text-2xl font-semibold mb-5 pb-2 border-b-2 border-black'}>
                풍하중 설정
            </div>
            <div className={'w-full flex flex-col gap-y-12'}>
                <div className={'bg-white'}>
                    <InputLargeTitle title={'기본풍속'}/>
                    <div className={'flex items-center gap-x-3 px-4 py-5 shadow-sm'}>
                        <div className={'flex flex-col'}>
                            <div>
                                <input className={'text-center'} name={'default-velocity'}
                                       type={'number'}
                                       value={windLoadValue.defaultVelocity}
                                       onChange={(e) => {
                                           updateVelocity(parseFloat(e.target.value));
                                       }}
                                       aria-describedby={'defaultVelocity-error'}
                                /> <span>m/s</span>
                            </div>
                            <div id={'defaultVelocity-error'} aria-live={'polite'} aria-atomic={true}>
                                {errorState.errors?.defaultVelocity &&
                                    errorState.errors.defaultVelocity.map((error: string) => (
                                        <p className={'mt-2 text-sm text-red-500'} key={error}>
                                            {error}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            {!isWithLocation ? <button
                                    className={'text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow'}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsWithLocation(prev => !prev);
                                    }
                                    }
                                >지역으로
                                    검색하기</button>
                                :
                                <div className={'relative'}>
                                    <input type={'search'}
                                           className={'h-[20px]'}
                                           onClick={(e) => e.stopPropagation()}
                                           onChange={(event) => setLocationSearchWord(event.target.value)}
                                           placeholder={'지명을 입력하세요'}
                                    />
                                    <div
                                        className={'absolute top-[24px] flex flex-col max-h-[100px] overflow-y-scroll bg-white border-2 border-t-0 border-black'}>
                                        <div
                                            className={'w-full flex justify-end hover:cursor-pointer hover:text-orange-500'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsWithLocation(prev => !prev);
                                            }
                                            }
                                        ><RxCross2 size={'1.5rem'}/></div>
                                        {locationList?.map((el, idx) => (
                                            <div key={`${idx}-${el.cityName}`}
                                                 className={'select-none hover:bg-neutral-200 hover:cursor-pointer py-1 px-2'}
                                                 onClick={(e) => {
                                                     e.stopPropagation();
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
                    <div className={'grid grid-cols-2 gap-x-2 gap-y-2 px-4 py-5 bg-white shadow-sm'}>
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
                    <div className={'flex gap-x-3 px-4 py-5 bg-white shadow-sm'}>
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
                    <div className={'px-4 py-5 bg-white shadow-sm'}>
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
                            <tr className={'group'} onClick={() => {
                                updateScaffoldingSupportType(1);
                            }}>
                                <td className={'text-center'} rowSpan={5}>구조물에 지지되는 비계</td>
                                <td className={'text-center'} rowSpan={2}>정압</td>
                                <td className={'text-center select-none'}>상부 2개층</td>
                                <td className={'text-center group-hover:bg-neutral-100'}>
                                    <input type={"radio"} name={'supportType'} value={1}
                                           className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                           onChange={(e) => {
                                               e.stopPropagation();
                                               updateScaffoldingSupportType(1)
                                           }}
                                           checked={windLoadValue['scaffoldingSupportType'] === 1}
                                    />
                                </td>
                            </tr>
                            <tr className={'group'} onClick={() => {
                                updateScaffoldingSupportType(2);
                            }}>
                                <td className={'text-center select-none'}>기타 부분</td>
                                <td className={'text-center group-hover:bg-neutral-100'}>
                                    <input type={"radio"} name={'supportType'} value={2}
                                           className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                           onChange={(e) => {
                                               e.stopPropagation();
                                               updateScaffoldingSupportType(2)
                                           }}
                                           checked={windLoadValue['scaffoldingSupportType'] === 2}
                                    />
                                </td>
                            </tr>
                            <tr className={'group'} onClick={() => {
                                updateScaffoldingSupportType(3);
                            }}>
                                <td className={'text-center'} rowSpan={3}>부압</td>
                                <td className={'text-center select-none'}>개구부 인접부 및 돌출부</td>
                                <td className={'text-center group-hover:bg-neutral-100'}>
                                    <input type={"radio"} name={'supportType'} value={3}
                                           className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                           onChange={(e) => {
                                               e.stopPropagation();
                                               updateScaffoldingSupportType(3)
                                           }}
                                           checked={windLoadValue['scaffoldingSupportType'] === 3}
                                    />
                                </td>
                            </tr>
                            <tr className={'group'} onClick={() => {
                                updateScaffoldingSupportType(4);
                            }}>
                                <td className={'text-center select-none'}>우각부에서 2스팬 이내</td>
                                <td className={'text-center group-hover:bg-neutral-100'}>
                                    <input type={"radio"} name={'supportType'} value={4}
                                           className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                           onChange={(e) => {
                                               e.stopPropagation();
                                               updateScaffoldingSupportType(4)
                                           }}
                                           checked={windLoadValue['scaffoldingSupportType'] === 4}
                                    />
                                </td>
                            </tr>
                            <tr className={'group'} onClick={() => {
                                updateScaffoldingSupportType(5);
                            }}>
                                <td className={'text-center select-none'}>기타부분</td>
                                <td className={'text-center group-hover:bg-neutral-100'}>
                                    <input type={"radio"} name={'supportType'} value={5}
                                           className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                           onChange={(e) => {
                                               e.stopPropagation();
                                               updateScaffoldingSupportType(5)
                                           }}
                                           checked={windLoadValue['scaffoldingSupportType'] === 5}
                                    />
                                </td>
                            </tr>
                            <tr className={'group'} onClick={() => {
                                updateScaffoldingSupportType(6);
                            }}>
                                <td className={'text-center'}>독립적으로 지지되는 비계</td>
                                <td className={'text-center'}>정압,부압</td>
                                <td className={'text-center select-none'}>전 부분</td>
                                <td className={'text-center group-hover:bg-neutral-100'}>
                                    <input type={"radio"} name={'supportType'} value={6}
                                           className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                           onChange={(e) => {
                                               e.stopPropagation();
                                               updateScaffoldingSupportType(6)
                                           }}
                                           checked={windLoadValue['scaffoldingSupportType'] === 6}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <InputLargeTitle title={'보호망 또는 패널'}/>
                    <div className={'grid grid-cols-2 w-full gap-x-2 px-4 py-5 bg-white shadow-sm'}>
                        <div className={'flex flex-col gap-y-4'}>
                            <InputMiddleTitle title={'설치치수'}/>
                            <div className={'flex gap-x-5'}>
                                {panelTypeData.map((el
                                    , idx) => (
                                    <div key={`${el.value}-panel`} className={'flex gap-x-1 items-center'}
                                         onClick={() => updatePanelType(el.value)}
                                    >
                                        <input type={'radio'} name={'panelTypes'}
                                               value={el.value}
                                               id={`${el.value}-panel`}
                                               className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                               onChange={(e) => {
                                                   e.stopPropagation();
                                                   updatePanelType(el.value)
                                               }
                                               }
                                               checked={windLoadValue['panelType'] === el.value}
                                        />
                                        <label htmlFor={`${el.name}-panel`}>{el.name}</label>
                                    </div>
                                ))}
                            </div>
                            <div className={'flex flex-col gap-y-2'}>
                                <div className={'flex flex-col'}>
                                    <div className={'flex justify-between'}>
                                        <label htmlFor={'panel-width'} className={''}>망 또는 패널의 길이 <span
                                            className={'text-lg'}>(l)</span></label>
                                        <div>
                                            <input className={'w-20 h-8'} type={'number'} name={''}
                                                   id={'panel-width'}
                                                   onChange={(e) => updatePanelWidth(parseFloat(e.target.value))}
                                                   aria-describedby={'panel-width-error'}
                                            />
                                            <label htmlFor={'panel-width'} className={'ml-2'}>m</label>
                                        </div>
                                    </div>
                                    <div id={'panel-width-error'} aria-live={'polite'} aria-atomic={true}>
                                        {errorState.errors?.width &&
                                            errorState.errors.width.map(error=>(
                                                <p className={'mt-2 text-sm text-red-500'} key={error}>
                                                    {error}
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={'flex flex-col'}>
                                    <div className={'flex justify-between'}>
                                        <label htmlFor={'panel-length'} className={''}>망 또는 패널의 높이 <span
                                            className={'text-lg'}>(h)</span></label>
                                        <div>
                                            <input className={'w-20 h-8'} type={'number'} name={''} id={'panel-length'}
                                                   onChange={(e) => updatePanelLength(parseFloat(e.target.value))}
                                                   aria-describedby={'panel-length-error'}
                                            />
                                            <label htmlFor={'panel-length'} className={'ml-2'}>m</label>
                                        </div>
                                    </div>
                                    <div id={'panel-length-error'} aria-live={'polite'} aria-atomic={true}>
                                        {errorState.errors?.length &&
                                            errorState.errors.length.map(error=>(
                                                <p className={'mt-2 text-sm text-red-500'} key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                {windLoadValue['panelType'] === 'above' &&
                                    <div className={'flex flex-col'}>
                                        <div className={'flex justify-between'}>
                                            <label htmlFor={'panel-height'} className={''}>망 또는 패널의 지면으로 부터 높이 <span
                                                className={'text-lg'}>(T)</span></label>
                                            <div>
                                                <input className={'w-20 h-8'} type={'number'} name={''}
                                                       id={'panel-height'}
                                                       onChange={(e) => updatePanelHeight(parseFloat(e.target.value))}
                                                />
                                                <label htmlFor={'panel-height'} className={'ml-2'}>m</label>
                                            </div>
                                        </div>
                                        <div id={'panel-height-error'} aria-live={'polite'} aria-atomic={true}>
                                            {errorState.errors?.height &&
                                                errorState.errors.height.map(error => (
                                                    <p className={'mt-2 text-sm text-red-500'} key={error}>
                                                        {error}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                }
                            </div>
                            <InputMiddleTitle title={'설치위치'}/>
                            <div className={'flex gap-x-5'}>
                                {panelLocationData.map((el
                                    , idx) => (
                                    <div key={`${el.value}-panel`} className={'flex gap-x-1 items-center'}
                                         onClick={() => updatePanelLocation(el.value)}
                                    >
                                    <input type={'radio'} name={'panelLocation'} value={el.value}
                                               id={`${el.value}-panel`}
                                               className={'h-[0.8rem] w-[0.8rem] appearance-none checked:ring-0 focus:ring-0'}
                                               onChange={() => updatePanelLocation(el.value)}
                                               checked={windLoadValue['panelLocation'] === el.value}
                                        />
                                        <label htmlFor={`${el.name}-panel`}>{el.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={''}>
                            {/*TODO: 수치 가이드 그림 채워넣기*/}
                        </div>
                    </div>
                </div>
                <div>
                    <InputLargeTitle title={'충실률(Ø)'}/>
                    <div className={'px-4 py-5 bg-white shadow-sm'}>
                        <input type={'number'} className={'w-16 h-8'} defaultValue={0.3}
                               onChange={(e) => updateSolidityRatio(parseFloat(e.target.value))}/>
                    </div>
                </div>
                <div className={'flex justify-center items-center'}>
                    <button className={'px-2 py-2 bg-hkdarkblue rounded-md text-white hover:bg-hk-blue-600'}
                            onClick={async () => {
                                const invalid = await isWindLoadFormInValid(windLoadValue);
                                if (invalid) {
                                    setErrorState(invalid);
                                    return;
                                }
                                await calcWindLoad(windLoadValue)
                                    .then(res =>
                                        setWindLoadResult(prev => ({...prev, value: res, isCalculated: true})));
                            }}>계산하기
                    </button>
                </div>
                <div>
                    <InputLargeTitle title={'계산결과'}/>
                    <div className={'px-4 py-5 bg-white shadow-sm flex justify-center items-center'}>
                        {windLoadResult.isCalculated ?
                            <div className={'flex gap-x-4 items-center'}>
                                <div>
                                    <span
                                        className={'text-lg font-bold mr-2 text-neutral-500'}>설계풍하중 : </span>{windLoadResult.value}
                                    <span className={'ml-2'}>kN/m<sup>2</sup></span>
                                </div>
                                <button className={'px-2 py-2 bg-hkdarkblue rounded-md text-white hover:bg-hk-blue-600'}
                                        onClick={() => {
                                            updateWindLoadValue(windLoadResult.value as number)
                                            toggleWindLoadFormModal();
                                        }}
                                >
                                    적용하기
                                </button>
                            </div>
                            :
                            <div>
                                계산이 완료되지 않았습니다.
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
        ;
}