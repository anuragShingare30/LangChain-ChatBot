import React from "react";
import InterviewHome from "../../../components/InterviewHome";
import QuestionAnswerCard from "../../../components/QuestionAnswerCard";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
export const dynamic = 'force-dynamic';

async function Interview() {
    await new Promise((resolve) => { setTimeout(resolve, 1000) });
    // THIS WILL CREATE NEW QUERY CLIENT.
    const queryClient = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <InterviewHome></InterviewHome>
        </HydrationBoundary>
    );
};
 
export default Interview;   