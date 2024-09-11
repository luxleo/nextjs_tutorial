import '@/app/ui/global.css'
import { notoSansKr} from "@/app/ui/fonts";
import {Metadata} from "next";
import NavBar from "@/app/ui/hkdemo/navbar/navbar";
import Footer from "@/app/ui/hkdemo/footer/footer";
import {GoogleAnalytics} from '@next/third-parties/google';

declare global {
  interface Window {
    kakao: any;
  }
}

export const metadata: Metadata = {
  title: {
    template: "%s | HK E&C",
    default: "(주)에이치케이이앤씨 HK E&C"
  },
  description: "one of top civil engineering company"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.className} antialiased`}>
        <NavBar/>
        <section className={'min-h-[calc(100vh-25vh)] md:min-h-[calc(100vh-20vh)]'}>
          {children}
        </section>
        <Footer/>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GAID as string}/>
    </html>
  );
}
