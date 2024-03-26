'use client';

import { FaHardHat } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { FaWrench } from "react-icons/fa";
import { useState} from "react";
import clsx from "clsx";

const businessMenus = [
    {
        iconName: '토목',
        menu: '토목사업',
        departments:['구조부','지반부','설계부','수자원부','조경부','상하수도부']
    },
    {
        iconName: '국토',
        menu: '국토사업',
        departments:['도시계획부','개발사업부','교통계획부']
    },
    {
        iconName: '진단',
        menu: '진단사업',
        departments:['안전진단부','계측부']
    },
    {
        iconName: '연구',
        menu: 'R&D',
        departments:['부설연구소']
    },
    {
        iconName: '관리',
        menu: '건설관리',
        departments:['건설사업관리부']
    }
]

export default function BusinessMenuWrapper() {
    const [departments, setDepartments] = useState<string[]>(businessMenus[0].departments);
    const [focusedMenu, setFocusedMenu] = useState<string>('토목사업');
    const [focusedDepartment, setFocusedDepartment] = useState<string>('구조부');

    return (
        <div className={'w-full flex flex-col'}>
            <div className={'flex justify-center mt-10 md:mt-20 bg-neutral-500'}>
                {businessMenus.map((menu, idx) => (
                    <div key={`${idx}-${menu.menu}`} className={clsx('grow',
                        {
                            'bg-[#ff1919]' : focusedMenu == menu.menu
                        })} onClick={() => {
                        setDepartments(menu.departments);
                        setFocusedMenu(menu.menu);
                    }}
                    >
                        <BusinessMenu iconName={menu.iconName} menu={menu.menu}/>
                    </div>
                ))}
            </div>
            <div className={'flex max-w-[100vw] whitespace-nowrap overflow-x-scroll'}>
                {departments.map((department,idx)=>(
                    <div key={`${idx}-${department}`} onClick={()=>setFocusedDepartment(department)}
                         className={clsx('grow flex justify-center items-center text-sm sm:text-lg py-2 px-1 text-white hover:bg-[#ff1919]',
                             {
                                 'bg-[#ff1919]' : focusedDepartment == department,
                                 'bg-neutral-400' : focusedDepartment != department,
                             })}>
                        {department}
                    </div>
                ))}
            </div>
        </div>
    );
}

// TODO: 24.03.18 지금은 hover 시에 배경이 바뀌는데 focused 된 메뉴일때 바뀌는걸로 한다.
function BusinessMenu({iconName, menu}: {
    iconName: string;
    menu: string;
}) {
    return (
        <div
            className={'w-full basis-0 flex flex-col justify-center items-center min-h-[10vh] text-white gap-2 hover:bg-[#ff1919]'}>
            <div>
                <BusinessMenuIcon iconName={iconName}/>
            </div>
            <div className={'text-sm md:text-xl'}>
                {menu}
            </div>
        </div>
    )
}

function BusinessMenuIcon({iconName}: {
    iconName: string;
}) {
    let result : any = null;
    switch (iconName) {
        case '토목':
            result = <FaHardHat/>;
            break;
        case '국토':
            result = <FaBuilding/>;
            break;
        case '진단':
            result = <TbReportAnalytics/>;
            break;
        case '연구':
            result = <GiGears/>;
            break;
        case '관리':
            result = <FaWrench/>;
            break;
    }
    return (
        <div>
            {result}
        </div>
    )
}