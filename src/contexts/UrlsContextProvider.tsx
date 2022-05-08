import { createContext, FC, ReactNode, useLayoutEffect, useState } from "react"
import getLocalStorageUrl, { shorturltype } from "../functions/getLocalStorageUrl"

export const urlContext = createContext<{urls:{url:string,shorturl:string}[],refresh:()=>void}>({urls:[],refresh:()=>{}})
const UrlsContextProvider:FC<{children:ReactNode}> = (props)=>{
    const [urls,seturls] = useState<shorturltype>([])
    const refresh = ()=>{
        seturls(getLocalStorageUrl())
    }
    useLayoutEffect(()=>{
        seturls(getLocalStorageUrl())
    },[seturls])
    return <urlContext.Provider value={{urls,refresh}} {...props} />
}

export default UrlsContextProvider