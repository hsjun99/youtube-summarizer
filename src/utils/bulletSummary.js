import openai from "./api/openai"

async function bulletSummary(chunks) {
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
            console.log("hello")
            return completion.data.choices[0].message.content
        })
    )
    let bulletSummaryFinal = []
    bulletSummaryChunks.forEach((e, i) => {
        let prev
        for (let i = 0; i < e.length; i++) {
            if (e[i] === "•") {
                if (prev) {
                    bulletSummaryFinal.push(e.slice(prev, i))
                }
                prev = i
            }
        }
        bulletSummaryFinal.push(e.slice(prev))
    })

    console.log(bulletSummaryFinal)

    return bulletSummaryFinal
}

export default bulletSummary
