import {
  FunctionComponent,
  useContext
} from 'react'
import { Box, Image, Button } from "@chakra-ui/react"
import type {IAssetObjectInterface} from '../hooks/useOpenseaApi'
import { Link } from "@chakra-ui/react"
import { LinkIcon } from '@chakra-ui/icons'
import { LineContext } from '../context/LineContext'

const AssetCard: FunctionComponent<IAssetObjectInterface> = (props) => {
  const {
    connectLine,
    liffConnector
  } = useContext(LineContext)
  const handleShare = async () => {
    if (!liffConnector.current || !liffConnector.current.isLoggedIn()) {
      await connectLine()
    }
    if (!liffConnector.current) {
      return
    }
    const userProfile = await liffConnector.current.getProfile()
    await liffConnector.current.shareTargetPicker([
      {
        "type": "flex",
        "altText": `${userProfile.displayName} share his NFT called "${props.name}" with you.`,
        "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": props.collection.image_url,
                "size": "full",
                "aspectMode": "cover",
                "aspectRatio": "2:3",
                "gravity": "top"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "LINE",
                        "flex": 0,
                        "margin": "xs",
                        "size": "sm",
                        "color": "#ffffff",
                        "weight": "bold",
                        "style": "normal",
                        "decoration": "none"
                      }
                    ],
                    "backgroundColor": "#06C755",
                    "cornerRadius": "5px",
                    "paddingAll": "6px",
                    "paddingTop": "2px",
                    "position": "relative"
                  }
                ],
                "cornerRadius": "5px",
                "spacing": "md",
                "margin": "none",
                "alignItems": "center",
                "position": "absolute",
                "borderWidth": "light",
                "height": "30px",
                "offsetTop": "18px",
                "offsetBottom": "0px",
                "offsetStart": "18px",
                "paddingAll": "2px"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": props.name,
                        "size": "xl",
                        "color": "#ffffff",
                        "weight": "bold"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": props.collection.description,
                        "color": "#ffffffcc",
                        "gravity": "bottom",
                        "flex": 0,
                        "size": "sm"
                      }
                    ],
                    "spacing": "lg"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "filler"
                          },
                          {
                            "type": "text",
                            "text": "Go to NFT Market",
                            "color": "#ffffff",
                            "flex": 0,
                            "offsetTop": "-2px"
                          },
                          {
                            "type": "filler"
                          }
                        ],
                        "spacing": "sm",
                        "action": {
                          "type": "uri",
                          "label": "action",
                          "uri": props.permalink
                        }
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "borderWidth": "1px",
                    "cornerRadius": "4px",
                    "spacing": "sm",
                    "borderColor": "#ffffff",
                    "margin": "xxl",
                    "height": "40px"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "filler"
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                          {
                            "type": "filler"
                          },
                          {
                            "type": "text",
                            "text": "Visit My Assets",
                            "color": "#ffffff",
                            "flex": 0,
                            "offsetTop": "-2px"
                          },
                          {
                            "type": "filler"
                          }
                        ],
                        "spacing": "sm",
                        "action": {
                          "type": "uri",
                          "label": "action",
                          "uri": "https://liff.line.me/1653830667-Yry3y97j"
                        }
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "borderWidth": "1px",
                    "cornerRadius": "4px",
                    "spacing": "sm",
                    "borderColor": "#ffffff",
                    "backgroundColor": "#9ffd0261",
                    "margin": "md",
                    "height": "40px"
                  }
                ],
                "position": "absolute",
                "offsetBottom": "0px",
                "offsetStart": "0px",
                "offsetEnd": "0px",
                "backgroundColor": "#03303Acc",
                "paddingAll": "20px",
                "paddingTop": "18px"
              }
            ],
            "paddingAll": "0px"
          }
        }
      }
    ])
  }
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
