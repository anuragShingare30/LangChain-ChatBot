'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { langchainChatResponse } from '../utils/actions';


interface Message {
  role: 'user' | 'bot';
  content: string;
}

const LangChainChat: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState([]);

  const { mutate, isPending, data } = useMutation({
    mutationFn: async (userInput: string) => await langchainChatResponse(userInput),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong...");
        return;
      }
      toast.success("Success!!!");
      const result = data;
      setMessages((prevMessages) => [...prevMessages, { role: 'bot', content: result }]);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: userInput }]);
    mutate(userInput);
    setUserInput("");
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  if(isPending){
    return (
      <span className='loading loading-spinner text-2xl'></span>
    )
  }

  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        <h1 className='text-3xl relative bottom-7'>Langchain Chat Bot</h1>
        {messages.map((message, index) => {
          let avatar = message.role === 'user' ? '👨🏽' : '🤖';
          let bcg = message.role === 'user' ? "bg-base-200 shadow-lg" : "bg-base-100 shadow-lg";
          return (
            <div key={index} className={`flex flex-row gap-5 mt-6 leading-loose border-b border-base-300 ${bcg}`}>
              <p className="text-xl m-3">{avatar}</p>
              <p className={`text-xl m-3`}>{message.content}</p>
            </div>
          );
        })}
      </div>
      <div>
        <form className="join relative w-full" onSubmit={handleSubmit}>
          <div className="join w-full absolute mt-4 mb-10 bottom-auto">
            <input
              type="text"
              placeholder="Message LangChain"
              className="input input-bordered join-item w-full"
              name="text"
              value={userInput}
              onChange={handleInput}
            />
            <button
              type="submit"
              className="btn btn-primary w-32 join-item rounded-lg mb-5 font-bold"
              disabled={isPending}
            >
              {isPending ? "Please Wait..." : "Ask"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { LangChainChat };
