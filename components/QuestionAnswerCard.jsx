'use client';
import React, { useState } from "react";

const QuestionAnswerCard = ({ questionNumber, index, question,responseRef }) => {
  const [answer, setAnswer] = useState("");
  const handleSave = () => {
    const result = `${questionNumber} ${question} : answer- ${answer}`;
    responseRef.current = [...responseRef.current, result];
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 border border-gray-700 p-4 rounded-2xl shadow-lg bg-gray-900 w-[800px] mx-auto my-6 text-white">
      {/* Question Section */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-2">Question {questionNumber}</h2>
        <p className="text-gray-300">
          {question || `Question Not available ${index}.`}
        </p>
      </div>

      {/* Answer Section */}
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
        <textarea
          className="w-full h-32 p-2 border border-gray-600 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerCard;
