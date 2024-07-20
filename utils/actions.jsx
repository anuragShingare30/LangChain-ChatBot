"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";


// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE.
async function chatResponse(prompt) {
    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    try {
        // Choose a model that's appropriate for your use case.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [  
                        {
                            text: prompt,
                        }
                    ],
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.1,
            },
        });
        // console.log(result.response.text());
        console.log(result.response.candidates[0].content.parts[0].text);
        return (result.response.candidates[0]);
    }
    catch (error) {
        console.log(error);
    }
};

export {chatResponse};