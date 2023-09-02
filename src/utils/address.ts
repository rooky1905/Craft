
export type Address = {
    id: string
    address: string
    city: string
    state: string
    country: string
    pincode: number
}

const address: Array<Address> = [
    {
        id: "1",
        address: "102 - A Sudama Nagar",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
        pincode: 452009
    },
    {
        id: "2",
        address: "102 - A Gumasta Nagar",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
        pincode: 459880
    },
    {
        id: "3",
        address: "H-768 Sector 21",
        city: "Noida",
        state: "Uttar Pradesh",
        country: "India",
        pincode: 122003
    },
]

async function getAddress(success: boolean){
    return new Promise((resolve, reject) => {
        if(success){
            setTimeout(() => {
                resolve(address)
            }, 2000)
        }else{
            setTimeout(() => {
                reject("Error fetching address for user.")
            }, 3000)
        }
    })
}

export default getAddress
