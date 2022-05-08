export default function getLocalStorageUrl(insert?:{shorturl:string,url:string}){
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
    if(insert && !ids.includes(insert.shorturl)){
        data.push(insert)
    }
    return items
}