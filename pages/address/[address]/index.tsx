import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {WalletContext} from '../../../context/WalletContext'
import {useOpenseaApi} from '../../../hooks/useOpenseaApi'
import {
  useContext
} from 'react'
import AssetCard from '../../../components/AssetCard'
import { Container } from "@chakra-ui/react"

const Assets: NextPage = () => {
  const router = useRouter()
  const { address } = router.query
  const { accounts } = useContext(WalletContext)
  const { response } = useOpenseaApi({
    url: '/assets',
    method: 'get',
    body: {
      owner: address,
      // owner: accounts[0],
      order_direction: 'desc',
      offset: 0,
      limit: 20
    }
  })

  return (
    <Container centerContent>
      {response && response.assets.map(asset => {
        return (
          <AssetCard {...asset} key={asset.token_id}/>
        )
      })}
    </Container>
  )
}

export default Assets
