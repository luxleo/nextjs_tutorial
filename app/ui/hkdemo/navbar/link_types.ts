export type mainLink = {
    name: string;
    sub_link?: subLink[];
}
export type subLink = {
    name: string;
    href: string;
}
