import axios from 'axios'

async function getOpenAIApiKey() {
    const url = 'https://getapikey1-ozfn6hjetq-uc.a.run.app'
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

async function translateWithGPT3(from: string, to: string, text: string): Promise<string> {
    /**
     * 2024.01.05. 엔진 테스트했을때 가장 정확도가 높음.
     */
    const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions'
    const { key } = await getOpenAIApiKey()

    try {
        const response = await axios.post(
            apiUrl,
            {
                prompt: `Translate the following ${from} text to ${to}: """${text}"""`,
                temperature: 0.7,
                max_tokens: 999
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${key}`
                }
            }
        )

        const translatedText = response.data.choices[0]?.text.trim()
        return translatedText || 'Translation not available'
    } catch (e) {
        console.error(e)
        return 'Error during translation'
    }
}

export default translateWithGPT3
