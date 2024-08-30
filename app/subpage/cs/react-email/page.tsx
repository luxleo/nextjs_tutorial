import {Template} from "@/app/subpage/cs/react-email/Template";

export default function Page() {
    return (
        <div className={'w-full flex justify-center items-center'}>
            <Template verification_code={'kiki'}/>
        </div>
    )
};