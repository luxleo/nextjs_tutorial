import '@/app/ui/global.css'
import {hkDoTum, inter} from "@/app/ui/fonts";
import {Metadata} from "next";

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
      <body className={`${hkDoTum.className} antialiased `}>{children}</body>
    </html>
  );
}
