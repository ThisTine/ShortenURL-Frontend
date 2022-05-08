import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Box, ChakraProvider,Container,extendTheme, Heading, HStack } from '@chakra-ui/react';
import ModalContextProvider from './contexts/ModalContextProvider';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
}

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 3,
              transformOrigin: 'left top'
            },
          },
        },
      },
    },
  },
})

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ModalContextProvider>
      <Box bg="white" shadow={"md"} h={16} pos="fixed" w="100%" >
        <Container w="100%" maxW={{md:"100%",lg:"90%"}} h="100%" d="flex" alignItems={"center"}>
          <HStack>
          <Heading size="md" as="a" href="https://thistine.com" fontWeight={"bold"}>Thistine</Heading>
          </HStack>
        </Container>
      </Box>
    <App />
    </ModalContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
