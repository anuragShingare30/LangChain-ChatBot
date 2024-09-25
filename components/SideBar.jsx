import React from 'react'
import { AiFillMacCommand } from "react-icons/ai";
import Link from "next/link";

const SideBar = () => {
  return (
    <div>
      <Link href='/'>
        <div className='flex flex-row items-center gap-5 mb-16'>
          <AiFillMacCommand className='text-5xl' />
          <h1 className='text-xl'>Open Source Chat Bot</h1>
        </div> 
      </Link>


      <div className='flex flex-col items-center gap-5'>
        <Link href='/GeminiChat'>
          <button className="btn  btn-ghost w-full text-xl capitalize">Gemini ChatBot</button>
        </Link>
        <Link href='/LangChainChat'>
          <button className="btn  btn-ghost w-full text-xl capitalize">LangChain ChatBot</button>
        </Link>
        <Link href='/LGpdfParser'>
          <button className="btn  btn-ghost w-full text-xl capitalize">PDF Parser</button>
        </Link>
      </div>

    </div>
  )
}

export { SideBar };
