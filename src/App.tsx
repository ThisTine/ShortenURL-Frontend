import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import "./index.css";
import { useDebouncedValue, useForm } from "@mantine/hooks";
import { useAxios } from "./hooks/useAxios";
import CardContainer from "./components/CardContainer";
import { ModalContext } from "./contexts/ModalContextProvider";
import LoadPrevUrl from "./components/LoadPrevUrl";
import getLocalStorageUrl from "./functions/getLocalStorageUrl";
import { urlContext } from "./contexts/UrlsContextProvider";
function App() {
  const {actions} = useContext(ModalContext)
  const {refresh} = useContext(urlContext)
  const axios = useAxios();
  const toast = useToast()
  const [isPathchecked, setisPathChecked] = useState(false);
  const [isloadingpath, setisloadingpath] = useState(false);
  const [shorturl,setshorturl] = useState("")
  const form = useForm({
    initialValues: {
      url: "",
      path: "",
    },
  });
  const [path] = useDebouncedValue(form.values.path, 200);
  

  const checkpathCallback = useCallback((path:string)=>{
    const checkpath = async (path: string) => {
      setisloadingpath(true);
      try {
        const isok = await axios().get(`/api/check/${path}`, {
          headers: {},
        });
        setisloadingpath(false);
        setisPathChecked(isok.data.isok);
      } catch (err) {
        setisloadingpath(false);
        setisPathChecked(false);
      }
    }
    
    checkpath(path)

  },[axios])

  useEffect(() => {
    if (path) {
      checkpathCallback(path)
    }
  }, [path,checkpathCallback]);

  const submit = async (values: { url: string; path: string }) => {
    // console.log("test")
    
    try{
      setisloadingpath(true)
     const data = await axios().post("/api/shorten",{url:values.url,path:values.path})
     toast({status:"success",title:"Success"})
     actions({type:"copy",data:{shorturl:data.data}})
    localStorage.setItem("urls",JSON.stringify([...getLocalStorageUrl(),{url:values.url,shorturl:data.data}]))
    refresh()
     setshorturl(data.data)
     form.reset()
     setisloadingpath(false)
    }catch(err){
      toast({status:"error",title:"Failed"})
      setisloadingpath(false)
    }
  };
  return (
    <Center >
      <CardContainer>
        <VStack h="100vh" justifyContent={"center"}>
          <VStack
            as="form"
            onSubmit={form.onSubmit(submit)}
            w={{base:"100%",md:"container.sm",lg:"container.sm"}}
            // w="100%"
            minH="container.sm"
            shadow={"xl"}
            rounded="2xl"
            bg={"white"}
            p={10}
          >
            <Heading alignSelf="start">Short url</Heading>

            <VStack pt={10}>
              <Heading size={"lg"}>
                s.thistine.com/{form.values.path || shorturl || "..."}
              </Heading>
            </VStack>

            <VStack gap={5} pt={10} w="100%">
              <FormControl variant="floating" isRequired>
                <Input
                  {...form.getInputProps("url")}
                  isRequired={true}
                  placeholder=" "
                  size={"lg"}
                />
                <FormLabel>Url</FormLabel>
              </FormControl>

              <FormControl
                variant="floating"
                isInvalid={path !== "" && !isPathchecked}
              >
                <Input
                  {...form.getInputProps("path")}
                  placeholder=" "
                  size={"lg"}
                />
                <FormLabel>Path</FormLabel>
                <FormErrorMessage>this path might be taken</FormErrorMessage>
              </FormControl>
            </VStack>
            <Box flexGrow={1} display="flex" alignItems={"end"} w="100%">
              <Button
                mt={10}
                type="submit"
                disabled={
                  !form.values.url ||
                  (form.values.path !== "" && !isPathchecked) ||
                  isloadingpath
                }
                isLoading={isloadingpath}
                colorScheme="purple"
                size="lg"
                w="100%"
              >
                Shorten
              </Button>
            </Box>
          </VStack>
          <LoadPrevUrl/>
        </VStack>
      </CardContainer>
    </Center>
  );
}

export default App;
