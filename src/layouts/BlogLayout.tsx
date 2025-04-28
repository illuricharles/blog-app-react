import React from "react"
import SearchBar from "../components/SearchBar";

export default function BlogLayout({ title, children, prevPage, nextPage, totalPages, currentPage, showSearchBar, onClickSearch, searchQuery }: {
    title: string,
    children: React.ReactNode,
    prevPage: () => void,
    nextPage: () => void,
    totalPages: number,
    currentPage: number,
    showSearchBar: boolean
    onClickSearch: (value: string) => void,
    searchQuery: string

}) {
    return <div className="mt-2 px-4 py-3 lg:max-w-11/12 lg:m-auto xl:max-w-10/12 min-h-screen">
        {showSearchBar && <SearchBar onClickSearch={onClickSearch} searchQuery={searchQuery} />}
        <h1 className="font-semibold text-slate-700 mb-2 md:text-lg xl:text-xl xl:mb-4">{title}</h1>
        <hr className="text-slate-300" />
        <div className="mt-3 md:grid md:grid-cols-3 md:mb-3 lg:gap-y-2 xl:gap-x-2">
            {children}
        </div>
        {(currentPage <= totalPages) && <div className="px-5 flex justify-between items-center md:text-lg mb-6 mt-3 lg:text-xl">
            {currentPage !== 1 ? <PaginationButton onClick={() => prevPage()} >Prev</PaginationButton> : <div></div>}
            {currentPage !== totalPages ? <PaginationButton onClick={() => nextPage()}>Next</PaginationButton> : <div></div>}
        </div>}
    </div>
}

function PaginationButton({ children, onClick }: {
    children: React.ReactNode,
    onClick: () => void
}) {
    return <button onClick={onClick} className="bg-slate-900 text-white px-5 py-0.5 rounded cursor-pointer">
        {children}
    </button>
}
