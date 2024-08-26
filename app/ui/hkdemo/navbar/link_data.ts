import {linkForLandingPage, mainLink} from "@/app/ui/hkdemo/navbar/link_types";

export const links: mainLink[] = [
    {
        name: "회사소개",
        eng_name: "about-us",
        sub_link: [
            {
                name: "인사말",
                eng_name: "greeting",
                href: "/about-us/greeting"
            },
            {
                name: "경영이념",
                eng_name: "core_value",
                href: "/about-us/core_value"
            },
            {
                name: "조직구조",
                eng_name: "organization",
                href: "/about-us/organization"
            }, {
                name: "연혁",
                eng_name: "history",
                href: "/about-us/history"
            }
        ]
    },
    {
        name: "사업소개",
        eng_name: "businesses",
        sub_link: [
            {
                name: "사업영역",
                eng_name: "domains",
                href: "/businesses/domains"
            },
            {
                name: "프로젝트",
                eng_name: "projects",
                href: "/businesses/projects"
            }
        ]
    },
    {
        name: "기술개발",
        eng_name: "rnd",
        sub_link: [
            {
                name: "업·면허등록 현황",
                eng_name: "licences",
                href: "/rnd/licences"
            },
            {
                name: "지적재산권",
                eng_name: "ipr_list",
                href: "/rnd/ipr_list"
            },
            {
                name: "연구개발",
                eng_name: "rnds",
                href: "/rnd/rnds"
            }
        ]
    },
    {
        name: "홍보센터",
        eng_name: "pr_center",
        sub_link: [
            {
                name: "CI소개",
                eng_name: "cis",
                href: "/pr_center/cis"
            },
            {
                name: "브로슈어",
                eng_name: "brochures",
                href: "/pr_center/brochures"
            }
        ]
    },
    {
        name: "오시는 길",
        eng_name: "location",
        href: "/location"
    },
    {
        name: "고객센터",
        eng_name: "cs",
        href: "/cs"
    }
    //TODO: 나중에 완성되면 넣는 걸로
    // {
    //     name: "Tools",
    //     href: "/hk-app/tools"
    // }
];

const imagePrefix = '/hkdemo/subpage_images/';
export const linksForLandingPage: linkForLandingPage[] = [
    {
        title: "BUSINESS",
        description: 'HK E&C는 최상의 기술, 다양한 경험으로 건설엔지니어링의 모든 영역의 문제를 해결합니다.',
        sub_link: [
            {
                name: "사업영역",
                eng_name: "domains",
                href: "/businesses/domains",
                mainLinkName: '사업소개',
            },
            {
                name: "프로젝트",
                eng_name: "projects",
                href: "/businesses/projects",
                mainLinkName: '사업소개',
            }
        ],
        bg_URL: `${imagePrefix}businesses.jpg`,
    },
    {
        title: "R&D",
        description: 'HK E&C는 효율성 생산성을 증대시킬 엔지니어링 기술을 연구합니다.',
        sub_link: [
            {
                name: "업·면허등록 현황",
                eng_name: "licences",
                href: "/rnd/licences",
                mainLinkName: '기술개발',
            },
            {
                name: "지적재산권",
                eng_name: "ipr_list",
                href: "/rnd/ipr_list",
                mainLinkName: '기술개발',
            },
            {
                name: "연구개발",
                eng_name: "rnds",
                href: "/rnd/rnds",
                mainLinkName: '기술개발',
            }
        ],
        bg_URL: `${imagePrefix}rnd.jpg`,
    },
    {
        title: "PR CENTER",
        description: 'HK E&C는 사람과 기술로 혁신합니다.',
        sub_link: [
            {
                name: "CI소개",
                eng_name: "cis",
                href: "/pr_center/cis",
                mainLinkName: '홍보센터',
            },
            {
                name: "브로슈어",
                eng_name: "brochures",
                href: "/pr_center/brochures",
                mainLinkName: '홍보센터',
            }
        ],
        bg_URL: `${imagePrefix}pr_center.jpg`,
    }
];

export function findMainLinkWithName(name: string) {
    return links.filter(link => link.eng_name == name)[0];
}