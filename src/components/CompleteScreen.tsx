import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/store';
import { CircularProgress } from '@mui/material';
import getCompleteScreenData from '../utils/completeScreenData';

const CompleteScreen: React.FC = observer(() => {
  const centralStore = store
  const [success, setSuccess] = useState<boolean | null>(null);
  
  useEffect(() => {
    async function fetchProducts(){
        try{
            const data = await getCompleteScreenData(true);
            setSuccess(data as boolean);
        }catch(err){
            setSuccess(err as boolean)
        }
    }
    fetchProducts()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <h2 className="text-xl text-white font-semibold mb-4">Confirmation</h2>
      {success !== null ? 
        <div className='flex flex-row mx-40 my-10'>
            {success ? <h1 className='text-white text-xl'>Success!</h1> :
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-white text-xl'>Failed</h1>
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