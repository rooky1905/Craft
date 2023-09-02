import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const FinalPrice: React.FC = observer(() => {
  const centralStore = store
  console.log(centralStore.productListSelected)
  const products = Array.from(centralStore.productListSelected.values())
  const prodIdQuantity = centralStore.quantityProductId
  
  const whiteStyle = {color: 'white'}

  function calculateFinalPrice() {
    let price = products.reduce((acc, product) => {
        acc += (prodIdQuantity.get(product.id) ?? 1) * (product.price - Math.floor(product.price * product.discount / 100))
        return acc
    }, 0)
    return price
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-xl text-white font-semibold mb-2">Final Price</h2>
      <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={whiteStyle}>Product Name</TableCell>
                    <TableCell style={whiteStyle}>Price</TableCell>
                    <TableCell style={whiteStyle}>Discount</TableCell>
                    <TableCell style={whiteStyle}>Quantity</TableCell>
                    <TableCell style={whiteStyle}>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products && products.map((product) => 
                    <TableRow>
                        <TableCell style={whiteStyle}>{product.name}</TableCell>
                        <TableCell style={whiteStyle}>{product.price}</TableCell>
                        <TableCell style={whiteStyle}>{product.discount}%</TableCell>
                        <TableCell style={whiteStyle}>{prodIdQuantity.get(product.id)}</TableCell>
                        <TableCell style={whiteStyle}>{(prodIdQuantity.get(product.id) ?? 1) * (product.price - Math.floor(product.price * product.discount / 100))}</TableCell>
                    </TableRow>
                )}
                <TableRow>
                        <TableCell style={{...whiteStyle,  fontWeight: 'bold'}}>Final Price</TableCell>
                        <TableCell style={whiteStyle}></TableCell>
                        <TableCell style={whiteStyle}></TableCell>
                        <TableCell style={whiteStyle}></TableCell>
                        <TableCell style={{...whiteStyle,  fontWeight: 'bold'}}>{calculateFinalPrice()}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
      <div className='flex flex-row mt-2'>
        <button
            className="bg-blue-500 mx-4 text-white px-4 mt-2 py-2 rounded-md"
            onClick={() => centralStore.previousStep()}
        >
            Back
        </button>
        <button
            className="bg-blue-500 text-white px-4 mt-2 py-2 rounded-md"
            onClick={() => centralStore.nextStep()}
        >
            Submit
        </button>
      </div>
    </div>
  );
});

export default FinalPrice;