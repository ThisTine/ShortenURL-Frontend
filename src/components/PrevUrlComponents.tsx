import { Box, Heading, Text } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { ModalContext } from "../contexts/ModalContextProvider";

const PrevUrlComponents: FC<{ url: string; shorturl: string }> = ({
  url,
  shorturl,
}) => {
    const {actions} = useContext(ModalContext)
  return (
    <Box
      cursor={"pointer"}
      _hover={{ bg: "gray.300" }}
      transition={"0.25s all"}
      rounded={"lg"}
      bg="white"
      p={5}
      w="100%"
      overflow={"auto"}
      shadow={"md"}
      onClick={()=>actions({type:"copy",data:{shorturl}})}
    >
      {" "}
      <Heading as="h4" size="lg">
        s.thistine.com/{shorturl}
      </Heading>
      <Text fontSize={"2xl"}>{url}</Text>
    </Box>
  );
};

export default PrevUrlComponents;
