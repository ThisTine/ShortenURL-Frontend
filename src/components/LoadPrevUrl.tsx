import { VStack, Box, Heading, Text, HStack } from "@chakra-ui/react"
import { useContext } from "react"
import { urlContext } from "../contexts/UrlsContextProvider"
import PrevUrlComponents from "./PrevUrlComponents"

const LoadPrevUrl = ()=>{
    const {urls} = useContext(urlContext)
    return(
        <VStack pt={10} w="100%" alignItems={"flex-start"}>
            {urls.map(item=><PrevUrlComponents {...item}/>)}
            
          </VStack>
    )
}

export default LoadPrevUrl