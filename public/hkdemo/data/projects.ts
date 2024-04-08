import {departmentProject} from "@/app/lib/hk/domainsData";

const LOCAL_PREFIX = process.env.TEMP_JSON_DATA

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