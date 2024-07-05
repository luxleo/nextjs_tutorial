import HeroContainer from "@/app/(overview)/hero-container";
import {Suspense} from "react";

export default function Page() {

    return (
        <div className={'w-full'}>
            <Suspense>
                <HeroContainer/>
            </Suspense>
        </div>
    );
};