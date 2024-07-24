"use client";

function error(error){

    return (
        <div className="flex items-center justify-center mt-28">
            {/* <h1>There was an {error}...</h1> */}
            <h1 className="text-3xl">{error.error.message}</h1>
        </div>
    );
}
export default error;