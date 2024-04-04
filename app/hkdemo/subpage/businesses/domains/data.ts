import {departmentInfo} from "@/app/lib/hk/domainsData";
import {projects} from "@/app/hkdemo/subpage/businesses/projects/data";

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
    }
];
