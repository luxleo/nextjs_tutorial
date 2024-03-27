'use client';

import SectionTitle from "@/app/ui/hkdemo/overview/section_title";
import {Dispatch, SetStateAction, Suspense, useEffect, useRef, useState} from "react";
import Script from "next/script";
import clsx from "clsx";
import {map} from "zod";
import {locationData, locationInfo} from "@/app/lib/hk/data";


export default function Page() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [currentLocation, setCurrentLocation] = useState<locationInfo>(locationData[0]);

    //LEARN: 기존 카카오 api이용하다가 그냥 포스 바뀔때 마다 새롭게 렌더링하도록하였다
    useEffect(()=>{
        window.kakao.maps.load(() => {
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
    },[currentLocation])

    return (
        <section className={'w-full pb-10 sm:pb-20 px-[5%] sm:px-[10%]'}>
            <Suspense>
                <SectionTitle title={'오시는 길'}/>
            </Suspense>
            <div className={'w-full flex flex-col'}>
                <div className={'w-full flex justify-center'}>
                    <div className={'w-[70%] flex'}>
                    {locationData.map(locationInfo => (
                        <div key={locationInfo.locationName} className={'grow basis-0'} onClick={() => {
                            setCurrentLocation(locationInfo);
                        }}>
                            <LocationControllerHeader locationInfo={locationInfo} currentLocation={currentLocation}/>
                        </div>
                    ))}
                    </div>
                </div>
                <div ref={mapRef} className={'w-full h-[30vh] sm:h-[50vh]'}>

                </div>
                <div className={'w-full flex'}>
                    <AddressContainer locationInfo={currentLocation}/>
                </div>
            </div>
        </section>
    );
};

function LocationControllerHeader({locationInfo,currentLocation}:{
    locationInfo: locationInfo;
    currentLocation: locationInfo;
}){
    return (
        <div className={clsx('w-full flex justify-center items-center text-lg sm:text-xl py-2 sm:py-4 text-white',{
            'bg-neutral-300': locationInfo.locationName !== currentLocation.locationName,
            'bg-red-500' : locationInfo.locationName === currentLocation.locationName
        })}>
            {locationInfo.locationName}
        </div>
    );
}

function AddressContainer({locationInfo}:{
    locationInfo: locationInfo;
}) {
    return (
        <div className={'w-full flex flex-col'}>
            <div className={'text-lg sm:text-2xl pt-2 sm:pt-4 sm:font-semibold'}>
                주소
            </div>
            <div className={'text-xs sm:text-lg mt-2 sm:mt-4'}>
                {locationInfo.streetAddress} <span>{locationInfo.buildingInfo}</span>
            </div>
        </div>
    );
}