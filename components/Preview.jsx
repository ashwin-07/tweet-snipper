import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react"
import { format } from "date-fns";
import { Image } from "@chakra-ui/react"
import styles from "../styles/Editor.module.css"

const Preview = ({ tweetDetails, bgColour, fgOpacity, showTime, showMetrics, showSource }) => {

    let tweetText = tweetDetails.data.text;
    const likes = tweetDetails.data.public_metrics.like_count
    const retweets = tweetDetails.data.public_metrics.retweet_count
    const createdTime = new Date(tweetDetails.data.created_at)
    const author = tweetDetails.includes.users[0].name
    const username = tweetDetails.includes.users[0].username
    const profileImage = tweetDetails.includes.users[0].profile_image_url
    const isVerified = tweetDetails.includes.users[0].verified
    const source = tweetDetails.data.source

    const foreGroundColors = ["whiteAlpha.500", "whiteAlpha.600", "whiteAlpha.700", "whiteAlpha.800", "whiteAlpha.900", "white"]

    const fgColor = foreGroundColors[fgOpacity - 1];

    return (
        <Box d="flex" justifyContent='center' alignItems='center' height="100%">
            <Box m="5" w="70%" background={fgColor} className={styles.tweetContainer}>
                <Box mt="3" className="userDetails" d="flex">
                    <Box className="profilePhoto">
                        <Image src={profileImage} borderRadius="full" boxSize="50px"></Image>
                    </Box>
                    <Box ml="2" className="name" d="flex" flexDirection="column">
                        <Text fontWeight="bold">{author}</Text>
                        <Text color="gray.500">{`@${username}`}</Text>
                    </Box>
                </Box>

                <Box mt="3" fontSize="1 rem" className="tweetBody">
                    {tweetText}
                </Box>

                <Box className="otherDetails" mt="3" d="flex" color="gray.500" >
                    {showTime && <Text>{format(createdTime, 'h:mm a · LLL d, yyyy · ')}</Text>}
                    {showSource && <Text>{source}</Text>}
                </Box>

                <Box mt="3" className="metrics" d="flex">
                    {showMetrics &&
                        (<><Text mr="1" fontWeight="bold">{likes}</Text> <Text>Likes</Text>
                            <Text ml="3" mr="1" fontWeight="bold">{retweets}</Text> <Text>Retweets</Text></>)
                    }
                </Box>

            </Box>
        </Box>
    )
}

export default Preview
