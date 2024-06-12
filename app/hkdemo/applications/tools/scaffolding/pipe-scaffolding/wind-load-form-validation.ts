'use server';

import {z} from "zod";
import {windLoadValue} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form";

export type windLoadFormErrorState = {
    message?: string | null;
    errors? : {
        defaultVelocity?: string[];
        width?: string[];
        length?: string[];
        height?: string[];
        solidityRatio?: string[];
    }
}

const WindLoadFormSchema = z.object({
    defaultVelocity: z.coerce
        .number()
        .min(1, '기본풍속은 0m/s 이상의 값 입니다.'),
    width: z.coerce.number().min(0.01, '너비는 0 이상의 값 이어야합니다.'),
    length: z.coerce.number().min(0.01, '길이는 0 이상의 값 이어야합니다.'),
    height: z.coerce.number().min(0.01,"높이는 0 이상의 값 이어야합니다.").optional(),
    solidityRatio: z.coerce
        .number()
        .min(0, '충실률은 0이상 입니다.')
        .max(1, '충실률은 1이하 입니다.'),
});

export async function isWindLoadFormInValid(windLoadValue: windLoadValue) {
    const {defaultVelocity, solidityRatio} = windLoadValue;
    const {width,length,height} = windLoadValue.panelInfo;
    const validatedData = WindLoadFormSchema.safeParse({defaultVelocity, width,length,height ,solidityRatio});

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: "입력값을 다시 확인해주세요."
        }
    }
    return false;
}