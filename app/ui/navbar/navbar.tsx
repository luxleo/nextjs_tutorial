import Image from "next/image";

import {lusitana} from "@/app/ui/fonts";
import Link from "next/link";

export default function NavBar() {
    return (
        <div className={"mx-auto flex justify-between w-full max-w-7xl px-4 py-5 text-sm"}>
            {/*left side*/}
            <section className={"flex items-center gap-10"}>
                <Image src={"/hk_log.png"} alt={"company logo"} width={120} height={60}/>
                <div className={'flex items-center gap-4'}>
                    <Link href={''} className={'group px-2 py-3 relative'}>
                        <p className={'cursor-pointer flex items-center gap-2 text-neutral-500 group-hover:text-black'}>
                            <span>Features</span>
                        </p>
                        <div className={'absolute left-0 top-10 hidden flex-col group-hover:flex shadow-md rounded-lg'}>
                            Hello
                        </div>
                    </Link>
                </div>
            </section>

            {/* right side*/}
            <section className={"flex items-center gap-8"}>
                <button className={`h-fit text-neutral-500 text-xl hover:text-black font-bold ${lusitana.className} transition-all duration-500`}>
                    Login
                </button>
                <button className={`py-2 px-4 border rounded-lg border-neutral-500 text-neutral-500 text-xl hover:border-black hover:text-black ${lusitana.className}`}>
                    Register
                </button>
            </section>
        </div>
    );
};