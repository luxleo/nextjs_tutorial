import {useWindLoadFormStore} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form-store";
import {InputLargeTitle} from "@/app/hkdemo/applications/ui/formContainer";
import {useCallback, useEffect, useState} from "react";
import {windData, windDataList} from "@/app/hkdemo/applications/data/basic-wind-velocity";
import {useImmer} from "use-immer";
import {RxCross2} from "react-icons/rx";

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
}

function WindLoadForm() {
    const [isWithLocation, setIsWithLocation] = useState<boolean>(false);
    const [locationList, setLocationList] = useState<windData[]>(windDataList);
    const [locationSearchWord, setLocationSearchWord] = useState<string>('');
    const [windLoadValue, setWindLoadValue] = useImmer<windLoadValue>({
        defaultVelocity: 0,
    });

    const updateVelocity = useCallback((velocity: number) => {
        setWindLoadValue((draft) => {
            draft.defaultVelocity = velocity;
        })
    }, []);

    useEffect(() => {
        setLocationList(windDataList.filter(el => el.cityName.includes(locationSearchWord)));
    }, [locationSearchWord]);

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
                            <input className={'text-center'} name={'default-velocity'} value={windLoadValue.defaultVelocity}/> <span>m/s</span>
                        </div>
                        <div>
                            {!isWithLocation ? <button
                                    className={'text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow'}
                                    onClick={()=> setIsWithLocation(prev => !prev)}
                                >지역으로
                                    검색하기</button>
                                :
                                <div className={'relative'}>
                                    <input type={'search'}
                                           className={'h-[20px]'}
                                           onChange={(event) => setLocationSearchWord(event.target.value)}
                                           placeholder={'지명을 입력하세요'}
                                    />
                                    <div className={'absolute top-[20px] flex flex-col max-h-[100px] overflow-y-scroll'}>
                                        <div className={'w-full flex justify-end hover:cursor-pointer hover:text-orange-500'}
                                             onClick={()=> setIsWithLocation(prev => !prev)}
                                        ><RxCross2 size={'1.5rem'}/></div>
                                        {locationList?.map((el, idx) => (
                                            <div key={`${idx}-${el.cityName}`}
                                                 className={'select-none hover:bg-neutral-200 hover:cursor-pointer py-1 px-2'}
                                                onClick={()=>{
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
            </div>
        </div>
    );
}