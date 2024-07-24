import React from 'react'
import { AiFillMacCommand } from "react-icons/ai";
import Link  from "next/link";

const SideBar = () => {
  return (
    <div>
      <div className='flex flex-row items-center gap-5 mb-16'>
        <AiFillMacCommand className='text-5xl' />
        <h1 className='text-xl'>Open Source Chat Bot</h1>
      </div>

      <div className='flex flex-col items-center gap-5'>
        <Link href='/GeminiChat'>
          <button className="btn  btn-ghost w-full text-xl capitalize">Gemini ChatBot</button>
        </Link>
        <Link href='/LangChainChat'>
          <button className="btn  btn-ghost w-full text-xl capitalize">LangChain ChatBot</button>
        </Link>
      </div>

    </div>
  )
}

export { SideBar };
