'use client';

import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Suspense, useEffect, useRef} from "react";
import Script from "next/script";

export default function Page() {
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        window.kakao.maps.load(() => {
            const pos = {x:35.26904916928503,
            y:129.08966942948777}
            const options = {
                //지도를 생성할 때 필요한 기본 옵션
                center: new window.kakao.maps.LatLng(pos.x, pos.y), //지도의 중심좌표.
                level: 3, //지도의 레벨(확대, 축소 정도)
            };

            const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
            var markerPosition  = new window.kakao.maps.LatLng(pos.x, pos.y);

// 마커를 생성합니다
            var marker = new window.kakao.maps.Marker({
                position: markerPosition
            });

// 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            var iwContent = `<div style="padding:5px;">주) 에이치케이이앤씨 <br><a href="https://map.kakao.com/link/map/주) 에이치케이이앤씨,${pos.x},${pos.y}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/주) 에이치케이이앤씨,${pos.x},${pos.y}" style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwPosition = new window.kakao.maps.LatLng(pos.x, pos.y); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
            var infowindow = new window.kakao.maps.InfoWindow({
                position : iwPosition,
                content : iwContent
            });

// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            infowindow.open(map, marker);
        });
    },[])

    return (
        <section className={'w-full'}>
            <Suspense>
                <SectionTitle title={'오시는 길'}/>
            </Suspense>
            <div ref={mapRef} className={'w-full h-[30vh] sm:h-[40vh]'}>

            </div>

        </section>
    )
};