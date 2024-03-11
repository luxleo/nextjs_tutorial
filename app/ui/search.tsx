'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useSearchParams,usePathname, useRouter} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParam = useSearchParams();
    const {replace} = useRouter();
    const pathName = usePathname();
    function handlerSearch(term: string) {
        const params = new URLSearchParams(searchParam);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathName}?${params.toString()}`);
    }

    const handleSearch = useDebouncedCallback((term) => {
        let params = new URLSearchParams(searchParam);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {


            params.delete('query');
        }
        replace(`${pathName}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            {/* sharing 되었을때 search param 인풋 필드와 맞춰주기 위해서 defaultValue를 이용해준다.*/}
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    // handlerSearch(e.target.value);
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParam.get('query')?.toString()}
            />
            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
        </div>
    );
}
