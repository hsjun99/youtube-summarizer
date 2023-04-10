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

const Summarizer = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [url, setUrl] = useState("")
    const [video, setVideo] = useState(null)
    const [bulletPoints, setBulletPoints] = useState([])
    const [fullSummary, setFullSummary] = useState("")

    const handleSubmit = async () => {
        // Call your API to get the video, bullet-points summary, and the whole summary
        setVideo("1")
    }

    return (
        <Box minH="100vh" bg={colorMode === "light" ? "gray.50" : "gray.800"}>
            <Flex justifyContent="space-between" alignItems="center" p={5}>
                <Heading as="h1" size="lg">
                    YouTube Video Summarizer
                </Heading>
                <IconButton
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                />
            </Flex>
            <VStack alignItems="center" justifyContent="center" minH="80vh" spacing={8}>
                {/* Input URL */}
                <Box w="50%">
                    <Input
                        placeholder="Enter YouTube video URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                        Summarize Video
                    </Button>
                </Box>

                <iframe
                    title="YouTube Video"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${url.split("v=")[1]}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

                {video && (
                    <>
                        <Box>
                            <Text fontSize="xl" fontWeight="bold">
                                Video
                            </Text>
                            {/* Render the video */}
                        </Box>
                        <Box w="50%">
                            <Text fontSize="xl" fontWeight="bold">
                                Bullet Points
                            </Text>
                            <VStack alignItems="start" spacing={2}>
                                {bulletPoints.map((point, index) => (
                                    <Text key={index}>&bull; {point}</Text>
                                ))}
                            </VStack>
                        </Box>
                        <Box w="50%">
                            <Text fontSize="xl" fontWeight="bold">
                                Full Summary
                            </Text>
                            <Text>{fullSummary}</Text>
                        </Box>
                    </>
                )}
            </VStack>
        </Box>
    )
}

export default Summarizer
