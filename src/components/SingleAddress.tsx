import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/store';
import { Card, CardContent, Typography } from '@mui/material';
import { Address } from '../utils/address';

interface SingleAddressProps {
    address: Address
    selected: boolean
}

const SingleAddress: React.FC<SingleAddressProps> = observer(({address, selected}) => {
  const centralStore = store

  return (
    <Card onClick={()=>{centralStore.addAddress(address)}} className={`w-45 m-2 cursor-pointer ${selected && "box-border border-2 border-blue-400"}`}>
      <CardContent>
        <div className='flex flex-col items-center text-center justify-center'>
          <Typography variant="body1" component="div" className='h-10'>
            {address.address}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {address.city}, {address.state}, {address.country}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {address.pincode}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
});

export default SingleAddress;