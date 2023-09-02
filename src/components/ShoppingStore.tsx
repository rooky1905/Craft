import "./tailwind.css";

import React from 'react';
import { observer } from 'mobx-react-lite';

import ProductSelect from "./ProductSelect";
import store from "../store/store";
import AddressSelect from "./AddressSelect";
import FinalPrice from "./FinalPrice";
import CompleteScreen from "./CompleteScreen";

const ShoppingStore: React.FC = observer(() => {
  const centralStore = store

  return (
    <div className="max-h-screen mt-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Welcome to the Store!</h1>
      <div className="mt-10 p-4 bg-[#202124] shadow-md rounded-md">
        {centralStore.currStep === 1 && <ProductSelect success={true} />}
        {centralStore.currStep === 2 && <AddressSelect success={true}/>}
        {centralStore.currStep === 3 && <FinalPrice />}
        {centralStore.currStep === 4 && <CompleteScreen successFun={true} />}
        {centralStore.error && <div className="text-red-500">{centralStore.error}</div>}
      </div>
    </div>
  );
});

export default ShoppingStore;