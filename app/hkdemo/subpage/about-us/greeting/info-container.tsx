import { BsBuildings } from "react-icons/bs";
import Image from "next/image";
import {IconType} from "react-icons";

export default function InfoContainer() {
    return (
        <div className={`w-full grid grid-cols-1 sm:grid-cols-4 relative h-[20vh]`}>
            <Image src={'/hkdemo/subpage_images/content-demo/greeting_wallpaper.jpg'} alt={'wallPaper'}
                   objectFit={'cover'}
                   fill={true}
                   quality={50}
                   priority={true}
            />
            <div>

            </div>
        </div>
    )
};

function InfoCard({icon, title, content}:{
    icon: IconType;
    title: string;
    content: string;
}) {
    return (
        <div className={'flex flex-col'}>
            <div>

            </div>
        </div>
    )
}