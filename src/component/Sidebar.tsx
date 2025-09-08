import  React, { useEffect, useState } from 'react'
import { useFilter } from './FilterContext';

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}

const Sidebar = () => {
    const {
         searchQuery,
        setsearchQuery,
        selectedCategory,
        setselectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeyword
    } = useFilter()


    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "fashion",
        "trends",
        "shoes",
        "shirt",
    ]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://dummyjson.com/products"
                );
                //    data:FetchResponse is an interface in typescript 

                const data:FetchResponse = await response.json();
                console.log(data)
               const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));

                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    } , []);
    const handleMinPriceChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value):undefined)
    }

    const handleMaxPriceChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value):undefined)
    }

    const handleRadioChangeCategories = (category: string)=> {
        setselectedCategory(category)
    };

    const handleKeywordClick =(keyword:string)=>{
        setKeyword(keyword)
    }

    const handleResetFilters = ()=>{
        setsearchQuery("")
        setselectedCategory('')
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword('')
        setTimeout(() => setKeyword(''), 0);
    }

  return (
    <div className='w-64 p-5 h-screen'>
      <h1 className="text-2xll font-bold mb-10 mt-4"> React Store</h1>
      <section>
        <input type="text"
        className='border-2 rounded px-2 py-3 w-full sm:mb-0'
        placeholder='Search product'
        value={searchQuery} 
        onChange={e => setsearchQuery(e.target.value)}/>

        <div className="flex justify-center mt-3 items-center">
            <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder='Min'
            value={minPrice ?? ""}
              onChange={handleMinPriceChange}/>
             <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder='Max'
             value={maxPrice ?? ""} 
             onChange={handleMaxPriceChange}/>
        </div>

        <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Categories

            </h2>
        </div> 
        <section>

        {
            categories.map((category, index) => (
                <label key={index} className=" block mb-3">
                    <input type="radio" name="category" value={category} 
                    onChange={()=>handleRadioChangeCategories(category)}
                    className="mr-2 w-[16x] h-[16px]" 
                    checked={selectedCategory=== category}
                    />
                    {category.toUpperCase()}
                </label>
            ))
        }

        </section>
        {/* keyword sections */}
<div className="mb-5 mt-4">
    <h2 className="text-xl font-semibold mb-3">Keywords</h2>
    <div>
        {
            keywords.map((keyword, index) => (
                <button key={index}
                onClick= {()=>handleKeywordClick(keyword) }
                 className="block cursor-pointer mb-2 py-2 w-full text-left border rounded hover:bg-gray-200 px-4">
                    {keyword.toUpperCase()}
                </button>
            ))
        }
    </div>
</div>
         <button onClick={handleResetFilters}
         className='bg-black cursor-pointer text-white w-full mb-[4rem] py-2 rounded mt-5'>Reset Filter</button>
      </section>
    </div>
  )
}

export default Sidebar
