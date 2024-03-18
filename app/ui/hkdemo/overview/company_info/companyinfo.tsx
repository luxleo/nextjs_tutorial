import SectionTitle from "@/app/ui/hkdemo/overview/section_title";

import { FaHardHat } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { FaWrench } from "react-icons/fa";

const businessMenus = [
    {
        iconName: '토목',
        menu: '토목사업'
    },
    {
        iconName: '국토',
        menu: '국토사업'
    },
    {
        iconName: '진단',
        menu: '진단사업'
    },
    {
        iconName: '연구',
        menu: 'R&D'
    },
    {
        iconName: '관리',
        menu: '건설관리'
    }
]

export default function Companyinfo({content}:{
    content: string
}){
    return (
        <div className={'mt-20 text-lg md:text-xl whitespace-pre-wrap w-full'}>
            <SectionTitle title={'사업영역'}/>
            {content}
            <BusinessMenuWrapper/>
        </div>
    )
}

function BusinessMenuWrapper() {
    return (
        <div className={'flex justify-center mt-14 md:mt-20 bg-neutral-500'}>
            {businessMenus.map((menu, idx)=>(
                <BusinessMenu iconName={menu.iconName} menu={menu.menu}/>
            ))}
        </div>
    )
}

// TODO: 24.03.18 지금은 hover 시에 배경이 바뀌는데 focused 된 메뉴일때 바뀌는걸로 한다.
function BusinessMenu({iconName, menu}:{
    iconName: string;
    menu: string;
}) {
    return (
        <div className={'grow basis-0 flex flex-col justify-center items-center min-h-[10vh] text-white gap-2 hover:bg-[#ff1919]'}>
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