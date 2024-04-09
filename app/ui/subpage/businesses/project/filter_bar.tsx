'use client';

import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {departmentProject} from "@/app/lib/hk/domainsData";
import {tempFetchProjectWithinDepartments} from "@/public/hkdemo/data/projects";

export type business_category = {
    category_name: string;
    category_id: number;
    domains: business_domain[];
}

export type business_domain = {
    domain_name: string;
    domain_id: number;
}

const getDomainNameFromDomainId = (domainIds : string[])=>{
    const result = [];
    for (const category of filter_buttons) {
        for (const domain of category.domains) {
            if(domainIds.includes(domain.domain_id+'')) result.push(domain.domain_name);
        }
    }
    return result;
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

export default function FilterNavBar({setToggleImage, setProjects}:{
    setToggleImage: Dispatch<SetStateAction<boolean>>;
    setProjects: Dispatch<SetStateAction<departmentProject[]>>;
}) {
    const [categoryCheckBoxes, setCategoryCheckBoxes] = useState<string[]>([]);
    const [domainCheckBoxes, setDomainCheckBoxes] = useState<string[]>([]);
    const [goodToUpdateDomainCheckBoxes, setGoodToUpdateDomainCheckBoxes] = useState<boolean>(false);
    //TODO: useCallback으로 최적화 해야함 24.04.09
    const updateAndGetProjects = async (domainNames : string[])=>{
        await tempFetchProjectWithinDepartments(domainNames)
            .then(res => {
                setProjects(res);
            });
    }
    useEffect(() => {
        const domainNames = getDomainNameFromDomainId(domainCheckBoxes);
        updateAndGetProjects(domainNames);
    }, [domainCheckBoxes.length]);
    return (
        <div className={'w-full flex flex-col'}>
            <div className={'text-lg font-semibold text-red-600'}>
                프로젝트 분류
            </div>
            {filter_buttons.map(category=>(
                <div key={category.category_id} className={'text-md text-black'}>
                    <CategoryCheckbox categoryId={category.category_id+''} labelHtmlFor={category.category_id+''} labelContent={category.category_name} setCategoryCheckBoxes={setCategoryCheckBoxes}
                                      setDomainCheckBoxes={setDomainCheckBoxes} setToggleImage={setToggleImage}
                                      isInclude={categoryCheckBoxes.includes(category.category_id+'')}/>
                    {category.domains.map(domain=>(
                        <div key={domain.domain_id}>
                                 <DomainCheckBox parentId={category.category_id+''} categoryId={`${domain.domain_id}`} labelHtmlFor={`${domain.domain_id}`} labelContent={domain.domain_name} isInclude={domainCheckBoxes.includes(domain.domain_id+'')} setToggleImage={setToggleImage}
                                                 setCategoryCheckBoxes={setCategoryCheckBoxes}
                                                 setDomainCheckBoxes={setDomainCheckBoxes}/>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
};

function CategoryCheckbox({
                              categoryId,
                              labelHtmlFor,
                              labelContent,
                              setCategoryCheckBoxes,
                              setDomainCheckBoxes,
                              setToggleImage,
                              isInclude
                          }: {
    categoryId: string;
    labelHtmlFor: string;
    labelContent: string;
    setCategoryCheckBoxes: Dispatch<SetStateAction<string[]>>;
    setDomainCheckBoxes: Dispatch<SetStateAction<string[]>>;
    setToggleImage: Dispatch<SetStateAction<boolean>>;
    isInclude: boolean;
}) {
    function onChangeHandler() {
        let flag = false;
        setCategoryCheckBoxes(prev => {
            const temp = [...prev];
            if (temp.includes(categoryId)){
                flag = true;
                return temp.filter(el => el !== categoryId);
            }

            temp.push(categoryId);
            return temp;
        })
        //LEARN: useState 안엥서 useState를 호출할 수가 없네?
        setToggleImage(prev => !prev); //TODO: 임시 이므로 제거할것
        setDomainCheckBoxes(prev=>{
            const targetCategory = filter_buttons.filter(category => category.category_id + '' === categoryId)[0];
            const temp = [...prev];
            if (flag) {
                // toggle 이미 포함되어있는 경우 하위의 모든 도메인 제거한다.
                targetCategory.domains.forEach(domain => {
                    const index = temp.indexOf(domain.domain_id + '');
                    if (index > -1) {
                        temp.splice(index, 1);
                    }
                })
                return temp;
            }

            targetCategory.domains.forEach(domain => {
                temp.push(domain.domain_id + '');
            });

            const tempSet = new Set(temp);
            return Array.from(tempSet);
        })
    }

    return (
        <>
            <input type={'checkbox'}
                   className={'appearance-none w-5 h-5 bg-neutral-100 mr-2 border-0 focus:ring-0 checked:bg-red-400 checked:text-red-400'}
                   id={categoryId}
                   onChange={({target}) => {
                       onChangeHandler();
                   }}
                   checked={isInclude}
            />
            <label htmlFor={labelHtmlFor} className={'font-semibold text-black'}>{labelContent}</label>
        </>
    );
}


function DomainCheckBox({parentId,categoryId, labelHtmlFor, labelContent,isInclude,setToggleImage,setCategoryCheckBoxes,setDomainCheckBoxes
                     }:{
    parentId: string;
    categoryId: string;
    labelHtmlFor: string;
    labelContent: string;
    isInclude: boolean;
    setToggleImage: Dispatch<SetStateAction<boolean>>;
    setCategoryCheckBoxes: Dispatch<SetStateAction<string[]>>;
    setDomainCheckBoxes: Dispatch<SetStateAction<string[]>>;
}) {
    function onChangeHandler(target: EventTarget & HTMLInputElement) {
        setToggleImage(prev => !prev);
        if(!isInclude){
            setDomainCheckBoxes(prev=>{
                const temp = [...prev];
                temp.push(categoryId);
                return temp;
            })
            return;
        }
        setCategoryCheckBoxes(prev=>{
            return [...prev].filter(el => el !== parentId)
        })
        setDomainCheckBoxes(prev=>{
            return [...prev].filter(el => el !== categoryId);
        })

    }
    return (
        <>
            <input type={'checkbox'}
                   className={'appearance-none w-5 h-5 bg-neutral-100 mr-2 border-0 focus:ring-0 checked:bg-red-400 checked:text-red-400 ml-4'}
                   id={categoryId}
                   onChange={({target}) => {
                       onChangeHandler(target);
                   }}
                   checked={isInclude}
            />
            <label htmlFor={labelHtmlFor} className={'font-light font-neutral-400'}>{labelContent}</label>
        </>
    );
}