import {CONTENT_URL} from "@/app/hkdemo/subpage/prefixed";
import {projects} from "@/app/hkdemo/subpage/businesses/projects/data";
import {departmentInfos} from "@/app/hkdemo/subpage/businesses/domains/data";
import {getLocalDepartmentProject} from "@/public/hkdemo/data/projects";

export type domain = {
    menu:
        | '토목사업분야'
        | '국토사업분야'
        | '진단사업분야'
        | 'R&D분야'
        | '건설관리분야';
    departments: string[];
}

export type departmentDomain = {
    name: string;
    actions?: string[];
}

type projectImageURL = {
    [key : string]: string;
}

export type departmentProject = {
    name: string;
    startDate: string;
    projectOwner: string;
    hasImage: boolean;
    involvedDepartments: string[];
    projectOwnerType:
        | '관'
        | '사';
    imageURL: projectImageURL | Record<string, never>; // projectImageURL이거나 빈 object 타입
}

export type departmentInfo = {
    name?: string;
    infoImageURL?: string;
    description: string;
    domains: departmentDomain[] | string;
    projects?: departmentProject[] | string;
    isImplemented: boolean
}

const domains: domain[] = [
    {
        menu: '토목사업분야',
        departments: ['구조부', '지반부', '설계부', '수자원부', '조경부', '상하수도부']
    },
    {
        menu: '국토사업분야',
        departments: ['도시계획부', '교통계획부']
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

const implementedDomainsName = ['건설사업관리부', '교통계획부', '조경부','수자원부','구조부','지반부'];

export async function getDomains() {
    return domains;
}

export async function findDomainByMenuName(menuName: string) : Promise<domain>{
    return domains.filter(domain => domain.menu === menuName)[0]
}

export function getDepartmentInfo(currentDepartment: string) : departmentInfo {
    if (!implementedDomainsName.includes(currentDepartment)){
        return {
            name: currentDepartment,
            infoImageURL : CONTENT_URL.DOMAINS_INFO,
            description: "교량 및 도로구조물 설계와 감리 업무를 수행하고 있습니다. 구조부는 순수 자체 기술력으로 사장교, 현수교 형식 등 특수교량 설계 분야에서 국내외 국제현상공모 우수작으로 선정되는 등 기술력을 인정받고 있으며 해외사업에도 적극적으로 진출하고 있습니다." ,
            domains: CONTENT_URL.DOMAINS_DOMAINS,
            projects: CONTENT_URL.DOMAINS_PROJECTS,
            isImplemented: false
        };
    }

    const targetDepartment = departmentInfos.filter(info => info.name === currentDepartment)[0];
    //TODO: public json data 에서 불러 오도록 하고, 이미지는 해당 부서의 이미지 있는지 조회하기 
    const targetProject = projects.filter(project => project.involvedDepartments.includes(currentDepartment) && project.hasImage);

    targetDepartment.projects = targetProject;
    return targetDepartment;
}

export async function getCurrentDepartmentInfo(currentDepartment: string) : Promise<departmentInfo> {
    if (!implementedDomainsName.includes(currentDepartment)){
        return {
            name: currentDepartment,
            infoImageURL : CONTENT_URL.DOMAINS_INFO,
            description: "교량 및 도로구조물 설계와 감리 업무를 수행하고 있습니다. 구조부는 순수 자체 기술력으로 사장교, 현수교 형식 등 특수교량 설계 분야에서 국내외 국제현상공모 우수작으로 선정되는 등 기술력을 인정받고 있으며 해외사업에도 적극적으로 진출하고 있습니다." ,
            domains: CONTENT_URL.DOMAINS_DOMAINS,
            projects: CONTENT_URL.DOMAINS_PROJECTS,
            isImplemented: false
        };
    }
    const targetDepartment = departmentInfos.filter(info => info.name === currentDepartment)[0];
    const targetProject = await getLocalDepartmentProject(currentDepartment);

    targetDepartment.projects = targetProject;
    return targetDepartment;
}