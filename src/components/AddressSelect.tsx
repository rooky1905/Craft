import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/store';
import { CircularProgress } from '@mui/material';
import getAddress, { Address } from '../utils/address';
import SingleAddress from './SingleAddress';

interface AddressSelectProps {
  success: boolean
}


const AddressSelect: React.FC<AddressSelectProps> = observer(({success}) => {
  const centralStore = store
  const [address, setAddress] = useState<Array<Address>>();
  const [error, setError] = useState('')
  const selectedAddress = centralStore.address

  useEffect(() => {
    async function fetchAddress(){
        try{
            const data = await getAddress(success);
            setAddress(data as Array<Address>);
        }catch(err){
            setError(err as string)
        }
    }
    fetchAddress()
  }, [success])

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-xl text-white font-semibold mb-4">Select a delivery address</h2>
      {address ? 
        <div className='flex flex-row'>
            {address.map((address) => {
                return <SingleAddress key={address.id} address={address} selected={address.id === selectedAddress?.id}/>
            })}
        </div> :
        !error ? 
            <div className='flex justify-center mx-40 my-10'>
                <CircularProgress />
            </div> : 
            <h1 className='flex justify-center mx-40 my-10 text-white'>{error}</h1>
      }
      <div className='flex flex-row'>
        <button
            className={`bg-blue-500 mx-4 text-white px-4 mt-2 py-2 rounded-md ${ !address && "bg-gray-400"}`}
            onClick={() => centralStore.previousStep()}
            disabled={!address}
        >
            Back
        </button>
        <button
            className={`bg-blue-500 text-white px-4 mt-2 py-2 rounded-md ${ (selectedAddress == null || !address) && "bg-gray-400"}`}
            onClick={() => centralStore.nextStep()}
            disabled={selectedAddress == null || !address}
        >
            Continue
        </button>
      </div>
    </div>
  );
});

export default AddressSelect;