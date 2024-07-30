import Image from "next/image";
import {locationData} from "@/app/lib/hk/data";

export default function Footer() {
    return (
        <div id={'root-footer'} className={'w-full flex flex-col md:flex-row h-[25vh] md:h-[15vh] bg-neutral-800 items-center md:px-[5%] md:text-sm'}>
            <div
                className={'grow order-2 md:order-1 md:basis-0 flex text-xs md:text-sm flex-col text-neutral-300 md:items-start md:justify-start'}>
                <div className={'flex gap-x-4'}>
                    <div className={'w-5'}>Adr</div>
                    <div>{`${locationData[0].streetAddress} ${locationData[0].buildingInfo}`}</div>
                </div>
                <div className={'flex gap-x-4'}>
                    <div className={'w-5'}>Tel</div>
                    <div>051-583-3317</div>
                </div>
                <div className={'flex gap-x-4'}>
                    <div className={'w-5'}>Fax</div>
                    <div>0504-846-3333</div>
                </div>
            </div>
            <div className={'grow order-1 md:order-2 md:basis-0 flex md:flex-col items-center'}>
                <div className={'md:w-[15vw] w-[50vw] flex items-center'}>
                        <Image className={'w-full'} src={"/hkdemo/hkenc_logo.png"} alt={"company logo"} width={300}
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