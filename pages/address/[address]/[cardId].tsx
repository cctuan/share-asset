import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Card: NextPage = (obj) => {
  console.log(obj)
  const router = useRouter()
  const { cardId } = router.query
  return (
    <div>
      {cardId}
    </div>
  )
}

export default Card
