import NavBar from "@/app/ui/navbar/navbar";

export default function LayOut({children}:
                                   {children: React.ReactNode}) {
    return (
        <div>
            <NavBar/>
            {children}
        </div>
    )
};