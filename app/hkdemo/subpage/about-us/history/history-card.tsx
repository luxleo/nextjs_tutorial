'use client';
import {motion} from "framer-motion";
import {historyData} from "@/app/hkdemo/subpage/about-us/history/history_data";

export default function HistoryBigCard({year,action}: historyData) {
    return (
        <div
            className={'w-full flex'}>
            <motion.div
                initial={{opacity: 0.5, x: -50}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{ once: true }}
                transition={{
                    ease: 'easeOut',
                    duration: 0.6,
                }}
                className={'text-hkred basis-0 grow flex justify-end text-[2.5rem] pr-20 border-r-2 border-neutral-400'}>
                {year}
            </motion.div>
            <motion.ul
                initial={{opacity: 0.5, x: 50}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{ once: true }}
                transition={{
                    ease: 'easeOut',
                    duration: 0.6,
                }}
                className={'basis-0 grow-[2] flex flex-col text-[1.2rem] gap-y-4 items-start pl-16'}>
                    {action.map((el,idx)=>(
                        <li key={`${idx}-${year}`} className={''}>
                            - {el}
                        </li>
                    ))}
            </motion.ul>
        </div>
    )
};