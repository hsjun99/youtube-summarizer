const openai = require("./api/openai")

async function wholeSummary(bulletSummaryChunks) {
    const fullSummary = bulletSummaryChunks.join("\n")

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content:
                    "Write a long narrated engaging summary script in FIRST person from the following transcript:\n" +
                    fullSummary +
                    "\nWrite a long narrated engaging summary script in FIRST person from the following transcript above:",
            },
        ],
    })

    return completion.data.choices[0].message.content
}

export default wholeSummary
