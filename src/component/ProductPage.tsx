import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    images: string[];
    price: number;
    description: string;
    rating: number;
}

const ProductPage = () => {
    const {id} = useParams<{id:string}>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);


    useEffect(() => {
        if(id){
            axios.get<Product>(`https://dummyjson.com/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((err) => console.error(`Error fetching product: ${err}`));
        }
    }, [id]);

    if(!product){
        return <h1>Loading...</h1>
    }
  return (
    <div className='p-5 w-[60%]'>
        <button onClick={() => navigate(-1)}
        className='bg-black text-white mb-5 px-4 py-2 rounded'>Back</button>
        <img src={product.images[0]} alt="" />
        <h1 className='text-2xl mb-4 font-bold'>{product.title}</h1>
        <p className='mb-4 text-gray-700 w-[60%]'>{product.description}</p>
        <div className="flex">
            <p>${product.price}</p>
            <p className="ml-10">Rating: {product.rating}</p>

        </div>
        


      
    </div>
  )
}

export default ProductPage
