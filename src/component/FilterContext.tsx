import  { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface FilterContextType {
    searchQuery: string;
    setsearchQuery: (query: string) => void;
    selectedCategory: string;
    setselectedCategory: (category: string) => void;
    minPrice: number | undefined;
    setMinPrice: (price: number | undefined) => void;
    maxPrice: number | undefined;
    setMaxPrice: (price: number | undefined) => void;
    keyword : string;
    setKeyword : (keyword:string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider: React.FC<{children:ReactNode}>=({
    children,
})=>{
    const [searchQuery, setsearchQuery] = useState<string>('')
    const [selectedCategory, setselectedCategory] = useState<string>('')
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
    const [keyword, setKeyword] = useState<string>('')

    return ( <FilterContext.Provider value={{
        searchQuery,
        setsearchQuery,
        selectedCategory,
        setselectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword
    }}> 
        {children}
    </FilterContext.Provider>
    );
    
}

export const useFilter = () =>{
    const context = useContext(FilterContext)
    if( context === undefined ){
        throw new Error("useFilter must be used within a filterProvider");
    }
    return context
}