import Image from "next/image";
import {locationData} from "@/app/lib/hk/data";

export default function Footer() {
    return (
        <div id={'root-footer'} className={'w-full flex flex-col sm:flex-row h-[30vh] sm:h-[25vh] bg-neutral-800 items-center sm:px-[5%] sm:text-sm'}>
            <div className={'grow order-2 sm:order-1 sm:basis-0 flex text-xs sm:text-sm flex-col text-neutral-300 sm:items-start sm:justify-start'}>
                <div>Addr) {`${locationData[0].streetAddress} ${locationData[0].buildingInfo}`}</div>
                <div>Tel) 000-0000-0000</div>
                <div>Email) 0000@gmail.com</div>
            </div>
            <div className={'grow order-1 sm:order-2 sm:basis-0 flex sm:flex-col items-center'}>
                <div className={'md:w-[15vw] w-[50vw] flex items-center'}>
                        <Image className={'w-full'} src={"/hkdemo/hkenc_logo.png"} alt={"company logo"} width={1000}
                               height={300}
                               priority={true}/>
                </div>
            </div>
            <div className={'grow order-3 sm:basis-0 flex flex-col items-end'}>
                <div></div>
                <div className={'text-xs sm:text-md text-neutral-300'}>copyright ⓒ HK E&C. All right Reserved.</div>
            </div>
        </div>
    )
};