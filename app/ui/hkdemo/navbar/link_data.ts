import {mainLink} from "@/app/ui/hkdemo/navbar/link_types";

export const links : mainLink[] = [
    {
        name: "회사소개",
        sub_link: [
            {
                name: "비전",
                href: "/hkdemo/company_info/vision"
            },
            {
                name: "History",
                href: "/hkdemo/company_info/history"
            },
            {
                name: "Peoples",
                href: "/hkdemo/company_info/peoples"
            }
        ]},
    {
        name: "사업소개",
        sub_link: [
            {
                name: "사업영역",
                href: "/hkdemo/business_info/business_domain"
            },
            {
                name: "프로젝트",
                href: "/hkdemo/business_info/project"
            }
        ]},
    {
        name: "기술 / 특허",
        sub_link:[]
    },
    {
        name: "test1",
        sub_link:[]
    },
    {
        name: "test2",
        sub_link:[]
    },
]