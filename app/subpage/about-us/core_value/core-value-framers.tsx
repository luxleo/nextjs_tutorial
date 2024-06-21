'use client';
import {motion} from "framer-motion";

export const ShareValue = ()=>{
    return (
        <motion.div
            initial={{opacity: 0.5, x: -50}}
            whileInView={{opacity: 1, x: 0}}
            transition={{
                ease: 'easeOut',
                duration: 1,
            }}
            className={'w-full absolute -top-[140px] left-0 z-50 px-[5%] sm:px-[10%]'}>
            <div className={'w-full h-[280px] md:w-[500px] md:h-[280px] shadow-md bg-white inline-block p-5'}>
                <div className={'text-[1.5rem] sm:text-[2.3rem] pb-3'}>공유가치</div>
                <br/>
                <span className={'py-1 pl-3 text-[1.1rem] sm:text-[1.2rem]'}>신뢰</span><br/>
                <span className={'py-1 pl-3 text-[1.1rem] sm:text-[1.2rem]'}>능력</span><br/>
                <span className={'py-1 pl-3 text-[1.1rem] sm:text-[1.2rem]'}>성과</span><br/>
                <span className={'py-1 pl-3 text-[1.1rem] sm:text-[1.2rem]'}>혁신</span><br/>
                <span className={'py-1 pl-3 text-[1.1rem] sm:text-[1.2rem]'}>공동체</span><br/>
            </div>
        </motion.div>
    )
}