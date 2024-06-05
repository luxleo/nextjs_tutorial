import {useWindLoadFormStore} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form-store";
import {InputLargeTitle} from "@/app/hkdemo/applications/ui/formContainer";
import {useCallback, useEffect, useState} from "react";
import {windData, windDataList} from "@/app/hkdemo/applications/data/basic-wind-velocity";
import {useImmer} from "use-immer";
import {RxCross2} from "react-icons/rx";
import {clsx} from "clsx";

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

    return (
        <div className={'w-[1000px] py-10 px-10 bg-white flex flex-col relative h-[80vh] overflow-y-scroll'}
             onClick={e => e.stopPropagation()}>
            <div className={'text-2xl font-semibold mb-5'}>
                풍하중 설정
            </div>
            <div className={'w-full flex flex-col gap-y-4'}>
                <div>
                    <InputLargeTitle title={'기본풍속'}/>
                    <div className={'flex items-center gap-x-3'}>
                        <div>
                            <input className={'text-center'} name={'default-velocity'}
                                   value={windLoadValue.defaultVelocity}/> <span>m/s</span>
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
                                               type={'radio'} name={'surfaceRoughness'} value={el.value}
                                               checked={el.value === windLoadValue.surfaceRoughness}
                                               onClick={() => updateSurfaceRoughness(el.value)}
                                        />
                                        <label className={'pb-[0.15rem]'}
                                               htmlFor={`${el.value}-surfaceRoughnessData`}>{el.value}</label>
                                    </div>
                                    <div className={'whitespace-pre text-sm'}>
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
                                       onClick={() => updateTerrainType(el.value)}
                                />
                                <label className={'pb-[0.15rem]'}
                                       htmlFor={`${el.value}-terrainData`}>{el.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}