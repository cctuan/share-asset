import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../layouts/DefaultLayout'
import {WalletContext} from '../context/WalletContext'
import Router from 'next/router'
import { Button } from "@chakra-ui/react"
import {
  useContext,
  useEffect
} from 'react'
const Home: NextPage = () => {
  const { isWalletConnected, connectWallet, connector } = useContext(WalletContext)
  useEffect(() => {
    if (isWalletConnected) {
      Router.push('/address/0x495f947276749ce646f68ac8c248420045cb7b5e')
    }
  }, [isWalletConnected])

  const handleConnectWallet = () => {
    if (!isWalletConnected && connector) {
      connectWallet()
      connector.createSession()
    }
  }

  return (
    <Layout>
      <Head>
        <title>George Test App</title>
        <meta name="description" content="George Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Button colorScheme="teal" size="md" onClick={handleConnectWallet}>
        Connect Wallet
      </Button>
      </main>
    </Layout>
  )
}

export default Home
