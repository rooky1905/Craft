import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/store';
import getProducts, { Product } from '../utils/products';
import { CircularProgress } from '@mui/material';
import SingleProduct from './SingleProduct';

interface ProductSelectProps {
  success: boolean
}

const ProductSelect: React.FC<ProductSelectProps> = observer(({ success }) => {
  const centralStore = store
  const [products, setProducts] = useState<Array<Product>>()
  const [error, setError] = useState('')
  const disabled = Array.from(centralStore.productListSelected.keys()).length > 0

  useEffect(() => {
    async function fetchProducts(){
        try{
            const data = await getProducts(success);
            setProducts(data as Array<Product>);
        }catch(err){
            setError(err as string)
        }
    }
    fetchProducts()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-xl text-white font-semibold mb-4">Add Products</h2>
      {products ? 
        <div className='flex flex-row'>
            {products.map((product) => {
                return <SingleProduct key={product.id} product={product}/>
            })}
        </div> :
        !error ? 
            <div className='flex justify-center mx-40 my-10'>
                <CircularProgress />
            </div> : 
            <h1 className='flex justify-center mx-40 my-10 text-white'>{error}</h1>
      }
      <button
        className={`bg-blue-500 text-white px-4 mt-2 py-2 rounded-md ${ (!disabled || !products) && "bg-gray-400"}`}
        onClick={() => centralStore.nextStep()}
        disabled={!disabled || !products}
      >
        Continue
      </button>
    </div>
  );
});

export default ProductSelect;