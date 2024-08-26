export default function CommonContainer({children}:{
    children: React.ReactNode;
}) {
    return (
        <section className={'w-full px-[5%] sm:px-[10%] mb-20'}>
            {children}
        </section>
    )
};