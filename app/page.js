import Link from "next/link";
import React from "react";


/**
 @notice page.js is our HomePage
 */

function HomePage(){

  return (
    <div className="hero  min-h-screen bg-[url(https://img.collegepravesh.com/2021/11/IIIT-Trichy.jpg)] opacity-50">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-black opacity-100 mb-80">IIIT Trichy College OS</h1>
       
        <Link href="/EventsListing">
          <button className="btn btn-secondary mt-10">Get Started</button>
        </Link>
        
      </div>
    </div>
  </div>
  );
};

export default HomePage;