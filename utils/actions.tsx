"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatGroq } from "@langchain/groq";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { HumanMessage } from "@langchain/core/messages";
import { AIMessage } from "@langchain/core/messages";



// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE. 
async function chatResponse(prompt: string) {
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






async function langchainChatResponse(text: string) {
  try {
    // LANGUAGE MODEL TO BE USED.
    const model = new ChatGroq({
      model: "mixtral-8x7b-32768",
      temperature: 0
    });
    // THIS IS AN JS OBJECT WHICH WILL STORE OUR MESSAGE HISTORY.
    const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

    // THIS IS OUR TEMPLATE TO GENERATE THE RESPONSE.
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a helpful assistant who remembers all details the user shares with you.`,
      ],
      ["placeholder", "{chat_history}"],
      ["human", "{input}"],
    ]);

    // THIS IS USED TO CONNECT OUR LLM MODEL WITH OUTPUT PARSER
    const chain = prompt.pipe(model);

    // HERE WE CAN PROVIDE SPECIFIC DETAILS RELATED TO US OR FOR THIS APP.
    const messages = [
      new HumanMessage({ content: "hi! I'm anurag" }),
      new AIMessage({ content: "hi!" }),
    ];

    // THIS FUNCTION WILL ENCODE THE RESPONSE FROM AI AS WELL THE INPUT FROM USER. THIS FUNC REQUIRED THE SESSION ID.
    const withMessageHistory = new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: async (sessionId) => {
        if (messageHistories[sessionId] === undefined) {
          const messageHistory = new InMemoryChatMessageHistory();
          await messageHistory.addMessages(messages);
          messageHistories[sessionId] = messageHistory;
        }
        return messageHistories[sessionId];
      },
      inputMessagesKey: "input",
      historyMessagesKey: "chat_history",
    });


    // IF WE HAVE AN APP WHICH OPERATES MULTIPLE USER IN SAME APP. WE CAN SAVE THEIR HISTORY WITH THE UNIQUE SESSION ID.
    const config = {
      configurable: {
        sessionId: "abc2",
      },
    };


    // HERE, WE WILL GET THE RESPONSE FROM AI.
    const response = await withMessageHistory.invoke(
      {
        input: text,
      },
      config
    );
    console.log(response.content);
    return (response.content);
  }
  catch (error) {
    console.log(error);

  };


};







export { chatResponse, langchainChatResponse };