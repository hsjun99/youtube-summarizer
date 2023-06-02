const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not defined')
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

module.exports = openai
