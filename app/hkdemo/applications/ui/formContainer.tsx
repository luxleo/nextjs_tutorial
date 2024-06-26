import React from "react";

export default function FormContainer({title,children}:{
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className={'w-full flex flex-col'}>
            <div className={'flex w-full items-center pl-4 h-14 text-xl font-bold text-black bg-neutral-200'}>
                {title}
            </div>
            <div className={'pl-4 py-3'}>
                {children}
            </div>
        </div>
    )
};

export function InputLargeTitle({title}:{
    title: string;
}) {

    return (
        <div className={'w-full text-lg font-semibold bg-neutral-100 px-4 py-4'}>
            {title}
        </div>
    )
}

export function InputMiddleTitle({title}:{
    title: string;
}){
    return (
        <div className={'w-full font-semibold my-1'}>
            {title}
        </div>
    )
}