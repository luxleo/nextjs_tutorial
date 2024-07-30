'use client';
import { BsBuildings } from "react-icons/bs";
import { TfiTime } from "react-icons/tfi";
import { MdOutlineChair } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import Image from "next/image";
import {IconType} from "react-icons";
import {motion} from "framer-motion";

export type CardInfo = {
    icon: IconType;
    title: string;
    content: string;
}

const cardData : CardInfo[] = [
    {icon: BsBuildings, title: "법인명", content:"주) 에이치케이이앤씨"},
    {icon: TfiTime, title: "설립일", content:"2012년"},
    {icon: MdOutlineChair, title: "CEO", content:"박 현 재"},
    {icon: SlLocationPin, title: "위치", content:"부산광역시\n금정구 범어천로 31\n대영빌딩"},
]

export default function InfoContainer() {
    return (
        <div className={`w-full grid grid-cols-1 gap-y-10 px-[30%] md:px-[5%] md:grid-cols-2 lg:px-[10%] lg:grid-cols-4 relative`}>
            <Image src={'/hkdemo/subpage_images/content-demo/greeting_wallpaper.jpg'} alt={'wallPaper'}
                   objectFit={'cover'}
                   fill={true}
                   quality={50}
                   sizes={'60vw'}
                   priority={true}
                   className={'-z-10'}
            />
            {cardData.map((el,idx)=>(
                <InfoCard key={`${idx}-cardInfo`} icon={el.icon} title={el.title} content={el.content}/>
            ))}
        </div>
    )
};

function InfoCard({icon, title, content}:CardInfo) {
    const PassedIcon = icon;
    return (
        <motion.div
            initial={{opacity: 0.5, y: -50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{
                ease: 'easeOut',
                duration: 1,
            }}
            className={'flex flex-row gap-x-5 items-center justify-start md:justify-start md:flex-col text-white md:items-center py-5 md:py-10 gap-y-2 md:gap-y-4'}>
            <div className={'text-5xl'}>
                <PassedIcon/>
            </div>
            <div className={'flex flex-col items-start md:items-center'}>
                <div className={'text-lg'}>
                    {title}
                </div>
                <div className={'md:text-center md:whitespace-pre'}>
                    {content}
                </div>
            </div>
        </motion.div>
    )
}