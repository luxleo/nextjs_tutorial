import {mainLink} from "@/app/ui/hkdemo/navbar/link_types";

export const links : mainLink[] = [
    {
        name: "회사소개",
        sub_link: [
            {
                name: "인사말",
                href: "/hk/about-us/greeting"
            },
            {
                name: "경영이념",
                href: "/hk/about-us/core_value"
            },
            {
                name: "조직구조",
                href: "/hk/about-us/organization"
            },{
                name: "연혁",
                href: "/hk/about-us/history"
            }
        ]},
    {
        name: "사업소개",
        sub_link: [
            {
                name: "사업영역",
                href: "/hk/businesses/domains"
            },
            {
                name: "프로젝트",
                href: "/hk/businesses/projects"
            }
        ]},
    {
        name: "기술개발",
        sub_link:[
            {
                name: "업·면허등록 현황",
                href: "/hk/rnd/licences"
            },
            {
                name: "지적재산권",
                href: "/hk/rnd/ipr_list"
            },
            {
                name: "연구개발",
                href: "/hk/rnd/rnds"
            }
        ]
    },
    {
        name: "홍보센터",
        sub_link:[
            {
                name: "CI소개",
                href: "/hk/pr_center/cis"
            },
            {
                name: "브로슈어",
                href: "/hk/pr_center/brochures"
            }
        ]
    },
    {
        name: "Contact Us",
        sub_link:[
            {
                name: "오시는 길",
                href: "/hk/contact/location"
            },
            {
                name: "문의메일",
                href: "/hk/contact/mail"
            },
        ]
    },
]

export function findMainLinkWithName(name: string) {
    return links.filter(link => link.name == name)[0];
}