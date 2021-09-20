import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../layouts/DefaultLayout'
// import ConnectWalletButton from '../components/ConnectWalletButton'
import {WalletContext} from '../context/WalletContext'
import {
  useContext
} from 'react'
const Home: NextPage = () => {
  const {accounts} = useContext(WalletContext)
  return (
    <Layout>
      <Head>
        <title>George Test App</title>
        <meta name="description" content="George Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {accounts}
      </main>
    </Layout>
  )
}

export default Home
