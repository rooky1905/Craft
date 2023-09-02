import { makeAutoObservable } from 'mobx';
import { Product } from '../utils/products';
import { Address } from '../utils/address';

class Store {
  currStep = 1;
  error: string | null = null;
  productListSelected: Map<string, Product> = new Map()
  quantityProductId: Map<string, number> = new Map()
  address: Address | null = null

  constructor() {
    makeAutoObservable(this);
  }

  nextStep() {
    this.currStep += 1;
    this.error = null;
  }

  previousStep() {
    this.currStep -= 1;
    this.error = null;
  }

  reset(){
    this.currStep = 1;
    this.error = null;
    this.productListSelected = new Map();
    this.quantityProductId = new Map();
    this.address = null;
  }

  private initOrIncrementCount(id: string){
    if(this.quantityProductId.has(id) && this.quantityProductId.get(id)){
        const existingCount = this.quantityProductId.get(id);
        existingCount && this.quantityProductId.set(id, existingCount + 1)
    }else{
        this.quantityProductId.set(id, 1)
    }
  }

  addProduct(product: Product){
    this.productListSelected.set(product.id, product);
    this.initOrIncrementCount(product.id);
  }

  private decrementCount(id: string){
    if(this.quantityProductId.has(id)){
        const existingCount = this.quantityProductId.get(id);
        existingCount && existingCount > 0 && this.quantityProductId.set(id, existingCount - 1)
        if(existingCount === 1){
            return true
        }
    }
    return false
  }

  deleteProduct(product: Product){
    const removeFromSet = this.decrementCount(product.id);
    if(removeFromSet){
        this.productListSelected.delete(product.id);
    }
  }

  addAddress(address: Address){
    this.address = address;
  }

  setError(error: string) {
    this.error = error;
  }
}

const store = new Store();
export default store;