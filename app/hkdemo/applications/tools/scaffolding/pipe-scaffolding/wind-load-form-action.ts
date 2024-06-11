'use server';

import {windLoadValue} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form";

/**
 * kN/m^2 의 단위로 풍하중 반환한다.
 * @param windLoadValue
 */
export async function calcWindLoad(windLoadValue: windLoadValue) {
    const Vz = windLoadValue.defaultVelocity * getKzr(windLoadValue) * getKzt(windLoadValue) * windLoadValue.importanceCoefficient;
    const Qz = 0.5 * 1.22 * Math.pow(Vz, 2);
    console.log(`Vz : ${Vz}`);
    console.log(`Qz : ${Qz}`);
    console.log(`Cf : ${getWindForceEfficient(windLoadValue)}`);
    const result =  Qz * getGF(windLoadValue) * getWindForceEfficient(windLoadValue);
    return Math.round(result) / 1000;
}

/**
 * 풍속고도분포계수를 소수 세자리 정밀도로 반환한다.
 * @param windLoadValue
 */
function getKzr(windLoadValue: windLoadValue) {
    const surfaceRougnessData = {
        'A': {coef: 0.22, zb: 20, zg: 550, a: 0.33, minKzr: 0.58},
        'B': {coef: 0.45, zb: 15, zg: 450, a: 0.22, minKzr: 0.81},
        'C': {coef: 0.71, zb: 10, zg: 350, a: 0.15, minKzr: 1.0},
        'D': {coef: 0.98, zb: 5, zg: 250, a: 0.1,   minKzr: 1.13},
    };
    const target = surfaceRougnessData[windLoadValue.surfaceRoughness];
    const height = windLoadValue.panelInfo.height ? windLoadValue.panelInfo.height : windLoadValue.panelInfo.length;
    if(height<= target.zb) return target.minKzr;

    return Math.round(target.coef * Math.pow(height,target.a) * 1000) / 1000;
}

/**
 * 지형계수를 지형타입에 따라 반환한다.
 * @param windLoadValue
 */
function getKzt(windLoadValue: windLoadValue) {
    if(windLoadValue.terrainType === 'flat land') return 1;
    else throw new Error('not yet');
}

/**
 * 거스트 영향계수를 지표조도구분에 따라 반환한다.
 * @param windLoadValue
 */
function getGF(windLoadValue: windLoadValue) {
    switch (windLoadValue.surfaceRoughness) {
        case "A":
            return 2.5;
        case "B":
            return 2.2;
        case "C":
            return 1.9;
        case "D":
            return 1.8;
    }
}

/**
 * 풍력계수를 반환한다.
 * @param windLoadValue
 */
function getWindForceEfficient(windLoadValue: windLoadValue) {
    return (0.11 + 0.09 * getGamma(windLoadValue) + 0.945 * getDefaultWindForceEfficient(windLoadValue) * getR(windLoadValue)) * getF(windLoadValue);
}

/**
 * 풍력 저감계수를 보호망이 설치된 타입에 따라 반환한다.
 * @param windLoadValue
 */
function getGamma(windLoadValue: windLoadValue) {
    const panelLocation = windLoadValue.panelLocation;
    if(panelLocation === 'back') return 1 - windLoadValue.solidityRatio;
    return 0;
}

/**
 * 기본 풍력계수 C0를 충실률을 이용한 직선보간법으로 계산한다.
 * @param windLoadValue
 */
function getDefaultWindForceEfficient(windLoadValue : windLoadValue) {
    const solidityRatio = windLoadValue.solidityRatio;
    if(solidityRatio>1) throw new Error('solidity ratio should less than 1');
    let x1: number;
    let x2: number;
    let y1: number;
    let y2: number;

    if(solidityRatio < 0.1) return 0.1;
    else if (0.1 <=  solidityRatio && solidityRatio < 0.3) {
        x1 = 0.1;
        x2 = 0.3;
        y1 = 0.1;
        y2 = 0.5;
    } else if (0.3 <= solidityRatio && solidityRatio < 0.5) {
        x1 = 0.3;
        x2 = 0.5;
        y1 = 0.5;
        y2 = 1.2;
    } else if (0.5 <= solidityRatio && solidityRatio < 0.7) {
        x1 = 0.5;
        x2 = 0.7;
        y1 = 1.2;
        y2 = 1.6;
    } else {
        x1 = 0.7;
        x2 = 1.0;
        y1 = 1.6;
        y2 = 2.0;
    }
    console.log(`C0 = ${(y2 - y1) / (x2 - x1) * (solidityRatio - x1) + y1}`)
    return (y2 - y1) / (x2 - x1) * (solidityRatio - x1) + y1;
}

/**
 * 가시설물의 형상보조계수를 반환한다.
 */
function getR(windLoadValue: windLoadValue) {
    if (windLoadValue.panelType === 'above'){
        const l = windLoadValue.panelInfo.width;
        const h = windLoadValue.panelInfo.length;

        if(l/h <= 1.5) return 0.6;
        else if(l/h >= 59) return 1;

        return 0.5813 + 0.013*(l / h) - 0.0001 * Math.pow((l / h), 2);
    }else{
        const l = windLoadValue.panelInfo.width;
        const H = windLoadValue.panelInfo.length;

        if(2*H/l <= 1.5) return 0.6;
        else if(2*H/l >= 59) return 1;

        return 0.5813 + 0.013*(2*H/l) - 0.0001 * Math.pow((2*H/l), 2);
    }
}

/**
 * 비계 설치 방법과 충실률에 따라 비계 보정계수 (F)를 반환한다.
 * 이때 scaffoldingSupportType 의 값인 1-6은 windLoadForm 에 기재된 순서를 따른다.
 * @param windLoadValue
 */
function getF(windLoadValue: windLoadValue) {
    const solidityRatio = windLoadValue.solidityRatio;
    const scaffoldingSupportType = windLoadValue.scaffoldingSupportType;

    switch (scaffoldingSupportType) {
        case 1:
            return 1;
        case 2:
            return 1 + 0.31 * solidityRatio;
        case 3:
            return -1;
        case 4:
            return -1 + 0.23 * solidityRatio;
        case 5:
            return -1 + 0.38 * solidityRatio;
        case 6:
            return 1;
    }
}