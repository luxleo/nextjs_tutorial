import '@/app/ui/global.css'
import {inter, notoSansKr} from "@/app/ui/fonts";
import {Metadata} from "next";
import NavBar from "@/app/ui/hkdemo/navbar/navbar";
import Footer from "@/app/ui/hkdemo/footer/footer";

declare global {
  interface Window {
    kakao: any;
  }
}

export const metadata : Metadata = {
  title: {
    template: "%s | HK E&C",
    default: "HK E&C"
  },
  description: "next js tutorial project",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.className} antialiased `}>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
