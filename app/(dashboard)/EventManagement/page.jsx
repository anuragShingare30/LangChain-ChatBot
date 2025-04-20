import React from "react";

import { CreateEvent } from "../../../components/CreateEvent";

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
// export const dynamic = 'force-dynamic';


async function EventManagement() {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });

    // THIS WILL CREATE NEW QUERY CLIENT.
    // This is required only for our querying purpose
    const queryClient = new QueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="m-10">
                <h1 className="text-3xl  border rounded-lg p-2">Create Event for your Club!!!</h1>
                <CreateEvent></CreateEvent>
            </div>
        </HydrationBoundary>
    );
};

export default EventManagement;  