'use client';
import React, { useState, useRef } from 'react';
import pdfToText from "react-pdftotext";
import toast from 'react-hot-toast';
import { GenerateInterviewQuestions, EvaluateInterviewScore } from '../utils/actions';
import QuestionAnswerCard from './QuestionAnswerCard';

const AIInterview = () => {
  // States to Handle the Candidate Details.
  const [resume, setResume] = useState(null);
  const [interviewType, setInterviewType] = useState('DSA');
  const [questionCount, setQuestionCount] = useState('3');
  const [difficulty, setDifficulty] = useState('Easy');
  const [ExtractedText, setExtractedText] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [Loading, setLoading] = useState(false);
  const questionsRef = useRef([]); // To store questions
  const responseRef = useRef([]);  // To store user answers
  const [score, setScore] = useState('');

  // Handle Resume Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setResume(file);

    try {
      const text = await pdfToText(file);
      setExtractedText(text);
    } catch (error) {
      toast.error("Failed to extract text from PDF");
    }
  };

  // Start Interview
  const handleSubmit = async () => {
    if (!resume || !ExtractedText || !jobDesc) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    const answer = await GenerateInterviewQuestions(
      ExtractedText,
      interviewType,
      questionCount,
      difficulty,
      jobDesc
    );

    if (!answer || answer.length === 0) {
      toast.error("Error creating interview. Please try again.");
    } else {
      questionsRef.current = answer;
      toast.success("Interview Started!");
    }

    setLoading(false);
  };

  // Evaluate Score
  const handleEvaluate = async () => {
    if (!responseRef.current || responseRef.current.length === 0) {
      toast.error("No questions were answered.");
      return;
    }

    const resultString = JSON.stringify(responseRef.current);
    const scoreResult = await EvaluateInterviewScore(resultString);
    setScore(scoreResult);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      {/* Initial Form */}
      {!score && questionsRef.current.length === 0 && (
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-6">
          <h1 className="text-4xl font-bold text-center text-indigo-400">AI Interview</h1>
          <p className="text-center text-gray-300">Ace Interviews by preparing with AI</p>

          <div>
            <label className="block mb-2 text-sm text-gray-400">Upload Resume (PDF only)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full text-sm p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">Select Interview Type</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option>DSA</option>
              <option>Core Subjects</option>
              <option>Project Based</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">Number of Questions</label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">Job Description</label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              rows={4}
              placeholder="Paste the job description here..."
              className="w-full p-2 bg-gray-700 text-sm border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all p-2 rounded-md mt-4 text-white font-semibold"
            disabled={Loading}
          >
            {!Loading ? "Start Interview" : "Loading..."}
          </button>
        </div>
      )}

      {/* Interview Questions */}
      {!score && questionsRef.current.length > 0 && (
        <div className="w-full max-w-3xl space-y-4">
          {questionsRef.current.map((question, index) => (
            <QuestionAnswerCard
              key={index}
              question={question}
              questionNumber={index + 1}
              responseRef={responseRef}
            />
          ))}

          <button
            onClick={handleEvaluate}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mt-4"
          >
            Submit
          </button>
        </div>
      )}

      {/* Score Display */}
      {score && (
        <div className="text-center mt-8">
          <h2 className="text-3xl font-bold text-indigo-400">Your Interview Score</h2>
          <p className="text-white text-2xl mt-2">{score}</p>
        </div>
      )}
    </div>
  );
};

export default AIInterview;
