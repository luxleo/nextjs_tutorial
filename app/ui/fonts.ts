import {Inter, Lusitana, Noto_Sans_KR} from "next/font/google"
import localFont from 'next/font/local';

export const inter = Inter({subsets: ['latin']})
export const lusitana = Lusitana({subsets: ['latin'], weight: "400"})

export const notoSansKr = Noto_Sans_KR({subsets:['latin'], weight: "400"})

export const hkDoTum = localFont({
    src: [
        {
            path: '../fonts/KoPubWorldDotumLight.ttf',
            weight: '100'
        },
    ],
    variable : '--font-dotum'
})