import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    FormControl,
    FormLabel,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from "@chakra-ui/react";
import { TriangleDownIcon } from '@chakra-ui/icons'

const Options = ({ bgColour, setBgColour, fgOpacity, setFgOpacity, showTime,
    setShowTime, showMetrics, setShowMetrics, showSource, setShowSource, downloadImage }) => {

    const backgroundColours = [
        'black', '#1497d9', '#14d947'
    ]

    return (
        <>
            <FormControl as="fieldset">
                <FormLabel as="legend">Elements</FormLabel>
                <HStack spacing="25px">

                    {/* <Switch id="time" />
                    <FormLabel htmlFor="time" fontWeight="normal">Time</FormLabel> */}
                    <   Switch value="Nagato" isChecked={showTime} onChange={() => setShowTime(!showTime)}>Time</Switch>
                    <Switch value="Nagato" isChecked={showSource} onChange={() => setShowSource(!showSource)}>Source</Switch>
                    <Switch value="Itachi" isChecked={showMetrics} onChange={() => setShowMetrics(!showMetrics)}>Metrics</Switch>
                </HStack>
            </FormControl>

            <Text fontWeight="bold">Background</Text>
            <Flex name='bg' wrap='wrap'>
                {backgroundColours.map(colour => (
                    <IconButton key={colour} style={{ background: colour, width: '29px', height: '29px', marginRight: '1rem', marginBottom: '0.5rem', borderRadius: '5px' }}
                        onClick={() => setBgColour(colour)}>
                    </IconButton>
                ))
                }
            </Flex>

            <Box>
                <Text fontWeight="bold">Foreground Opacity</Text>
                <Slider name='foregroundOpacity' min={1} max={6} maxW="50%" step={1} aria-label="foreground opacity" colorScheme="blue" value={fgOpacity} onChange={(val) => setFgOpacity(val)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>

            <Box>
                <Menu>
                    <MenuButton borderRadius='3px' p='9px' as={Button} rightIcon={< TriangleDownIcon />} colorScheme="blue">
                        Export
                    </MenuButton>
                    <MenuList fontSize='15px'>
                        <MenuItem onClick={() => downloadImage('png')}>PNG</MenuItem>
                        <MenuItem onClick={() => downloadImage('jpeg')}>JPEG</MenuItem>
                        <MenuItem onClick={() => downloadImage('svg')}>SVG</MenuItem>
                    </MenuList>
                </Menu>
            </Box>

        </>
    )
}

export default Options;