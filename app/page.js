import Link from "next/link";
import React from "react";

function HomePage(){

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold">Google Gemini AI ChatBOt</h1>
        <p className="py-6 text-xl">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <Link href="/Chat">
          <button className="btn btn-primary">Get Started</button>
        </Link>
        
      </div>
    </div>
  </div>
  );
};

export default HomePage;