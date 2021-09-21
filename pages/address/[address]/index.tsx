import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {WalletContext} from '../../../context/WalletContext'
import {useOpenseaApi} from '../../../hooks/useOpenseaApi'
import {
  useContext
} from 'react'

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
    <div>
      {JSON.stringify(response)}
    </div>
  )
}

export default Assets
