import React, { useState } from "react"
import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    VStack,
    Heading,
    useColorMode,
    IconButton,
} from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import server from "../utils/server"

const Summarizer = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [url, setUrl] = useState("")
    const [bulletPoints, setBulletPoints] = useState([])
    const [fullSummary, setFullSummary] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        setBulletPoints([])
        setFullSummary("")
        // Call your API to get the video, bullet-points summary, and the whole summary
        console.log(url)
        const result1 = await server.post("/bulletpoint", { url: url })
        setBulletPoints(result1.data)
        const result2 = await server.post("/full", { bulletpoint: result1.data })
        setFullSummary(result2.data)
        setIsLoading(false)
    }

    return (
        <Box minH="100vh" bg={colorMode === "light" ? "gray.50" : "gray.800"}>
            <Flex direction="column" justifyContent="center" alignItems="center" p={5}>
                <Heading as="h1" size="lg">
                    YouTube Video Summarizer
                </Heading>
                <IconButton
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                />
                <Box p={5}>
                    <iframe
                        title="YouTube Video"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${url.split("v=")[1]}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </Box>
                <Box w="50%">
                    <Input
                        placeholder="Enter YouTube video URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button
                        w="100%"
                        mt={4}
                        colorScheme="teal"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        loadingText={
                            bulletPoints.length == 0
                                ? "Fetching Bullet-Summary"
                                : "Fetching Full Summary"
                        }
                    >
                        Summarize Video
                    </Button>
                </Box>

                <Box w="70%" p={5}>
                    <Text fontSize="xl" fontWeight="bold">
                        Bullet Points
                    </Text>
                    <VStack alignItems="start" spacing={2}>
                        {bulletPoints.length != 0 &&
                            bulletPoints?.map((point, index) => (
                                <Text key={index}>&bull; {point}</Text>
                            ))}
                    </VStack>
                </Box>
                <Box w="70%" p={5}>
                    <Text fontSize="xl" fontWeight="bold">
                        Full Summary
                    </Text>
                    <Text>{fullSummary}</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default Summarizer
