export default function getLocalStorageUrl(){
    let data:{url:string,shorturl:string}[] = []
    let ids:string[] = []
    const items = JSON.parse(localStorage.getItem("urls") || "[]")
    if(Array.isArray(items)){
        items.forEach(item=>{
            if(item.shorturl && !ids.includes(item.shorturl)){
                data.push(item)
                ids.push(item.shorturl)
            }
        })
    }
    return items
}