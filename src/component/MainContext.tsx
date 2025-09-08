import  { useEffect, useState } from 'react'
import { useFilter } from './FilterContext'
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContext = () => {
    const { searchQuery, selectedCategory, minPrice, maxPrice, keyword,  } = useFilter()

    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const itemsPerPage = 12;

    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage} `;

        if (keyword) {
            url = `https://dummyjson.com/products/search?q=${keyword}`
        }

        axios.get(url)
            .then((response) => {
                setProducts(response.data.products);
                console.log(response.data.products)
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });

    }, [currentPage, keyword,selectedCategory]);

    const getFilteredProducts = () => {
        let filteredProducts = products
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === selectedCategory
            );
        }
        if (minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(
                (product) => product.price >= minPrice
            );
        }
        if (maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(
                product => product.price <= maxPrice
            );
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(
                (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        switch (filter) {
            case 'cheap':
                return filteredProducts.sort((a, b) => a.price - b.price);

            case 'expensive':
                return filteredProducts.sort((a, b) => b.price - a.price);

            case 'popular':
                return filteredProducts.sort((a, b) => b.rating - a.rating);
            default:
                return filteredProducts

        }

    };

    const filteredProducts = getFilteredProducts();
    console.log(filteredProducts)

    const totalProducts = 100;

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
};


    const getPaginationButtons = () => {
        const buttons: number[] = []; // Initialize an empty array to store numbers [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if(currentPage -2 < 1){
            endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
        }

         if(currentPage + 2 > totalPages){
            startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
        }

        for(let page = startPage; page <= endPage; page++){
            buttons.push(page);
        }
        return buttons;
    }; 

    return (
        <section className='xl:w-[40rem] mr-[12px] lg:w-[30rem] sm:w-[30rem] xs:w-[20rem] p-5 '>
            <div className='mb-5'>
                <div className='flex flex-col sm:flex-row items-center justify-between'>
                    <div className="relative mb-5 mt-5">
                        <button onClick={() => setDropDownOpen(!dropDownOpen)} className="border px-4 py-2 rounded-full flex items-center">
                            <Tally3 className="mr-2" />

                            {
                                filter === 'all' ? 'Filter' : filter.charAt(0).toLowerCase() + filter.slice(1)
                            }
                        </button>
                        {
                            dropDownOpen && (
                                <div className="absolute mt-2 sm:w-40 w-full bg-white border border-gray-300 rounded shadow">
                                    <button onClick={() => setFilter('cheap')} className="block px-4 hover:bg-gray-200 py-2 w-full text-left">
                                        Cheap
                                    </button>
                                    <button onClick={() => setFilter('expensive')} className="block px-4 hover:bg-gray-200 py-2 w-full text-left">
                                        Expensive
                                    </button>
                                    <button onClick={() => setFilter('popular')} className="block px-4 hover:bg-gray-200 py-2 w-full text-left">
                                        Popular
                                    </button>

                                </div>
                            )}
                    </div>

                </div>

                <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5'>
                    {filteredProducts.map((product) => (
                        <BookCard key={product.id} id={product.id} title={product.title} image={product.thumbnail}
                            price={product.price} />
                    ))}
                </div>

                         <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                             {/* previous */}
                            {/* since it is a previous page it has to be less than the current page */}
                            <button onClick={()=> handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1} 
                            className=" cursor-pointer border px-4 py-2 rounded-full">
                                Previous
                            </button>
                                {/* 1,2,3,4,5 */}
                            <div className="flex flex-wrap justify-center">
                               {getPaginationButtons().map((page) => (
  <button
    key={page}
    onClick={() => handlePageChange(page)}
    className={`border cursor-pointer px-4 py-2 rounded-full mx-1 transition duration-200 ${
      page === currentPage
        ? 'bg-black text-white'
        : 'hover:bg-gray-200'
    }`}
  >
    {page}
  </button>
))}

                            </div>

                            <button onClick={()=> handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages} 
                            className=" cursor-pointer border px-4 py-2 rounded-full">
                                Next
                            </button>
                         </div>
            </div>
        </section>
    )
}

export default MainContext
