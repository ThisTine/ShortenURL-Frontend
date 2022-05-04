import axios from "axios";
import { useCallback } from "react";

export const useAxios = ()=> useCallback(
    ()=>{
        const instance = axios.create({
            baseURL: process.env.NODE_ENV === "production" ? "https://s.thistine.com" : "http://localhost:8000",
            withCredentials: true,
            
        })
        return instance
    },
  [],
)
