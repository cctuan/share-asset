
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {WalletContextProvider} from '../context/WalletContext'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ChakraProvider>
  )
}
export default App
