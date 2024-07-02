import {departmentInfo} from "@/app/lib/hk/domainsData";
import {projects} from "@/app/subpage/businesses/projects/data";

const DOMAIN_ImageURL_PREFIX = '/hkdemo/domain_images';
export const departmentInfos: departmentInfo[] = [
    {
        name: '건설사업관리부',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/건설사업관리부.png`,
        description: '도로, 하천, 상하수도, 교량, 항만, 철도, 단지 등의 토목분야 전반에 대하여 전문기술 지원과 효율적인 현장운영 등을 통합 관리하여, 최상의 시설물을 완성 할 수 있도록, 건설사업 추진 전 단계에 걸쳐 공정관리, 품질관리, 안전관리 등의 종합적 관리 업무를 수행합니다.',
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
        projects: projects,
        isImplemented : true
    },
    {
        name: '교통계획부',
        description: '교통법정계획(도시교통정비, 대중교통, 교통안전 등)을 비롯한 타당성평가, 광역교통체계, 교통영향평가, 교통체계개선(TSM), 민간투자사업 등 다양한 분야의 종합교통계획 업무를 수행합니다.',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/교통부 대문사진.png`,
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
        projects: projects,
        isImplemented : true
    },
    {
        name: '조경부',
        infoImageURL:`${DOMAIN_ImageURL_PREFIX}/조경부.png`,
        description: '인간에 의해 환경을 아름답고 가치 있게 기획, 설계, 관리, 보존, 재생하는 것을 일컫는 것이 조경입니다. 당사 조경부는 전문적인 기술과 예술적인 감각으로 변화하는 패러다임의 흐름에 적응함과 더불어 미래 세대에게 지속 가능한 환경을 물려줄 수 있도록 인간과 자연의 조화와 공존을 고민하고 있습니다. 공원, 관광지, 유원지, 자연공원, 골프장 및 체육시설, 생태 및 경관계획 분야 등 다양한 업무를 수행합니다.',
        domains: [
            {
                name: '기본계획분야',
                actions: [
                    '공원녹지기본계획',
                    '경관기본계획',
                    '공원조성계획',
                ]
            },
            {
                name: '도시조경분야',
                actions: [
                    '도시공원, 자연공원, 녹지, 광장 설계',
                    '가로수 및 도시환경정비',
                    '경관설계',
                ]
            },
            {
                name: '관광·여가분야',
                actions: [
                    '관광단지, 골프장, 유원지, 리조트 개발계획 및 설계',
                    '캠핑장계획 및 설계',
                ]
            },
            {
                name: '주택단지 및 산업단지 분야',
                actions: [
                    '공동주택 및 건축물 부대조경',
                    '산업단지 조경',
                ]
            },
            {
                name: '환경·생태분야',
                actions: [
                    '환경·생태복원사업',
                ]
            },
            {
                name: '정원분야',
                actions: [
                    '도시정원 및 주택정원',
                ]
            }
        ],
        projects: projects,
        isImplemented : true
    },
    {
        name: '수자원부',
        description: '치수, 이수, 하천환경 및 방재사업 등 수자원 분야 전반에 걸친 업무를 수행합니다.',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/수자원부_main.bmp`,
        domains: [
            {
                name: '치수 및 이수분야',
                actions: [
                    '하천기본계획',
                    '하천정비사업',
                    '소하천정비종합계획',
                ]
            },
            {
                name: '하천환경 분야',
                actions: [
                    '하천환경 관리계획',
                    '하천환경 정비사업',
                    '생태하천 조성 및 복원사업',
                ]
            },
            {
                name: '방재분야',
                actions: [
                    '자연재해저감종합계획',
                    '재해영향평가',
                    '재해복구사업 분석평가',
                    '자연재해위험지구 정비사업',
                    '우수유출저감시설'
                ]
            },
            {
                name: '기타',
                actions: [
                    '침수 모델링',
                    '하천 및 하천환경 조사',
                ]
            }
        ],
        projects: projects,
        isImplemented : true
    },
    {
        name: '구조부',
        description: '도로, 철도, 지중구조물, 항만, 상하수도 등 다양한 분야의 구조물에 대한 계획과 세부설계를 담당하고 있으며, 축적된 기술력을 기반으로 안전하고 경제적인 구조해석 및 설계를 수행합니다.',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/거가대교.jpg`,
        domains: [
            {
                name: '교량계획 및 설계',
                actions: [
                    '하천 및 도로를 횡단하는 교량(도로교, 철도교)의 계획',
                    '주변 현황 및 사업배경을 고려한 최적의 교량 형식 결정',
                    '구조계산을 통한 경제적이고 안정적인 교량 설계',
                ]
            },
            {
                name: '지하구조물 계획 및 설계',
                actions: [
                    '지중 암거, 지하차도 등의 지중 교통 시설물 에 대한 계획 및 설계',
                    '펌프장, 저류조, 유수지 등 상하수도 관련 지중 구조물 설계',
                ]
            },
            {
                name: '내진설계 및 기존구조물 내진성능보강 설계',
                actions: [
                    '최신 기준에 따른 다양한 구조물의 내진설계',
                    '기존구조물(교량, 지하차도, 지중암거 등)의 내진성능 보강 설계',
                    '덕트, 기계장치 등 건축 시설물에 관한 내진성능 평가 분석평가',
                ]
            },
            {
                name: '기타 구조관련 해석 및 자문',
                actions: [
                    '다양한 구조물에 대한 상세 해석 실시',
                    '여러 분야에 대한 구조자문 수행',
                ]
            }
        ],
        projects: projects,
        isImplemented : true
    },
    {
        name: '지반부',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/지반부.png`,
        description: '구조물의 기초설계, 사면안정성검토, 연약지반 개량설계, 지반내진해석, 지하안전영향평가 등 각종 지반공학 분야에 대한 설계를 수행합니다.',
        domains: [
            {
                name: '사면안정성검토',
                actions: [
                    '토사사면, 암반사면의 안정성 검토'
                ]
            },
            {
                name: '흙막이 가시설 설계',
                actions: [
                    '지하굴착 시 다양한 흙막이 벽체 및 지보공법 설계'
                ]
            },
            {
                name: '지반 내진해석',
                actions: [
                    '사면 내진안전성 검토, 기초지반 내진해석'
                ]
            },
            {
                name: '지하안전영향평가',
                actions: [
                    '지반 침하 예방을 위한 영향 요인 조사, 예측, 평가'
                ]
            }
        ],
        isImplemented : true
    },
    {
        name: '설계부',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/설계부.png`,
        description: '도로, 단지, 철도 등 다양한 토목분야의 타당성검토, 기본 및 실시설계를 수행합니다.',
        domains: [
            {
                name: '도로',
                actions: [
                    '고속도로, 국도, 지방도 기본 및 실시설계'
                ]
            },
            {
                name: '단지',
                actions: [
                    '택지개발, 공공주택, 유통(물류)단지 기본 및 실시설계'
                ]
            },
            {
                name: '철도',
                actions: [
                    '도시철도, 경전철, 노면전차(트램) 기본 및 실시설계'
                ]
            },
            {
                name: '항만',
                actions: [
                    '항만 및 어항 개발 계획 및 설계',
                    '해역이용협의'
                ]
            }
        ],
        isImplemented : true
    },
    {
        name: '상하수도부',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/상하수도부.jpg`,
        description: '맑은 물 공급을 위한 취․정수시설, 송․배수시설 등 사수도 분야와 각종 생산 활동에서 배출되는 하․폐수를 맑은 물로 처리하는 하수처리시설 및 하수관거 등 하수도분야의 기본 및 실시설계를 수행합니다.',
        domains: [
            {
                name: '상수도',
                actions: [
                    '취수시설',
                    '정수장',
                    '노후관로 정비'
                ]
            },
            {
                name: '하수도',
                actions: [
                    '하수관로',
                    '펌프장',
                    '허수처리장'
                ]
            },
            {
                name: '기타 상하수도 시설',
                actions: [
                    '배수펌프장'
                ]
            }
        ],
        isImplemented : true
    },
    {
        name: '도시계획부',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/도시계획부.png`,
        description: '균형 있는 국토개발과 친환경 미래 녹색도시 구현을 위한 일반산업단지, 지식산업단지 등의 개발로 사회적 가치 창출을 위한 업무를 수행합니다.',
        domains: [
            {
                name: '도시계획',
                actions: [
                    '도시기본계획',
                    '도시관리계획',
                    '형도면 고시',
                    '지구단위 계획'
                ]
            },
            {
                name: '관리계획',
                actions: [
                    '용도지역, 용도지구, 용도구역에 관한 계획',
                    '기반시설계획',
                    '개발사업, 정비사업에 관한 계획',
                    '사업타당성분석'
                ]
            }
        ],
        isImplemented : true
    },
    {
        name: '안전진단부',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/안전진단부.jpg`,
        description: '국토교통부 지정 안전진단 전문기관으로 구조물의 일상점검, 정기점검, 건설현장의 안전점검과 구조해석을 통한 안전성 평가를 통한 시설물의 안전여부를 평가하는 업무를 수행합니다.',
        domains: [
            {
                name: '교량 및 터널',
                actions: [
                    '교량(콘크리트, 강재)',
                    '터널',
                    '옹벽',
                    '지하 공동구'
                ]
            },
            {
                name: '항만',
                actions: [
                    '안벽',
                    '잔교',
                    '돌핀',
                    '방파제'
                ]
            }
        ],
        isImplemented : true
    },
    {
        name: '부설연구소',
        infoImageURL: `${DOMAIN_ImageURL_PREFIX}/부설연구소.png`,
        description: '기술연구(R&D)분야에 대한 역량을 강화하고 설계, 시공 등 다양한 분야에 대한 혁신기술을 적극적으로 개발하여 최고의 엔지니어링 기술 실현을 위한 업무를 수행합니다.',
        domains: [
            {
                name: '특허 및 신기술 개발',
                actions: [
                    '건설 신기술, 특허 개발',
                    '친환경 건설재료 개발',
                    '산학협력 기술개발'
                ]
            },
            {
                name: '학술집필 및 용역',
                actions: [
                    '연구논문, 보고서 집필',
                    '학회 활동'
                ]
            }
        ],
        isImplemented : true
    },
];
