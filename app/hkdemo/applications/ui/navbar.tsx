'use client';
import React from "react";
import {create} from "zustand";
import {dummyServiceMenu, serviceMenu} from "@/app/hkdemo/applications/data/services-menu";
import {clsx} from "clsx";
import {useRouter} from "next/navigation";
import { RxCross2 } from "react-icons/rx";

export type appMenuState = {
    menus: serviceMenu[];
    currentMenu: serviceMenu;
    isOn: boolean;
}

export type appMenuAction = {
    setCurrentMenu : (menu: serviceMenu) => void
    setIsOn: () => void
    updateCurrentMenuWithName: (menuName: string) => void
}

const initialAppMenuState : appMenuState = {
    menus: dummyServiceMenu,
    currentMenu: dummyServiceMenu[0],
    isOn: false
}

export const useAppMenuStore = create<appMenuAction & appMenuState>((set, get) => ({
    ...initialAppMenuState,
    setCurrentMenu: (menu: serviceMenu) => set((state) => ({currentMenu: menu})),
    setIsOn: () => set((state) => ({isOn: !state.isOn})),
    updateCurrentMenuWithName: (menuName) => set((state) => ({
        currentMenu: state.menus.filter(el => el.menuName === menuName)[0]
    }))
}));

export default function AppNavBar() {
    const isNavOn = useAppMenuStore(state => state.isOn);
    const setIsNavOn = useAppMenuStore(state => state.setIsOn);
    return (
        <div className={'fixed flex items-center w-full h-[40px] bg-hk-blue-600 text-white'}>
            <div
                className={clsx('relative flex justify-center items-center ml-5 gap-x-2 hover:text-orange-500 hover:cursor-pointer select-none', {
                    'text-orange-500': isNavOn,
                })}
                onClick={setIsNavOn}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect y="6" width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect y="12" width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect x="6" width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect x="6" y="6" width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect x="6" y="12" width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect x="12" width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect x="12" y="6" width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect x="12" y="12" width="4" height="4" rx="1" fill="currentColor"></rect>
                </svg>
                <div className={'flex items-center'}>
                    서비스
                </div>
            </div>
            {isNavOn && <ServiceMenuContainer/>}
        </div>
    );
};

function ServiceMenuContainer() {
    const menus = useAppMenuStore(state => state.menus);
    const currentMenu = useAppMenuStore(state => state.currentMenu);
    const setIsNavOn = useAppMenuStore(state => state.setIsOn);
    const setCurrentMenu = useAppMenuStore(state => state.setCurrentMenu);
    const router = useRouter();
    return (
        <div className={'fixed top-[calc(10vh+40px)] left-0 flex min-w-[500px]  border-t-[1px] border-neutral-500'}>
            <div
                className={'flex flex-col gap-y-2 basis-0 grow-[1] bg-hk-blue-600 overflow-y-scroll px-4 py-8 text-lg font-bold'}>
                {menus.map((el, idx) => (
                    <div key={`${el.menuName}-${idx}`} onClick={() => setCurrentMenu(el)}
                         className={clsx('select-none hover:cursor-pointer', {
                             'text-orange-500': currentMenu.menuName === el.menuName,
                             'hover:text-orange-500': currentMenu.menuName !== el.menuName
                         })}>
                        {el.menuName}
                    </div>
                ))}
            </div>
            <div className={'grow-[2] basis-0 flex flex-col gap-y-7 bg-hk-blue-600 overflow-y-scroll px-4 py-8'}>
                <div className={'flex justify-between text-2xl font-bold'}>
                    <div className={''}>
                        {currentMenu.menuName}
                    </div>
                    <div className={'hover:cursor-pointer hover:shadow-inner select-none'} onClick={setIsNavOn}>
                        <RxCross2/>
                    </div>
                </div>
                <div className={'flex flex-col gap-y-3'}>
                    {currentMenu.subMenus?.map((el, idx) => (
                        <div key={`${idx}-${el.name}`}
                             className={clsx('text-lg select-none group relative inline-flex', {
                                 'hover:cursor-pointer hover:text-orange-500': el.isActive,
                                 'text-neutral-400': !el.isActive
                             })}
                             onClick={() => {
                                 if (!el.isActive) return;
                                 setIsNavOn();
                                 router.push(el.href);
                             }}
                        >
                            {el.name}
                            {!el.isActive && <span
                                className={'group-hover:flex hidden ml-2 text-sm border-neutral-400 border-2 items-center justify-center px-1'}>준비중</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}