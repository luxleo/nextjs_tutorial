export type mainLink = {
    name: string;
    sub_link?: subLink[];
    href?: string;
}
export type subLink = {
    name: string;
    href: string;
}

// subpage link types
export type pageMainLink = mainLink & {imageURL: string};

export type linkForLandingPage = {
    title:
        | 'BUSINESS'
        | 'R&D'
        | 'PR CENTER';
    description: string;
    sub_link  : (subLink & {mainLinkName: string;})[];
    bg_URL: string;
}
