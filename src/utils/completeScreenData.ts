async function getCompleteScreenData(success: boolean){
    return new Promise((resolve, reject) => {
        if(success){
            setTimeout(() => {
                resolve(true)
            }, 2000)
        }else{
            setTimeout(() => {
                reject(false)
            }, 3000)
        }
    })
}

export default getCompleteScreenData