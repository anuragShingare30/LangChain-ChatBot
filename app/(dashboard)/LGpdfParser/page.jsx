import React from "react";
import { PdfParser } from "../../../components/PdfParser";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
export const dynamic = 'force-dynamic';

async function LangChainPDFParser() {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });

    // THIS WILL CREATE NEW QUERY CLIENT.
    const queryClient = new QueryClient();
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PdfParser></PdfParser>
        </HydrationBoundary>
    );
};
 
export default LangChainPDFParser;   