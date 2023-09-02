
export type Product = {
    id: string
    name: string
    price: number
    discount: number
}

const products: Array<Product> = [
    {
        id: "1",
        name: "MacBook Air",
        price: 100000,
        discount: 10
    },
    {
        id: "2",
        name: "MacBook Pro",
        price: 200000,
        discount: 12
    },
    {
        id: "3",
        name: "iPhone 14",
        price: 80000,
        discount: 23
    },
    {
        id: "4",
        name: "Sony TV",
        price: 50000,
        discount: 8
    },
    {
        id: "5",
        name: "Samsung Monitor",
        price: 20000,
        discount: 5
    },
]

async function getProducts(success: boolean){
    return new Promise((resolve, reject) => {
        if(success){
            setTimeout(() => {
                resolve(products)
            }, 3000)
        }else{
            setTimeout(() => {
                reject("Error fetching products.")
            }, 3000)
        }
    })
}

export default getProducts
