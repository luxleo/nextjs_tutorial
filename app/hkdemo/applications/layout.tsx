'use client';``
import React from "react";
import AppNavBar, {useAppMenuStore} from "@/app/hkdemo/applications/ui/navbar";

export default function Layout({children}:{
    children: React.ReactNode
}) {
    const isNavOn = useAppMenuStore(state => state.isOn);
    const setIsNavOn = useAppMenuStore(state => state.setIsOn);

    return (
        <div className={'w-full'}>
            <div className={'w-full h-[10vh] bg-black'}></div>
            <AppNavBar/>
            <div className={'w-full mt-[40px]'} onClick={()=>{
                if(!isNavOn) return;
                setIsNavOn();
            }}>
                {children}
            </div>
        </div>
    )
};