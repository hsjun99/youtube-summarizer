const openai = require("./openai")

async function bulletSummary(chunks) {
    try {
        let bulletSummaryChunks = []
        for (chunk of chunks) {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content:
                            "Create a detailed, well-organized bullet-point summary for the following podcast transcript that can perfectly capture its core ideas. In bullet-point!: \n" +
                            chunk,
                    },
                ],
            })
            console.log("hello")
            bulletSummaryChunks.push(completion.data.choices[0].message.content)
        }

        let bulletSummaryFinal = []
        bulletSummaryChunks.forEach((e, i) => {
            let prev
            for (let i = 0; i < e.length; i++) {
                if (e[i] === "-") {
                    if (prev) {
                        bulletSummaryFinal.push(e.slice(prev + 2, i))
                    }
                    prev = i
                }
            }
            bulletSummaryFinal.push(e.slice(prev))
        })
        return bulletSummaryFinal
    } catch (e) {
        console.log(e)
    }
}
module.exports = bulletSummary
