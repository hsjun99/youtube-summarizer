const openai = require("./openai")

async function wholeSummary(bulletSummaryChunks) {
    const bulletSummary = bulletSummaryChunks.join("\n")
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content:
                        "Write a long narrated engaging summary script from the following transcript:\n" +
                        bulletSummary +
                        "\nWrite a long narrated engaging summary script from the following transcript above:",
                },
            ],
        })
        return completion.data.choices[0].message.content
    } catch (e) {
        console.log(e)
    }
    return
}
module.exports = wholeSummary
