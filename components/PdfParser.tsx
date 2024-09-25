
import React from "react";
import { ChatGroq } from "@langchain/groq";
import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GooglePaLMEmbeddings } from "@langchain/community/embeddings/googlepalm";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers"; 

// import { HfInference } from "@huggingface/inference";
// import { pipeline } from "@xenova/transformers";

async function PdfParser(){

    try {
        // LANGUAGE MODEL TO BE USED.
        const llm = new ChatGroq({
            model: "mixtral-8x7b-32768",
            temperature: 0
        });


        // TO LOAD THE DATA FROM DATA SOURCE WE WILL USE 'DOCUMENTLOADERS' 
        const loader = new CheerioWebBaseLoader(
            "https://lilianweng.github.io/posts/2023-06-23-agent/",

        );
        const docs = await loader.load();
        // console.log(docs);
        



        // NOW, THE LOADED DOCUMENT FROM DATASOURCE WILL BE SPLITTED INTO SMALL CHUNKS, SO THAT IT WILL APPLICABLE TO CONTEXT WINDOW OF LLM.
        // WE WILL USE 'RecursiveCharacterTextSplitter'
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const allSplits = await textSplitter.splitDocuments(docs);



        // NOW WE WILL CONVERT SMALL CHUNKS INTO VECTOR NUM USING 'EMBEDDINGS MODEL' AND STORE VECTOR IN 'VECTOR DB/VECTOR STORE'.
        const vectorStore = await MemoryVectorStore.fromDocuments(
            allSplits,
            new GooglePaLMEmbeddings(),
        );


        // NOW USING 'RETRIEVER' WE WILL EXTRACT THE MOST RELEVANT DATA FROM DATASOURCE.
        const retriever = vectorStore.asRetriever({ k: 6, searchType: "similarity" });


        //  A chain that takes a question, retrieves relevant documents, constructs a prompt, passes that to a ChatModel/LLMs, and parses the output. 
        const template = `Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Use three sentences maximum and keep the answer as concise as possible.
    Always say "thanks for asking!" at the end of the answer.

    {context}

    Question: {question}

    Helpful Answer:`;

        const customRagPrompt = PromptTemplate.fromTemplate(template);
        const ragChain = await createStuffDocumentsChain({
            llm,
            prompt: customRagPrompt,
            outputParser: new StringOutputParser(),
        });
        const context = await retriever.invoke("What are types of memory?");
        let result = await ragChain.invoke({
            question: "What are types of memory?",
            context,
        });
        // console.log(result);



    } catch (error) {
        console.log(error);

    }


    // USING HUGGING FACE
    // try {
    //     const inference = new HfInference(process.env.HUGGINGFACEHUB_API_TOKEN);


    //     const result = inference.chatCompletion({
    //         model: "mistralai/Mistral-Nemo-Instruct-2407",
    //         messages: [{ role: "user", content: "What is the capital of France?" }],
    //         max_tokens: 500,
    //         max_length: 500,
    //     });


    //     // console.log((await result).choices[0].message.content); 
    // }
    // catch (error) {
    //     console.log(error);
    // }

    // USING PIPELINE METHOD
    // try {

    //     // Create a text-generation pipeline
    //     const generator = await pipeline('text-generation', 'Xenova/codegen-350M-nl');
    //     // Generate text (default parameters)
    //     const text = 'Once upon a time,';
    //     const output = await generator(text, {
    //         max_new_tokens: 20,
    //         do_sample: true,
    //         top_k: 5,

    //     });
    //     console.log(output);



    // }
    // catch (error) {
    //     console.log(error);

    // }


    return (
        <div>

            <div className="m-1">
                <h1 className="text-3xl">LangChain AI PDF Parser QnA ChatBot</h1>
            </div>

            <div>

            </div>
        </div>

    )
}

export { PdfParser };