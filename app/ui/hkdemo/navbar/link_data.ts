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
                name: "회사 연혁",
                href: "/hkdemo/company_info/history"
            },
            {
                name: "조직도",
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
        name: "기술개발",
        sub_link:[
            {
                name: "기술",
                href: "/hkdemo/business_info/techs"
            },
            {
                name: "면허",
                href: "/hkdemo/business_info/licenses"
            }
        ]
    },
    {
        name: "홍보센터",
        sub_link:[
            {
                name: "tests1",
                href: "/hkdemo/business_info/tests1"
            },
            {
                name: "tests12",
                href: "/hkdemo/business_info/tests1-2"
            }
        ]
    },
    {
        name: "테스트2",
        sub_link:[
            {
                name: "test2",
                href: "/hkdemo/business_info/test2"
            },
            {
                name: "tests2-2",
                href: "/hkdemo/business_info/tests2-2"
            },
            {
                name: "tests2-3",
                href: "/hkdemo/business_info/tests2-3"
            },
            {
                name: "tests2-4",
                href: "/hkdemo/business_info/tests2-4"
            },
            {
                name: "tests2-5",
                href: "/hkdemo/business_info/tests2-5"
            }
        ]
    },
]