import {researches, ResearchInfo} from "@/app/ui/subpage/rnd/research/research_dummy_data";

export default function ResearchList() {
    return (
        <div className={'w-full flex justify-center'}>
            <ResearchListContainer researches={researches}/>
        </div>
    );
};

function ResearchListContainer({researches}:{
    researches: ResearchInfo[]
}) {
    return (
        <div className={'w-[90%] flex justify-center items-center'}>
            <table className={'hidden sm:table w-full'}>
                <thead className={'pb-10'}>
                <tr className={'border-b-2'}>
                    <th scope={'col'} className={'w-[5%] pb-4'}>번호</th>
                    <th scope={'col'} className={'w-[45%] pb-4'}>논문명</th>
                    <th scope={'col'} className={'w-[15%] pb-4'}>발급기관</th>
                    <th scope={'col'} className={'w-[10%] pb-4'}>식별타입</th>
                    <th scope={'col'} className={'w-[30%] pb-4'}>식별번호</th>
                    <th scope={'col'} className={'w-[5%] pb-4'}>등록일자</th>
                </tr>
                </thead>
                <tbody>
                {researches.map(research => (
                    <tr key={`${research.no}-research`} className={'font-light border-b'}>
                        <td className={'py-3 w-[5%] text-center'}>{research.no}</td>
                        <td className={'py-3 w-[45%]'}>{research.researchName}</td>
                        <td className={'py-3 pl-4 w-[15%]'}>{research.publishedBy}</td>
                        <td className={'py-3 w-[10%] text-center'}>{research.identificationType}</td>
                        <td className={'py-3 w-[20%] pl-10'}>{research.identification}</td>
                        <td className={'py-3 w-[5%] text-center'}>{research.enrollDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={'w-full flex flex-col gap-5 justify-center items-start sm:hidden'}>
                {researches.map(research => (
                    <div key={`${research.no}-sm-licence`}
                         className={'w-full flex pl-2 flex-col justify-center items-start border-b-2'}>
                        <div className={'text-lg'}>
                            {research.researchName}
                        </div>
                        <div className={'mt-2 flex flex-col gap-1'}>
                            <div className={'text-neutral-600'}>
                                {research.publishedBy}
                            </div>
                            <div className={'flex text-xs gap-2 text-neutral-500'}>
                                <div>
                                    {`${research.identificationType} | ${research.identification}`}
                                </div>
                                <div>
                                    {research.enrollDate}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}