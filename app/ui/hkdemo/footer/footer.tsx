import Image from "next/image";
import {locationData} from "@/app/lib/hk/data";

export default function Footer() {
    return (
        <div id={'root-footer'} className={'w-full flex flex-col md:flex-row h-[25vh] md:h-[15vh] bg-neutral-800 items-center md:px-[5%] md:text-sm'}>
            <div className={'grow order-2 md:order-1 md:basis-0 flex text-xs md:text-sm flex-col text-neutral-300 md:items-start md:justify-start'}>
                <div>Addr) {`${locationData[0].streetAddress} ${locationData[0].buildingInfo}`}</div>
                <div>Tel) 000-0000-0000</div>
                <div>Email) 0000@gmail.com</div>
            </div>
            <div className={'grow order-1 md:order-2 md:basis-0 flex md:flex-col items-center'}>
                <div className={'md:w-[15vw] w-[50vw] flex items-center'}>
                        <Image className={'w-full'} src={"/hkdemo/hkenc_logo.png"} alt={"company logo"} width={1000}
                               height={300}
                               priority={true}/>
                </div>
            </div>
            <div className={'grow order-3 md:basis-0 flex flex-col items-end'}>
                <div></div>
                <div className={'text-xs md:text-md text-neutral-300'}>copyright ⓒ HK E&C. All right Reserved.</div>
            </div>
        </div>
    )
};