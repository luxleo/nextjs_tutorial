import {departmentInfo} from "@/app/lib/hk/domainsData";
import {projects} from "@/app/hkdemo/subpage/businesses/projects/data";

const DOMAIN_ImageURL_PREFIX = '/hkdemo/domain_images';
export const departmentInfos: departmentInfo[] = [
    {
        name: '건설사업관리부',
        description: ' 도로,하천,상하수도,교량,항만,철도,단지 등의 건설사업관리를 우수한 기술력을 가진 기술인이 수행함으로써 고객의 요구를 성실히 이행하고 신기술을 도입하는 등 최고의 건설사업관리를 위한 모든 과정에 대해 전문기술과 효율적인 관리로 통합 관리하여, 최상의 시설물을 완성 할 수 있도록, 건설사업 추진 전 단계에 걸쳐 공정관리, 품질관리 ,안전관리, 공사기간 등을 종합적으로 관리하여 발주처의 예산절감을 극대화 할 수 있도록 최선을 다하고 있습니다.',
        domains: [
            {
                name: '도로 및 공항, 수자원 분야',
                actions: [
                    '시공관리',
                    '공정관리',
                    '품질관리',
                    '안전 및 환경관리'
                ]
            },
            {
                name: '상·하수도 분야',
                actions: [
                    '시공관리',
                    '공정관리',
                    '품질관리',
                    '안전 및 환경관리'
                ]
            },
            {
                name: '항만 및 철도 분야',
                actions: [
                    '시공관리',
                    '공정관리',
                    '품질관리',
                    '안전 및 환경관리'
                ]
            },
            {
                name: '산업단지조성, 택지조성 분야 등',
                actions: [
                    '시공관리',
                    '공정관리',
                    '품질관리',
                    '안전 및 환경관리'
                ]
            }
        ],
        // TODO: projects 부서별로 가저오도록 해야함
        projects: projects,
        isImplemented : true
    },
    {
        name: '교통계획부',
        description: '교통계획부는 교통관련 전문부서로서 교통법정계획(도시교통정비, 대중교통, 교통안전 등)을 비롯한 타당성평가, 광역교통체계, 교통영향평가, 교통체계개선(TSM), 민간투자사업 등 다양한 분야의 종합교통계획 업무를 담당하고 있습니다.',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/교통부 대문사진1.png`,
        domains: [
            {
                name: '교통시설 타당성조사 및 타당성 평가',
                actions: [
                    '공공교통시설 개발사업 사전 타당성 조사',
                    '교통시설사업 교통수요',
                    '신교통수단 도입 타당성 평가'
                ]
            },
            {
                name: '교통분야법정계획',
                actions: [
                    '도시교통정비',
                    '대중교통기본계획',
                ]
            },
            {
                name: '개발사업 교통처리계획',
                actions: [
                    '광역교통개선대책',
                    '연계교통체계 구축대책',
                    '교통영향평가, 교통성검토',
                    '개발사업 교통분야 계획 및 분석',
                    '교통영향평가 이행점검'
                ]
            },
            {
                name: '교통체계개선계획',
                actions: [
                    '교통운영개선(TSM) 계획 및 설계',
                    '보행우선구역 설계 및 자전거도로 설계',
                    '교통사고 잦은 곳 개선사업',
                    '주차장 수급실태조사',
                    '간선급행버스(BRT) 구축사업',
                    '버스노선체계 개편계획'
                ]
            }
        ],
        // TODO: projects 부서별로 가저오도록 해야함
        projects: projects,
        isImplemented : true
    }
];
