export type shorturltype = {url:string,shorturl:string}[]

export default function getLocalStorageUrl(insert?:{shorturl:string,url:string}){
    let data:shorturltype = []
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
    return data
}