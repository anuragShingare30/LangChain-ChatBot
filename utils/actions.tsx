"use server"
import { ChatGroq } from "@langchain/groq";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { HumanMessage } from "@langchain/core/messages";
import { AIMessage } from "@langchain/core/messages";
import { GoogleGenAI } from "@google/genai";
import { Collage_Rules } from "./Rules";
import { createEvent } from "./types";
import prisma from "./db";
import { revalidatePath } from "next/cache";

/**
 @notice utils folder
 @dev This folder includes all the backend specific code for our application
 @dev We can create different files for backend code for our specific feature
 @notice This method of writing backend code is efficient and easy to understand
 */



// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE. 
async function chatResponse(prompt: string) {
  // Access your API key as an environment variable
  try {
    // Choose a model that's appropriate for your use case.
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API });
    const modelPrompt = `These are The Rules and Regulation of my Collage \n ${Collage_Rules}. \n Please Respond to the following Question : ${prompt} based on the Rules and Regulation shared Above.Please Provide the Concise and to the point answer and if the User asks something out from the Rules , just say "This Is Out of my Knowlede" and noting else , if the user greets just say" Hello How can i help You today" do not add any extra words from your side.`
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: modelPrompt,
    });
    return response.text;
  }
  catch (error) {
    return "We are Having Error Getting result,Please Try again";
  }
};
// IF WE HAVE AN APP WHICH OPERATES MULTIPLE USER IN SAME APP. WE CAN SAVE THEIR HISTORY WITH THE UNIQUE 
async function GetResumeATS_Score(ResumeText: any) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API });
    const prompt = `This is the text of my prase Reusme \n ${ResumeText}. \n Only provide the Numerical score out of 100 and Nothing Else.`
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const answer = `The ATS Score of Your Resume is ${response.text}`
    return answer;
  } catch (e) {
    return "Error Getting Your Resume Score, Please Try After Some time";
  }
}


// Function wiil create the new Event
async function CreateEventForm(values: createEvent) {

  try {
    await prisma.createe.create({
      data: {
        hallname:values.hallname,
        clubname:values.clubname,
        eventname:values.eventname,
        time:values.time,
        date:values.date
      }
    })
    console.log("Submitted Values:", values);
    revalidatePath('/');
  } 
  catch (error) {
    console.log(error);
    return "Error Getting to create the Event";
  }
}


export { chatResponse, GetResumeATS_Score,CreateEventForm};