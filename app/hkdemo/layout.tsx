import NavBar from "@/app/ui/hkdemo/navbar/navbar";
import Footer from "@/app/ui/hkdemo/footer/footer";

declare global {
    interface Window {
        kakao: any;
    }
}

export default function LayOut({children}:
                                   {children: React.ReactNode}) {
    return (
        <div className={"w-full"}>
            <NavBar/>
            {children}
            <Footer/>
        </div>
    );
};