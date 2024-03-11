'use server';
import {z} from 'zod';
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoice = FormSchema.omit({id:true, date: true});
export async function createInvoice(formData: FormData) {
    const rawFormData = {
        customerId: formData.get("customerId"),
        amount: formData.get('amount'),
        status: formData.get('status')
    }
    // 만일 필드가 많은 경우에는 entries로 할당 받는다.
    //const rawFormData1 = Object.fromEntries(formData.entries());
    console.log(rawFormData);
    //console.log(rawFormData1);
    const {customerId, amount, status} = CreateInvoice.parse(rawFormData);
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
            SET customer_id=${customerId}, amount=${amount},status=${status}
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

