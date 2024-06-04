export type serviceMenu = {
    menuName: string;
    subMenus: subMenu[];
}

export type subMenu = {
    name: string;
    href: string;
    description?: string;
    isActive: boolean;
}

export const dummyServiceMenu: serviceMenu[] = [
    {
        menuName: '비계',
        subMenus:[
            {name: '쌍줄강관비계',href: '/hk-app/tools/scaffolding/double-pipe-scaffolding',isActive: true},
            {name: '시스템비계',href: '/hk-app/tools/scaffolding/system-scaffolding',isActive: false},
            {name: '해체비계',href: '/hk-app/tools',isActive: false},
        ]
    },
    {
        menuName: '보 구조해석',
        subMenus:[
            {name: '단순보',href: '/hk-app/tools',isActive: false},
            {name: '캔틸레버',href: '/hk-app/tools',isActive: false},
        ]
    },
];