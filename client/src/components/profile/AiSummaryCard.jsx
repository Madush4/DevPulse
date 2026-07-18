import React from "react";

function AiSummaryCard({ ai }) {
  if (!ai) return (
    <div className="bg-slate-800 rounded-lg flex flex-col space-y-4 p-3">
      <h2 className="text-white font-semibold">AI Developer Summary</h2>
      <div className="bg-slate-700 px-3 py-2 rounded-lg">
        <p className="text-white">
          AI summary is not available yet. Refresh the profile to generate
          insights.
        </p>
      </div>
    </div>
  );
  return (
    <div className="bg-slate-800 rounded-lg flex flex-col space-y-4 p-3">
      <h2 className="text-white font-semibold">AI Developer Summary</h2>
      <div className="bg-slate-700 px-3 py-2 rounde-lg">
        <p className="text-white">
          {ai.summary_text || ai.summary || "Error while generating summary"}
        </p>
      </div>
      <div className="flex justify-between px-4 py-2">
        <div className="bg-slate-700 rounded-lg shadow-md">
          <ul>
            {(ai.strengths || []).length > 0 ? (
              ai.strengths.map((strengths, index) => (
                <li key={index}>{strengths}</li>
              ))
            ) : (
              <li>No Strenghths</li>
            )}
          </ul>
        </div>

        <div className="bg-slate-700 rounded-lg shadow-md">
          <ul>
            {(ai.improvements || []).length > 0 ? (
              ai.improvements.map((improvements, index) => (
                <li key={index}>{improvements}</li>
              ))
            ) : (
              <li>No Improvements</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AiSummaryCard;
