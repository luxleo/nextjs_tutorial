import NavBar from "@/app/ui/hkdemo/navbar/navbar";

export default function LayOut({children}:
                                   {children: React.ReactNode}) {
    return (
        <div className={"w-full"}>
            <NavBar/>
            {children}
        </div>
    )
};