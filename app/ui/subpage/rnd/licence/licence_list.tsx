'use client';

import {LicenceInfo, licences} from "@/app/ui/subpage/rnd/licence/licence_dummy_data";
import {Dispatch, SetStateAction, useState} from "react";
import clsx from "clsx";

const pageSize = 6;
function getPagedLicences(pageNum: number,flag:boolean) : LicenceInfo[] {
    if(flag) return licences.sort((a, b) => b.enrollDate.localeCompare(a.enrollDate));;
    const result = licences.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        .sort((a, b) => a.enrollDate.localeCompare(b.enrollDate));
    console.log(result);
    return result;
}
export default function LicenceList() {
    const flag = true;
    const [pagedLicences, setPagedLicences] = useState(getPagedLicences(1,flag));

    return (
        <div className={'w-full'}>
            <div className={'w-full flex flex-col items-center'}>
                <LicenceListContainer pagedLicences={pagedLicences}/>
                <PaginationContainer setPagedLicences={setPagedLicences} flag={flag}/>
            </div>
        </div>
    );
};

function LicenceListContainer({pagedLicences}:{
    pagedLicences: LicenceInfo[]
}) {
    return (
        <div className={'w-[90%] flex justify-center items-center'}>
            <table className={'hidden md:!table w-full'}>
                <thead className={'pb-10'}>
                <tr className={'border-b-2'}>
                    <th scope={'col'} className={'w-[8%] pb-4'}>번호</th>
                    <th scope={'col'} className={'w-[30%] pb-4'}>면허/등록명</th>
                    <th scope={'col'} className={'w-[20%] pb-4'}>발급기관</th>
                    <th scope={'col'} className={'w-[30%] pb-4'}>등록번호</th>
                    <th scope={'col'} className={'w-[12%] pb-4'}>등록일자</th>
                </tr>
                </thead>
                <tbody>
                {pagedLicences.map((licence,idx) => (
                    <tr key={`${idx}-licence`} className={'font-light border-b'}>
                        <td className={'py-3 w-[8%] text-center'}>{idx+1}</td>
                        <td className={'py-3 w-[30%]'}>{licence.licenceName}</td>
                        <td className={'py-3 w-[20%]'}>{licence.publishedBy}</td>
                        <td className={'py-3 w-[30%] pl-10'}>{licence.enrollNumber}</td>
                        <td className={'py-3 w-[12%] text-center'}>{licence.enrollDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={'w-full flex flex-col gap-5 justify-center items-start md:hidden'}>
                {pagedLicences.map((licence,idx) => (
                    <div key={`${idx}-sm-licence`}
                         className={'w-full flex pl-2 flex-col justify-center items-start border-b-2'}>
                        <div className={'text-lg'}>
                            {licence.licenceName}
                        </div>
                        <div className={'flex flex-col gap-1'}>
                            <div className={'text-neutral-600'}>
                                {licence.publishedBy}
                            </div>
                            <div className={'flex text-xs gap-2 text-neutral-500'}>
                                <div>
                                    {licence.enrollNumber}
                                </div>
                                <div>
                                    {licence.enrollDate}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PaginationContainer({setPagedLicences, flag}: {
    setPagedLicences: Dispatch<SetStateAction<LicenceInfo[]>>;
    flag: boolean;
}) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalSize = licences.length;
    const remainder = totalSize % pageSize;
    const totalPage = remainder == 0? totalSize / pageSize : (totalSize / pageSize)+1;
    const pageArray = Array.from({length: totalPage}, (v, i) => i + 1);

    return (
        <div className={clsx('flex gap-1 mt-6 md:hover:cursor-pointer',{
            'hidden' : flag
        })}>
            {pageArray.map(pageNum => (
                <div key={`${pageNum}-pg`} className={clsx('w-7 h-7  text-sm flex items-center justify-center font-light',
                    {
                        'bg-neutral-400 text-white': currentPage == pageNum,
                        'bg-neutral-200 text-neutral-600': currentPage != pageNum
                    })}
                     onClick={()=>{
                         setPagedLicences(getPagedLicences(pageNum,flag));
                         setCurrentPage(pageNum);
                     }}
                >
                    {pageNum}
                </div>
            ))}
        </div>
    );
}