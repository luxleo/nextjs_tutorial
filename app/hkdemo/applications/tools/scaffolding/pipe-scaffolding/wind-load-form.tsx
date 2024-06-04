import {useWindLoadFormStore} from "@/app/hkdemo/applications/tools/scaffolding/pipe-scaffolding/wind-load-form-store";

export default function WindLoadFormContainer() {
    const toggleModalOn = useWindLoadFormStore(state => state.toggleModalOn);
    return (
        <div className={'w-full h-[100vh] fixed top-0 left-0 flex flex-col justify-center items-center bg-black bg-opacity-40'}
        onClick={toggleModalOn}>
            <WindLoadForm/>
        </div>
    )
};

function WindLoadForm() {
    return (
        <div className={'w-[1000px] py-10 px-10 bg-white flex flex-col relative h-[80vh] overflow-y-scroll'} onClick={e => e.stopPropagation()}>
            <div className={'text-2xl font-semibold mb-10'}>
                풍하중 설정
            </div>
            <div>

            </div>
        </div>
    )
}