import { ComponentWithAs, Container, ContainerProps } from '@chakra-ui/react'

const CardContainer:ComponentWithAs<"div",ContainerProps> = (props) => {
  return (
    <Container maxW={{base:"100%",lg:"container.lg"}} w="100%" {...props} />
  )
}

export default CardContainer