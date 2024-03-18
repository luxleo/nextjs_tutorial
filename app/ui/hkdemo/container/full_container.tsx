import {ReactNode} from "react";

export default function FullContainer({children}:{
    children: ReactNode
}) {
    return (
        <div className={'w-full px-[10%]'}>
            {children}
        </div>
    );
};