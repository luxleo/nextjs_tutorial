export type ResearchInfo = {
    no: number;
    researchName: string;
    publishedBy: string;
    identificationType:
    | 'DOI'
    | 'ISSN';
    identification: string;
    enrollDate: string;
};
export const researches : ResearchInfo[] = [
    {
        no:1,
        researchName: 'Strength and pore characteristics of OPC-slag cement paste mixed with polyaluminum chloride',
        publishedBy: 'Construction and Building Materials',
        identificationType:'DOI',
        identification: 'doi:10.1016/j.conbuildmat.2019.07.009',
        enrollDate: '2019'
    },
    {
        no:2,
        researchName: 'Characteristics of Ordinary Portland Cement Using the New Colloidal Nano-Silica Mixing Method',
        publishedBy: ' Applied Sciences',
        identificationType:'DOI',
        identification: 'doi:10.3390/app9204358',
        enrollDate: '2019'
    },
    {
        no:3,
        researchName: 'Investigating the Effects of Polyaluminum Chloride on the Properties of Ordinary Portland Cement',
        publishedBy: 'Materials',
        identificationType:'DOI',
        identification: 'doi:10.3390/ma12203290',
        enrollDate: '2019'
    },
    {
        no:4,
        researchName: '	NaOH와 MgSO4에 대한 슬래그의 강도 특성에 대한 기초 연구 / Basic Research on Strength Properties of Slag mixed with NaOH and MgSO4 / 10. 내구성',
        publishedBy: '한국콘크리트학회',
        identificationType:'ISSN',
        identification: '	1738-298X',
        enrollDate: '2019'
    },
    {
        no:5,
        researchName: 'SRD 전단보강재의 효과 / Effect of SRD Shear Reinforcement / 전단',
        publishedBy: '한국콘크리트학회',
        identificationType:'ISSN',
        identification: '1738-298X',
        enrollDate: '2020'
    }
]
