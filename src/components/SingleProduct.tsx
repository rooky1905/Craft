import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/store';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Product } from '../utils/products';

interface SingleProductProps {
  product: Product
  error: boolean
}

const SingleProduct: React.FC<SingleProductProps> = observer(({product, error}) => {
  const centralStore = store
  const quantity = centralStore.quantityProductId.get(product.id) ?? 0

  if(error){
    throw new Error('This is an error getting a single product.')
  }

  return (
    <Card className={`w-40 m-2 ${quantity > 0 && "box-border border-2 border-blue-400"}`}>
      <CardContent>
        <div className='flex flex-col items-center text-center justify-center'>
          <Typography variant="h5" component="div" className='h-20'>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" className='flex flex-col'>
            ₹ {product.price - Math.floor(product.price * product.discount / 100)}
            <span className='text-xs'><span className='line-through'>₹{product.price}</span> (<span className='font-semibold'>{product.discount}%</span> off)</span>
          </Typography>
        </div>
        <div className='flex flex-row items-center mt-3 justify-center'>
          <IconButton onClick={() => centralStore.deleteProduct(product)} color="primary">
            <RemoveIcon />
          </IconButton>
          <span className='border border-black p-2'>{quantity}</span>
          <IconButton onClick={() => centralStore.addProduct(product)} color="primary">
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
});

export default SingleProduct;