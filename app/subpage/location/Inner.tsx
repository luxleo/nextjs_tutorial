'use client';

import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Dispatch, SetStateAction, Suspense, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {locationData, locationInfo} from "@/app/lib/hk/data";


export default function Inner() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [currentLocation, setCurrentLocation] = useState<locationInfo>(locationData[0]);


    //LEARN: 최상단 레이아웃에 구현했었는데 자꾸 로드 하지 못하는 문제가 발생 => 그래서 로드시에 해결하고 플래그 신호를 주어 변경하도록 하였음.
    useEffect(() => {
        const $script = document.createElement("script");
        $script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=5cdc9e5bc1a550b285e02c4f77d5cd5f&autoload=false&libraries=services';
        $script.addEventListener("load", () => setMapLoaded(true));
        document.head.appendChild($script);
    }, []);

    //LEARN: 기존 카카오 api이용하다가 그냥 포스 바뀔때 마다 새롭게 렌더링하도록하였다
    useEffect(()=>{
        if(!mapLoaded) return;
        window.kakao?.maps?.load(() => {
            const pos = currentLocation.pos;
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

            var iwContent = `<div class="whitespace-nowrap" style="padding:15px;"> <a href="https://map.kakao.com/link/map/주) ${currentLocation.locationName},${pos.x},${pos.y}" class="ml-2" style="cursor:pointer;" target="_blank">주) ${currentLocation.locationName}</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwPosition = new window.kakao.maps.LatLng(pos.x, pos.y); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
            var infowindow = new window.kakao.maps.InfoWindow({
                position : iwPosition,
                content : iwContent
            });

// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            infowindow.open(map, marker);

        });
    },[mapLoaded,currentLocation])

    return (
            <div className={'w-full flex flex-col'}>
                <div className={'w-full flex justify-center'}>
                </div>
                <div ref={mapRef} className={'w-full h-[30vh] md:h-[50vh]'}>

                </div>
                <div className={'w-full flex'}>
                    <AddressContainer locationInfo={currentLocation}/>
                </div>
            </div>
    );
};

function AddressContainer({locationInfo}:{
    locationInfo: locationInfo;
}) {
    return (
        <div className={'w-full flex flex-col'}>
            <div className={'text-lg md:text-2xl pt-10 md:pt-20 md:font-semibold'}>
                주소
            </div>
            <div className={'text-sm md:text-lg mt-2 md:mt-4'}>
                {locationInfo.streetAddress} <span>{locationInfo.buildingInfo}</span>
            </div>
        </div>
    );
}