import { Center } from "@chakra-ui/react"
import { useState } from "react"
import Summarizer from "./components/summarizer"

function App() {
    const [count, setCount] = useState(0)

    return (
        <Box>
            <Summarizer></Summarizer>
        </Box>
    )
}

export default App
