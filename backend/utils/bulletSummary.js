const openai = require("./openai")

async function bulletSummary(chunks) {
    try {
        let bulletSummaryChunks = []
        for (chunk of chunks) {
            console.log("start")
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content:
                            "Create a detailed, well-organized bullet-point summary for the following podcast transcript that can perfectly capture its core ideas. In bullet-point!!: \n" +
                            chunk +
                            "\nCreate a detailed, well-organized bullet-point summary for the following podcast transcript that can perfectly capture its core ideas from above text. In bullet-point!!: \n",
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
                if (e[i] === "-" && e[i + 1] === " ") {
                    if (prev) {
                        bulletSummaryFinal.push(e.slice(prev + 2, i))
                    }
                    prev = i
                }
            }
            bulletSummaryFinal.push(e.slice(prev + 2))
        })
        return bulletSummaryFinal
    } catch (e) {
        console.log(e)
    }
}
module.exports = bulletSummary
