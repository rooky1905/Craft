import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/store';
import { CircularProgress } from '@mui/material';
import getCompleteScreenData from '../utils/completeScreenData';

interface CompleteScreenProps {
  successFun: boolean
}


const CompleteScreen: React.FC<CompleteScreenProps> = observer(({successFun}) => {
  const centralStore = store
  const [success, setSuccess] = useState<boolean | null>(null);
  
  useEffect(() => {
    async function fetchProducts(){
        try{
            const data = await getCompleteScreenData(successFun);
            setSuccess(data as boolean);
        }catch(err){
            setSuccess(err as boolean)
        }
    }
    fetchProducts()
  }, [successFun])

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-xl text-white font-semibold mb-4">Confirmation</h2>
      {success !== null ? 
        <div className='flex flex-row mx-40 my-10'>
            {success ? <h1 className='text-white text-xl'>Order Placed Successfully!</h1> :
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-white text-xl'>Sorry your order could not be placed.</h1>
                    <button
                        className="bg-blue-500 text-white px-4 mt-2 py-2 rounded-md"
                        onClick={() => centralStore.reset()}
                    >
                    Retry
                </button>
              </div>
            }
        </div> :
        <div className='flex justify-center mx-40 my-10'>
                <CircularProgress />
        </div>
      }
    </div>
  );
});

export default CompleteScreen;