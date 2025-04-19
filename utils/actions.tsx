"use server"
import { ChatGroq } from "@langchain/groq";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { HumanMessage } from "@langchain/core/messages";
import { AIMessage } from "@langchain/core/messages";
import { GoogleGenAI } from "@google/genai";
import { Collage_Rules } from "./Rules";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
/**
 @notice utils folder
 @dev This folder includes all the backend specific code for our application
 @dev We can create different files for backend code for our specific feature
 @notice This method of writing backend code is efficient and easy to understand
 */


// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE. 
async function chatResponse(prompt: string) {

  try {
    // Generate the rsponse Basd on the User Query
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API});
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

    // Function to get the ATS Score of the Resume. 

    // IF WE HAVE AN APP WHICH OPERATES MULTIPLE USER IN SAME APP. WE CAN SAVE THEIR HISTORY WITH THE UNIQUE 
async function GetResumeATS_Score(ResumeText:any){
  try{
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API});
    const prompt = `This is the text of my prase Reusme \n ${ResumeText}. \n Only provide the Numerical score out of 100 and Nothing Else.`
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const answer = `The ATS Score of Your Resume is ${response.text}`
    return answer;
  }catch(e){
    return "Error Getting Your Resume Score, Please Try After Some time";
  }
}

async function GenerateInterviewQuestions(resume:string, interviewType:string, questionsCount:string,difficulty: string,JobDesc:string ){
  try{
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API});
    const prompt = `This is the Parsed Text of my Resume \n ${resume} \n for the Job Description ${JobDesc}. \n
    Give Me ${questionsCount} Interview Questions of ${difficulty} difficulty based ${interviewType} use Resume and The Job Description of the Candidate. Just Give The Questions Only. After each question use "*$*$"  except the last one ,so that i can split it easily.`
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const text = response.text;
    let extracted_questions = [];
    extracted_questions = text.split("*$*$").map(q => q.trim());
    return extracted_questions;
  }catch(e){
     return "";
  }
}
async function EvaluateInterviewScore(text: string){
  try{
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API});
  const prompt = `The Following  are the Question Answers pairs of the Interview\n ${text}. \n
  Evaluate The Result assume each question carries Equal points and total of 100 points.Evaluate and provide the Score Only and Nothing Extra.`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  const result = response.text;
  return `Interview Completed.. Your Score is ${result}`;
  }
  catch(e){
      return "Interview Cannot be completed, Please Try again.";
  }
}
export { chatResponse,GetResumeATS_Score,GenerateInterviewQuestions,EvaluateInterviewScore};


