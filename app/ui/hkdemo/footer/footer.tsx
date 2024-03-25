import Image from "next/image";
import {locationData} from "@/app/lib/hk/data";

export default function Footer() {
    return (
        <div className={'w-full flex h-[60vh] sm:h-[25vh] bg-neutral-800 items-center sm:px-[5%] sm:text-sm'}>
            <div className={'sm:grow sm:basis-0 flex sm:flex-col text-neutral-300 sm:items-start'}>
                Addr) {`${locationData[0].streetAddress} ${locationData[0].buildingInfo}`}
            </div>
            <div className={'sm:grow sm:basis-0 flex sm:flex-col items-center'}>
                <div className={'md:w-[15vw] w-[18vw] flex items-center'}>
                        <Image className={'w-full'} src={"/hkdemo/hkenc_logo.png"} alt={"company logo"} width={1000}
                               height={300}
                               priority={true}/>
                </div>
            </div>
            <div className={'sm:grow sm:basis-0 flex sm:flex-col text-neutral-300 sm:items-end'}>
                copyright ⓒ HK E&C. All right Reserved.
            </div>
        </div>
    )
};