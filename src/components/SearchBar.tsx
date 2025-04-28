import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({onClickSearch, searchQuery}: {
    onClickSearch: (value: string) => void,
    searchQuery: string
}) {
    const [searchInput, setSearchInput] = useState(searchQuery)
    return <div className="mb-6 mt-2 md:mt-4 md:mb-6">
        <div className="flex justify-center items-center w-10/12  rounded border-slate-500 border-2 mx-auto md:w-7/12">
            <div className="p-2">
                <FaSearch className="" />
            </div>
            <input type="text"  value = {searchInput} onChange={e => setSearchInput(e.target.value)} className="py-1 px-2 outline-none w-full text-slate-900 font-semibold" placeholder="Search..." />
            <button className="block text-white bg-slate-700 px-2 border-l-0 rounded py-0.5 m-1 lg:py-1.5 lg:px-2 cursor-pointer" onClick={() => {
                onClickSearch(searchInput)
            }}>
                search
            </button>
        </div>
    </div>
}