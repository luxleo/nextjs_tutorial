export default function SectionTitle({title}:{
    title: string
}) {
    return (
        <div className={'w-full flex items-center text-2xl md:text-3xl mb-6'}>
            <TitleIcon/> <span className={'pl-2 text-inherit font-bold'}>{title}</span>
        </div>
    )
};

function TitleIcon() {
    return (
        <div className={'flex items-center justify-center bg-[#ff1919] w-6 h-6 rounded-br-lg rounded-tl-lg'}>
            <div className={'bg-white w-4 h-4'}></div>
        </div>
    )
}