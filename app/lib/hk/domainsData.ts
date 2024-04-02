import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";

export type domain = {
    menu:
        | '토목사업분야'
        | '국토사업분야'
        | '진단사업분야'
        | 'R&D분야'
        | '건설관리분야';
    departments: string[];
}

const domains: domain[] = [
    {
        menu: '토목사업분야',
        departments: ['구조부', '지반부', '설계부', '수자원부', '조경부', '상하수도부']
    },
    {
        menu: '국토사업분야',
        departments: ['도시계획부', '개발사업부', '교통계획부']
    },
    {
        menu: '진단사업분야',
        departments: ['안전진단부', '계측부']
    },
    {
        menu: 'R&D분야',
        departments: ['부설연구소']
    },
    {
        menu: '건설관리분야',
        departments: ['건설사업관리부']
    }
];

export async function getDomains() {
    return domains;
}

export function getDepartmentInfo(currentDepartment: string) {
    if (currentDepartment === '구조부'){
        return {
            domains_info : CONTENT_URL.DOMAINS_INFO,
            domains_description: "교량 및 도로구조물 설계와 감리 업무를 수행하고 있습니다. 구조부는 순수 자체 기술력으로 사장교, 현수교 형식 등 특수교량 설계 분야에서 국내외 국제현상공모 우수작으로 선정되는 등 기술력을 인정받고 있으며 해외사업에도 적극적으로 진출하고 있습니다." ,
            domains_domains: CONTENT_URL.DOMAINS_DOMAINS,
            domains_projects: CONTENT_URL.DOMAINS_PROJECTS
        };
    }
    return {
        domains_info : CONTENT_URL.DOMAINS_INFO2,
        domains_description: "지반조사 및 토질 시험을 시행하고, 그 결과를 분석하여 각종 토목설계를 위한 기초자료를 제공함과 동시에 수자원,환경,도로 및 공항,철도,국토개발 등의 사업 분야에서 연약지반, 구조물 기초,비탈면 안정, 터널 및 계측관리 등 각종 지반공학 분야 설계를 수행하고 있습니다.",
        domains_domains: CONTENT_URL.DOMAINS_DOMAINS2,
        domains_projects: CONTENT_URL.DOMAINS_PROJECTS2
    };
}