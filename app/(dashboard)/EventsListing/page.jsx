import React from "react";

import {Listing} from "../../../components/Listing.jsx";

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';



export const dynamic = 'force-dynamic';

async function EventsListing() {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });

    

    // THIS WILL CREATE NEW QUERY CLIENT.
    // This is required only for our querying purpose
    const queryClient = new QueryClient(); 
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="m-5">
                <h1 className="text-3xl  border rounded-lg p-2">Check Out All Events</h1>
                <div className="mt-10">
                    <Listing />
                </div>
            </div>
        </HydrationBoundary>
    );
};

export default EventsListing;  