const { YoutubeTranscript } = require("youtube-transcript")  

function retry(fn, retriesLeft = 5, interval = 1000) {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                setTimeout(() => {
                    if (retriesLeft === 1) {
                        reject(error)
                        return
                    }

                    // Passing on "reject" is the important part
                    retry(fn, retriesLeft - 1, interval).then(resolve, reject)
                }, interval)
            })
    })
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

module.exports = {
    transcript,
    retry 
}
