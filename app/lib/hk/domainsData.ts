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
            domains_domains: CONTENT_URL.DOMAINS_DOMAINS,
            domains_projects: CONTENT_URL.DOMAINS_PROJECTS
        };
    }
    return {
        domains_info : CONTENT_URL.DOMAINS_INFO2,
        domains_domains: CONTENT_URL.DOMAINS_DOMAINS2,
        domains_projects: CONTENT_URL.DOMAINS_PROJECTS2
    };
}