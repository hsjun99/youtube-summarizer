const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

function retry(fn, retriesLeft = 3) {
    return fn().catch(err => {
        if (retriesLeft === 1) throw err;
        console.log(`Retrying OpenAI API call. Retries left: ${retriesLeft}`);
        return retry(fn, retriesLeft - 1);
    });
}

module.exports = {
    openai,
    retry 
}
