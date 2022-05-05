import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Center,
  Container,
  Heading,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Button,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useClipboard,
  Tooltip,
  FormErrorMessage,
} from "@chakra-ui/react";
import "./index.css";
import { useDebouncedValue, useForm } from "@mantine/hooks";
import { useAxios } from "./hooks/useAxios";
function App() {
  const axios = useAxios();
  const toast = useToast()
  const [isPathchecked, setisPathChecked] = useState(false);
  const [isloadingpath, setisloadingpath] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [shorturl,setshorturl] = useState("")
  const {hasCopied,onCopy} = useClipboard( (process.env.NODE_ENV === "production" ? "https://s.thistine.com/" : "http://localhost:8000" )+shorturl)
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
    try{
      setisloadingpath(true)
     const data = await axios().post("/api/shorten",{url:values.url,path:values.path})
     toast({status:"success",title:"Success"})
     onOpen()
     setshorturl(data.data)
     form.reset()
     setisloadingpath(false)
    }catch(err){
      toast({status:"error",title:"Failed"})
      setisloadingpath(false)
    }
  };
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Here is you shorturl</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={5}>
            <Tooltip isOpen={hasCopied} label="Copied !" bg="green.300" hasArrow size={"lg"}>
            <Heading p={5} bg={hasCopied ? "green.300" :"gray.200"} color={hasCopied? "white" :"black"} rounded={"3xl"} transition={"0.1s"} cursor="pointer" onClick={()=>onCopy()} >s.thistine.com/{shorturl}</Heading>
            </Tooltip>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    <Center bg="#fafafa">
      <Container maxW={{base:"100%",lg:"container.lg"}} w="100%">
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
                colorScheme="teal"
                size="lg"
                w="100%"
              >
                Shorten
              </Button>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Center>
    </>
  );
}

export default App;
