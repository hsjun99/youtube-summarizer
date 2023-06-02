const { YoutubeTranscript } = require("youtube-transcript")  

function retry(fn, retriesLeft = 3) {
    return fn().catch(err => {
        if (retriesLeft === 1) throw err;
        console.log(`Retrying YouTube Transcript API call. Retries left: ${retriesLeft}`);
        return retry(fn, retriesLeft - 1);
    });
}

async function transcript(youtubeUrl) {
    const rawTranscriptList = await retry(() => YoutubeTranscript.fetchTranscript(youtubeUrl))
    let fullTranscriptChunks = [""]
    rawTranscriptList.forEach((e) => {
        if (fullTranscriptChunks[fullTranscriptChunks.length - 1].length > 8000) {
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

module.exports = transcript
