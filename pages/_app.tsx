
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {WalletContextProvider} from '../context/WalletContext'
import {LineContextProvider} from '../context/LineContext'

import type { AppProps } from 'next/app'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WalletContextProvider>
        <LineContextProvider>
          <Component {...pageProps} />
        </LineContextProvider>
      </WalletContextProvider>
    </ChakraProvider>
  )
}
export default App
