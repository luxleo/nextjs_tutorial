import HeroContainer from "@/app/(overview)/hero-container";
import {Suspense} from "react";

export default function Page() {

    return (
            <Suspense>
                <HeroContainer/>
            </Suspense>
    );
};