import React from 'react'
import { AiFillMacCommand } from "react-icons/ai";
import Link from "next/link";

const SideBar = () => {
  return (
    <div>

      <Link href='/'>
        <div className='flex flex-row items-center gap-5 mb-16'>
          <AiFillMacCommand className='text-5xl' />
          <h1 className='text-xl'>College OS</h1>
        </div>
      </Link>

      {/* Here we will render all our Pages according to general and student */}
      <div className='flex flex-col items-center gap-20'>


        {/* For General Corner */}
        <div>
          <h1 className='btn btn-primary btn-lg w-full'>Generals Corner</h1>

          <Link href='/EventsListing'>
            <button className="btn btn-ghost w-full capitalize">Events Listing</button>
          </Link>
          <Link href='/EventManagement'>
            <button className="btn btn-ghost w-full capitalize">Event Management</button>
          </Link>
          <Link href='/CampusAssets'>
            <button className="btn btn-ghost w-full capitalize">Booking campus assets</button>
          </Link>
        </div>




        {/* For Students Corner */}
        <div>
          <h1 className='btn btn-primary btn-lg w-full'>Students Corner</h1>

          <Link href='/RulesAndRegulationBot'>
            <button className="btn btn-ghost w-full capitalize">Rules & Regulation Bot</button>
          </Link>
          <Link href='/ResumeScore'>
            <button className="btn btn-ghost w-full capitalize">Resume ATS score</button>
          </Link>
          <Link href='/Complaints'>
            <button className="btn btn-ghost w-full capitalize">Complaint/Request Submission Portal</button>
          </Link>
          <Link href='/AI_Interview_App'>
            <button className="btn btn-ghost w-full capitalize">AI interview</button>
          </Link>
        </div>


      </div>



    </div>
  )
}

export { SideBar };