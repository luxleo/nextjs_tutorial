export type ResearchProjectInfo = {
    no: number;
    researchName: string;
    ProjectOwner: string;
    duration: string;
    note: string;
};

export const researchProjects : ResearchProjectInfo[] = [
    {
        no: 1,
        researchName: '단지 내 토목시설물 내진설계지침 개선 연구',
        ProjectOwner: 'LH',
        duration: '-',
        note: '공동수행( 대한토목학회)'
    },
    {
        no: 2,
        researchName: '내진보강용 경량패널 제작',
        ProjectOwner: '국토교통부',
        duration: '-',
        note: '공동수행( 국토교통인프라 지진방재연구센터)'
    },
    {
        no: 3,
        researchName: 'SRD 전단보강재의 성능비교검증',
        ProjectOwner: '현대건설',
        duration: '-',
        note: '공동수행( (주)세종알앤디)'
    }
]