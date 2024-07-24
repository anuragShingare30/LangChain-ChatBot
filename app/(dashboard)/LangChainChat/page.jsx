import React from "react";
import { LangChainChat } from "../../../components/LangChainChat";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
export const dynamic = 'force-dynamic';

async function LangchainChat() {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });

    // THIS WILL CREATE NEW QUERY CLIENT.
    const queryClient = new QueryClient();
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="m-4">
               <LangChainChat></LangChainChat>
            </div>
        </HydrationBoundary>
    );
};
 
export default LangchainChat;  