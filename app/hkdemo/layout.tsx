import NavBar from "@/app/ui/hkdemo/navbar/navbar";
import Script from "next/script";
import Footer from "@/app/ui/hkdemo/footer/footer";

declare global {
    interface Window {
        kakao: any;
    }
}

export default function LayOut({children}:
                                   {children: React.ReactNode}) {
    return (
        <html lang={'ko'}>
        <body>
        <Script
            strategy={'beforeInteractive'}
            src={"//dapi.kakao.com/v2/maps/sdk.js?appkey=5cdc9e5bc1a550b285e02c4f77d5cd5f&autoload=false&libraries=services"}
        />
        <div className={"w-full"}>
            <NavBar/>
            {children}
            <Footer/>
        </div>
        </body>
        </html>

    )
};