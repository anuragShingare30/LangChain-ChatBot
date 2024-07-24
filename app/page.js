import Link from "next/link";
import React from "react";

function HomePage(){

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold">GenAI real-time ChatBOt</h1>
        <p className="py-6 text-xl">
          We have provided you an option to select your preffered language Model for the ChatBot. So please select the model of chatbot and continue with your QnA session with an GenAI powered ChatBot.
        </p>
        <Link href="/GeminiChat">
          <button className="btn btn-primary">Get Started</button>
        </Link>
        
      </div>
    </div>
  </div>
  );
};

export default HomePage;