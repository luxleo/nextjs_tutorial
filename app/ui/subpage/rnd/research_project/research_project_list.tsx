import {researchProjects} from "@/app/ui/subpage/rnd/research_project/research_project_data";

export default function ResearchProjectList(){
    return (
        <div className={'w-full flex justify-center'}>
            <ResearchProjectListContainer/>
        </div>
    );
}

function ResearchProjectListContainer(){
    return (
        <div className={'w-[90%] flex justify-start items-center'}>
            <table className={'hidden sm:table w-full'}>
                <thead className={'pb-10'}>
                <tr className={'border-b-2'}>
                    <th scope={'col'} className={'w-[5%] pb-4'}>번호</th>
                    <th scope={'col'} className={'w-[30%] pb-4'}>과제명</th>
                    <th scope={'col'} className={'w-[15%] pb-4'}>발주처</th>
                    <th scope={'col'} className={'w-[10%] pb-4'}>과제기간</th>
                    <th scope={'col'} className={'w-[30%] pb-4'}>비고</th>
                </tr>
                </thead>
                <tbody>
                {researchProjects.map(project => (
                    <tr key={`${project.no}-research`} className={'font-light border-b'}>
                        <td className={'py-3 w-[5%] text-center'}>{project.no}</td>
                        <td className={'py-3 w-[30%]'}>{project.researchName}</td>
                        <td className={'py-3 w-[20%] text-center'}>{project.ProjectOwner}</td>
                        <td className={'py-3 w-[10%] text-center'}>{project.duration}</td>
                        <td className={'py-3 w-[30%] pl-10'}>{project.note}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}