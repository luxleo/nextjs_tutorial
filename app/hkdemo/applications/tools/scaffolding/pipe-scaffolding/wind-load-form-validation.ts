'use server';

import {z} from "zod";
import {windLoadValue} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form";

export type windLoadFormErrorState = {
    message?: string | null;
    errors? : {
        defaultVelocity?: string[];
        panelInfo?: string[];
        solidityRatio?: string[];
    }
}

const WindLoadFormSchema = z.object({
    defaultVelocity: z.coerce
        .number()
        .min(1, '기본풍속은 0m/s 이상의 값 입니다.'),
    panelInfo: z.object({
        width: z.coerce.number(),
        length: z.coerce.number(),
        height: z.coerce.number().optional(),
    }),
    solidityRatio: z.coerce
        .number()
        .min(0, '충실률은 0이상 입니다.')
        .max(1, '충실률은 1이하 입니다.'),
});

export async function isWindLoadFormInValid(windLoadValue: windLoadValue) {
    const {defaultVelocity, panelInfo, solidityRatio} = windLoadValue;
    const validatedData = WindLoadFormSchema.safeParse({defaultVelocity, panelInfo, solidityRatio});

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: "에러가 있다."
        }
    }
    return false;
}