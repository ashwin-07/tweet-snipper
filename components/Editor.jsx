import Preview from '../components/Preview'
import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react"
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { LinkIcon } from '@chakra-ui/icons'
import Options from './Options'
import { useState, useRef } from 'react'

const Editor = ({ tweetDetails, loading, error }) => {

    const [bgColour, setBgColour] = useState("black")
    const [fgOpacity, setFgOpacity] = useState(6)
    const [showTime, setShowTime] = useState(true)
    const [showMetrics, setShowMetrics] = useState(true)
    const [showSource, setShowSource] = useState(true)
    const previewRef = useRef(null)

    const downloadImage = async (format) => {

        const fileName = tweetDetails ? tweetDetails.data.id : "tweet-snipper-export";
        const element = previewRef.current
        const scale = 2

        let dataUrl = null;

        const imageOptions = {
            height: element.offsetHeight * scale,
            width: element.offsetWidth * scale,
            quality: 1,
            style: {
                transform: 'scale(2)',
                transformOrigin: 'top left',
            }
        }

        switch (format) {
            case 'png':
                dataUrl = await domtoimage.toPng(element, imageOptions)
                saveAs(dataUrl, `${fileName}.${format}`)
                return

            case 'jpeg':
                dataUrl = await domtoimage.toJpeg(element, imageOptions)
                saveAs(dataUrl, `${fileName}.${format}`)
                return

            case 'svg':
                dataUrl = await domtoimage.toSvg(element, imageOptions)
                saveAs(dataUrl, `${fileName}.${format}`)
                return

        }
    }

    if (error) {
        return (
            <Flex justifyContent='center' alignItems='center' direction="column" minH='40vh'
                color='gray.400' w='60vw'>
                <Text textAlign='center'> 🤕 Something went wrong, please try again later </Text>
            </Flex>
        )
    }

    if (loading) {
        return (
            <Flex justifyContent='center' alignItems='center' direction="column" minH='40vh'
                color='gray.400' w='60vw'>
                <Spinner />
            </Flex>
        )
    }

    if (!tweetDetails) {
        return (
            <Flex justifyContent='center' alignItems='center' direction="column" minH='40vh'
                color='gray.400' w='60vw' >
                <LinkIcon fontSize={{ base: "30px", md: "30px", lg: "30px" }}></LinkIcon>
                <Text fontSize={{ base: "15px", md: "20px", lg: "25px" }}>Paste the tweet link in search box to get started!</Text>
            </Flex>
        )
    }
    
    return (
        <Flex justify='space-between' wrap='wrap' align='center' direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}>
            <Box ref={previewRef} w={{ base: "80vw", md: "50vw", lg: "45vw" }} minH='40vh' my='5' mx='5' background={bgColour} borderRadius="lg">
                <Preview tweetDetails={tweetDetails} bgColour={bgColour} fgOpacity={fgOpacity} showTime={showTime}
                    showMetrics={showMetrics} showSource={showSource} />
            </Box>
            <Box w={{ base: "80vw", md: "50vw", lg: "45vw" }} minH='40vh' my='5' mx='5' borderRadius="lg">
                <Options bgColor={bgColour} setBgColour={setBgColour} fgOpacity={fgOpacity} setFgOpacity={setFgOpacity}
                    showTime={showTime} setShowTime={setShowTime} showMetrics={showMetrics} setShowMetrics={setShowMetrics}
                    showSource={showSource} setShowSource={setShowSource} downloadImage={downloadImage} />
            </Box>
        </Flex>
    )
}

export default Editor;