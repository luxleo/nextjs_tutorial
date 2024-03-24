import clsx from "clsx";
import React, {Dispatch, SetStateAction, useState} from "react";

export type business_category = {
    category_name: string;
    category_id: number;
    domains: business_domain[];
}

export type business_domain = {
    domain_name: string;
    domain_id: number;
}

const filter_buttons :business_category[] = [
    {
        category_name: '토목사업',
        category_id: 1,
        domains: [
            {
                domain_name: '구조부',
                domain_id: 101
            },
            {
                domain_name: '지반부',
                domain_id: 102
            },
            {
                domain_name: '설계부',
                domain_id: 103
            },
            {
                domain_name: '수자원부',
                domain_id: 104
            },
            {
                domain_name: '조경부',
                domain_id: 105
            },
            {
                domain_name: '상하수도부',
                domain_id: 106
            },
        ]
    },
    {
        category_name: '국토사업',
        category_id: 2,
        domains: [
            {
                domain_name: '도시계획부',
                domain_id: 201
            },
            {
                domain_name: '개발사업부',
                domain_id: 202
            },
            {
                domain_name: '교통계획부',
                domain_id: 203
            },
        ]
    },
    {
        category_name: '진단사업',
        category_id: 3,
        domains: [
            {
                domain_name: '안전진단부',
                domain_id: 301
            },
            {
                domain_name: '계측부',
                domain_id: 302
            },
        ]
    },
    {
        category_name: '건설관리',
        category_id: 4,
        domains: [
            {
                domain_name: '감리사업부',
                domain_id: 401
            },
        ]
    },
]

//LEARN: 체크박스에 포커스시 생기는 테두리 => focus:ring-0로 제거한다.

export default function FilterNavBar({setToggleImage}:{
    setToggleImage : Dispatch<SetStateAction<boolean>>
}) {
    return (
        <div className={'w-full flex flex-col'}>
            <div className={'text-lg font-semibold text-red-600'}>
                프로젝트 분류
            </div>
            {filter_buttons.map(category=>(
                <div key={category.category_id} className={'text-md text-black'}>
                    <CustomInput categoryId={category.category_id+''} labelHtmlFor={category.category_id+''} labelContent={category.category_name} isDomain={false} setToggleImage={setToggleImage}/>
                    {category.domains.map(domain=>(
                        <div key={domain.domain_id}>
                                 <CustomInput categoryId={domain.domain_id+''} labelHtmlFor={domain.domain_id+''} labelContent={domain.domain_name} isDomain={true} setToggleImage={setToggleImage}/>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
};

function CustomInput({categoryId, labelHtmlFor, labelContent,isDomain,setToggleImage
                     }:{
    categoryId: string;
    labelHtmlFor: string;
    labelContent: string;
    isDomain: boolean;
    setToggleImage: Dispatch<SetStateAction<boolean>>;
}) {
    return(
        <>
            <input type={'checkbox'}
                   className={clsx('appearance-none w-5 h-5 bg-neutral-100 mr-2 border-0 focus:ring-0 checked:bg-red-400 checked:text-red-400',{
                       'ml-4': isDomain,
                   })}
                   id={categoryId}
                   onChange={()=>{
                       setToggleImage(prev => !prev);
                   }}
            />
            <label htmlFor={labelHtmlFor} className={clsx('',{
                'font-semibold text-black' : !isDomain,
                'font-light font-neutral-400' : isDomain
            })}>{labelContent}</label>
        </>
    )
}