const openai = require("./api/openai")

async function transcriptToSummary(chunks) {
    let bulletSummaryChunks = await Promise.all(
        chunks.map(async (e) => {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content:
                            "Create a detailed, well-organized bullet-point summary for the following podcast transcript that can perfectly capture its core ideas. In bullet-point!: \n" +
                            e,
                    },
                ],
            })
            return completion.data.choices[0].message.content
        })
    )

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

export default transcriptToSummary
