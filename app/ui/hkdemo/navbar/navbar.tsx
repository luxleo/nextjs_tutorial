'use client';

import HomeNavBar from "@/app/ui/hkdemo/navbar/desktop_navbars";
import {PhoneNavBar} from "@/app/ui/hkdemo/navbar/mobile_navbars";
import {useEffect, useState} from "react";


/* TODO:
 * 1. link 더미 데이터 만들기
 * 2. 해당하는 대 분류 호버시에 하위 목록 만드는 섹터 만들기
 * 3. 대분류 link로 접속하면 하위 link를 포함한 페이지로 라우팅 한다.
 * 4. usestate 안쓰고 server component로 가능하면 구현하기 => 안될거 같다 usePathname 도 써야해서 ...
 */


// TODO: onMouseLeave event로 hkdemo 컴포넌트 이탈시 참조중인 메인 메뉴 초기화 하기
// TODO: useState로 대분류 메뉴 => 소분류 메뉴 구분하기
// TODO: 모바일 / pc 완전히 구분해서 만들기

export default function NavBar() {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const updateScroll = ()=>{
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
        return () => {
            // unmount시에는 scroll제거 해주기
            window.removeEventListener('scroll', updateScroll);
        };
    }, []);
    return (
        <header className={'w-full fixed'}>
            {/* PC 용 드랍다운 hkdemo */}
                <HomeNavBar responsiveBackground={scrollPosition >50 ? 'scroll-downed' : ''}/>
            {/*  모바일 용 dropdown hkdemo*/}
                <PhoneNavBar/>
        </header>

    );
};