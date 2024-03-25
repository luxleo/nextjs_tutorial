import Image from "next/image";
import {locationData} from "@/app/lib/hk/data";

export default function Footer() {
    return (
        <div className={'w-full flex flex-col sm:flex-row h-[30vh] sm:h-[25vh] bg-neutral-800 items-center sm:px-[5%] sm:text-sm mt-10 sm:mt-20'}>
            <div className={'grow order-2 sm:order-1 sm:basis-0 flex text-xs sm:text-sm sm:flex-col text-neutral-300 sm:items-start'}>
                Addr) {`${locationData[0].streetAddress} ${locationData[0].buildingInfo}`}
            </div>
            <div className={'grow order-1 sm:order-2 sm:basis-0 flex sm:flex-col items-center'}>
                <div className={'md:w-[15vw] w-[50vw] flex items-center'}>
                        <Image className={'w-full'} src={"/hkdemo/hkenc_logo.png"} alt={"company logo"} width={1000}
                               height={300}
                               priority={true}/>
                </div>
            </div>
            <div className={'grow order-3 sm:basis-0 flex sm:flex-col text-xs sm:text-md text-neutral-300 sm:items-end'}>
                copyright ⓒ HK E&C. All right Reserved.
            </div>
        </div>
    )
};