const { YoutubeTranscript } = require("youtube-transcript")

async function youtubeToTranscript(youtubeUrl) {
    const rawTranscriptList = await YoutubeTranscript.fetchTranscript(youtubeUrl)
    let fullTranscriptChunks = [""]
    rawTranscriptList.forEach((e) => {
        if (fullTranscriptChunks[fullTranscriptChunks.length - 1].length > 7000) {
            fullTranscriptChunks.push("")
        }
        fullTranscriptChunks[fullTranscriptChunks.length - 1] += e.text + ". "
    })
    if (fullTranscriptChunks[fullTranscriptChunks.length - 1].length < 4000) {
        fullTranscriptChunks[fullTranscriptChunks.length - 2] +=
            fullTranscriptChunks[fullTranscriptChunks.length - 1]
        fullTranscriptChunks.pop()
    }
    return fullTranscriptChunks
}

export default youtubeToTranscript
