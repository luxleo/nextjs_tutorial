import {departmentProject} from "@/app/lib/hk/domainsData";

//LEARN
// -> 백엔드는 node.js 환경이라 process.env로 키값에 바로 접근이 가능함.
// -> 그치만 클라이언트에서는 빌드될 때 번들링되면서 process.env의 값이 주입되기 때문에 가상환경에 있는 환경변수 값을 읽을수가 없음.

const LOCAL_PREFIX = process.env.NEXT_PUBLIC_TEMP_JSON_DATA

const LOCAL_CORPORATE_PROJECT_PATH = 'hk_projects_corporate.json';
const LOCAL_INSTITUTION_PROJECT_PATH = 'hk_projects_institution.json';

export async function getLocalDepartmentProject(departmentName : string): Promise<departmentProject[]>{
    let institutionData : departmentProject[] =  await fetch(`${LOCAL_PREFIX}/${LOCAL_INSTITUTION_PROJECT_PATH}`)
        .then(res => res.json())
        .then((json : departmentProject[]) => json.filter(data => data.involvedDepartments.includes(departmentName) && data.imageURL[departmentName] !== undefined));
    let corporateData : departmentProject[]= await fetch(`${LOCAL_PREFIX}/${LOCAL_CORPORATE_PROJECT_PATH}`)
        .then(res => res.json())
        .then((json : departmentProject[]) => json.filter(data => data.involvedDepartments.includes(departmentName) && data.imageURL[departmentName] !== undefined));
    return institutionData.concat(corporateData);
}

export async function tempFetchInitialProjects(){
    let institutionData : departmentProject[] = await fetch(`${LOCAL_PREFIX}/${LOCAL_INSTITUTION_PROJECT_PATH}`)
        .then(res => res.json());
    let corporateData: departmentProject[] = await fetch(`${LOCAL_PREFIX}/${LOCAL_CORPORATE_PROJECT_PATH}`)
        .then(res => res.json());
    return institutionData.concat(corporateData);
}

export async function tempFetchProjectWithinDepartments(departments: string[]) {
    if (departments.length > 0) {
        let institutionData: departmentProject[] = await fetch(`${LOCAL_PREFIX}/${LOCAL_INSTITUTION_PROJECT_PATH}`)
            .then(res => res.json())
            .then((data: departmentProject[]) => data.filter(project => {
                for (const involvedDepartment of project.involvedDepartments) {
                    if (departments.includes(involvedDepartment)) return true;
                }
                return false;
            }));
        let corporateData: departmentProject[] = await fetch(`${LOCAL_PREFIX}/${LOCAL_CORPORATE_PROJECT_PATH}`)
            .then(res => res.json())
            .then((data: departmentProject[]) => data.filter(project => {
                for (const involvedDepartment of project.involvedDepartments) {
                    if (departments.includes(involvedDepartment)) return true;
                }
                return false;
            }));
        return institutionData.concat(corporateData);
    }
    else{
        let institutionData : departmentProject[] = await fetch(`${LOCAL_PREFIX}/${LOCAL_INSTITUTION_PROJECT_PATH}`)
            .then(res => res.json());
        let corporateData: departmentProject[] = await fetch(`${LOCAL_PREFIX}/${LOCAL_CORPORATE_PROJECT_PATH}`)
            .then(res => res.json());
        return institutionData.concat(corporateData);
    }
}

