import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Tooltip, Heading, ModalFooter, Button, useClipboard } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { ModalContext } from "../contexts/ModalContextProvider";

const CopyModal:FC = ()=>{
    const {type,actions,data} = useContext(ModalContext)
    const {hasCopied,onCopy} = useClipboard( (process.env.NODE_ENV === "production" ? "https://s.thistine.com/" : "http://localhost:8000" )+data?.shorturl?.shorturl)

    return(
            <Modal isOpen={type==="copy"} onClose={()=>actions("onclose")} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Here is you shorturl</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={5}>
            <Tooltip isOpen={hasCopied} label="Copied !" bg="green.300" hasArrow size={"lg"}>
            <Heading p={5} bg={hasCopied ? "green.300" :"gray.200"} color={hasCopied? "white" :"black"} rounded={"3xl"} transition={"0.1s"} cursor="pointer" onClick={()=>onCopy()} >s.thistine.com/{data?.shorturl?.shorturl}</Heading>
            </Tooltip>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' onClick={()=>actions("onclose")}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default CopyModal