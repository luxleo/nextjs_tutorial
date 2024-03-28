import Image from "next/image";
import {CONTENT_IMG_URL} from "@/app/hkdemo/subpage/prefixed";

// TODO: dummy data 직접 데이터 수신해서 받기
const imageURLS = [CONTENT_IMG_URL.PATENT1, CONTENT_IMG_URL.PATENT2, CONTENT_IMG_URL.PATENT3, CONTENT_IMG_URL.PATENT4];

type patentInfo = {
    img_url: string;
    description: string;
    enroll_number: string;
    enroll_date: string;
}

const patents : patentInfo[] = [
    {
        img_url: CONTENT_IMG_URL.PATENT1,
        description: "초경량 시멘트 조성물 및 이의 제조방법",
        enroll_number: "제 10-2075289",
        enroll_date: "2020 02월 03일"
    },
    {
        img_url: CONTENT_IMG_URL.PATENT2,
        description: "교량의 내하력 평가 장치 및 방법",
        enroll_number: "제 10-1966666",
        enroll_date: "2019 04월 02일"
    },
    {
        img_url: CONTENT_IMG_URL.PATENT3,
        description: "아연 분말을 포함하는 팽창성 발포 시멘트 조성물",
        enroll_number: "제 10-2621802",
        enroll_date: "2024 01월 02일"
    },
    {
        img_url: CONTENT_IMG_URL.PATENT4,
        description: "해수담수화 농축수를 이용한 콘크리트 조성물",
        enroll_number: "제 5-5-2019-030271993",
        enroll_date: "2019 04월 16일"
    }
]

export default function IPRCardContainer() {
    return (
        <div className={'w-full flex justify-center'}>
        <div className={'w-full sm:w-[70%] flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-x-8 sm:gap-y-20'}>
            {patents.map((patent, idx)=>(
                <IPRCard key={`patent-${idx}`} imgURL={patent.img_url} description={patent.description} enrollNumber={patent.enroll_number} enrollDate={patent.enroll_date}/>
            ))}
        </div>
        </div>
    );
};

function IPRCard({imgURL,description,enrollNumber,enrollDate}:{
    imgURL: string;
    description: string;
    enrollNumber: string;
    enrollDate: string;
}) {
    return (
        <div className={'sm:grow sm:basis-0'}>
            <Image src={imgURL} alt={'patent image'}
                   width={591}
                   height={839}
                   className={'w-full'}/>
            <div className={'flex flex-col items-start text-sm text-neutral-500 pl-2 pt-2'}>
                <div>{description}</div>
                <div>{enrollNumber}</div>
                <div>{enrollDate}</div>
            </div>
        </div>
    )
}