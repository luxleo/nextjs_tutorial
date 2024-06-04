'use client';
import {useAppMenuStore} from "@/app/hkdemo/applications/ui/navbar";

export type breadLink = {
    menuName: string;
    subMenuName: string;
}
export default function BreadCrumbs({breadLink}: {
        breadLink : breadLink
    }
) {
    const setIsOn =useAppMenuStore(state => state.setIsOn);
    const updateCurrentMenu = useAppMenuStore(state => state.updateCurrentMenuWithName);
    return (
        <div className={'flex gap-x-2 text-lg select-none'}>
            <div className={'text-hk-blue-200 hover:cursor-pointer'}
                 onClick={()=>{
                    setIsOn();
                    updateCurrentMenu(breadLink.menuName);
            }}>{breadLink.menuName}</div>
            <div>{`>`}</div>
            <div>{breadLink.subMenuName}</div>
        </div>
    )
};