// import type { NextComponentType } from 'next'
import {FunctionComponent} from 'react'
import { Box, Image, Button } from "@chakra-ui/react"
import type {IAssetObjectInterface} from '../hooks/useOpenseaApi'
import { Link } from "@chakra-ui/react"
import { LinkIcon } from '@chakra-ui/icons'

const AssetCard: FunctionComponent<IAssetObjectInterface> = (props) => {
  const handleShare = () => {}
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Link href={props.permalink} isExternal>
        <Image src={props.image_url} fallbackSrc="https://via.placeholder.com/450" />
      </Link>
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.name}
        </Box>
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          <Button colorScheme="teal" variant="solid" leftIcon={<LinkIcon />} onClick={handleShare}>
            Share
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AssetCard
