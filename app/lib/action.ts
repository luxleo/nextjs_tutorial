'use server';
import {z} from 'zod';
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";

// const FormSchema = z.object({
//     id: z.string(),
//     customerId: z.string(),
//     amount: z.coerce.number(),
//     status: z.enum(['pending', 'paid']),
//     date: z.string()
// })
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: "Please select a customer"
    }),
    amount: z.coerce.number()
        .gt(0,{message: "please enter a number greater than $0"}),
    status: z.enum(['pending', 'paid'],{
        invalid_type_error: "Please select a invoice status"
    }),
    date: z.string()
})

const CreateInvoice = FormSchema.omit({id:true, date: true});

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
}
export async function createInvoice(prevState: State,formData: FormData) {
    const rawFormData = {
        customerId: formData.get("customerId"),
        amount: formData.get('amount'),
        status: formData.get('status')
    }
    // 만일 필드가 많은 경우에는 entries로 할당 받는다.
    // const rawFormData1 = Object.fromEntries(formData.entries());
    console.log(rawFormData);
    // console.log(rawFormData1);

    // const {customerId, amount, status} = CreateInvoice.parse(rawFormData);

    // safeParse() will return an object containing either a success or error field.
    // This will help handle validation more gracefully without having put this logic inside the try/catch block.
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. failed to create invoice"
        }
    }
    const {customerId, amount, status} = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
        INSERT INTO invoices (customer_id,amount, status, date)
        VALUES (${customerId},${amountInCents},${status},${date})
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({id: true,date:true});
export async function updateInvoice(id: string, formData : FormData){
    const {customerId, amount,status}=UpdateInvoice.parse(Object.fromEntries(formData.entries()));
    const amountInCents = amount * 100;
    await sql`
            UPDATE invoices
            SET customer_id=${customerId}, amount=${amountInCents},status=${status}
            WHERE id=${id}
        `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string){
    throw new Error("Failed to delete invoice");
    try {
        await sql`DELETE FROM invoices where id=${id}`;
        return {message: 'Delete invoice Successfully'};
    }catch (e){
        return {message: 'Database Error : cannot find such invoice'};
    }
    console.log("if error occured this log is invisible");
    revalidatePath('/dashboard/invoices');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
){
    try{
        await signIn('credentials', formData);
    }catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

