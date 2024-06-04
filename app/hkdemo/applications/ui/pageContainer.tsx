import React from "react";

export default function PageContainer({children}:{
    children: React.ReactNode
}) {
    return (
        <div className={'w-full pl-12 py-5'}>
            {children}
        </div>
    )
};