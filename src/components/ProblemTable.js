import React, { useState } from "react";
import "./ProblemTable.css";

function ProblemTable({ problems }) {
  const groupedProblems = {};

  problems.forEach(({ problemId, rating, name }) => {
    if (!groupedProblems[rating]) {
      groupedProblems[rating] = [];
    }
    groupedProblems[rating].push({ problemId, name });
  });

  const [expandedRating, setExpandedRating] = useState(null);

  const handleRatingClick = (rating) => {
    if (expandedRating === rating) {
      setExpandedRating(null);
    } else {
      setExpandedRating(rating);
    }
  };

  return (
    <div className="container-fluid">
      <h2>Problems by Rating</h2>
      <div className="row">
        {Object.keys(groupedProblems).map((rating) => (
          <div key={rating} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Rating: {rating}</h5>
                <button
                  onClick={() => handleRatingClick(rating)}
                  className={`btn btn-outline-dark ${
                    expandedRating === rating ? "active" : ""
                  }`}
                >
                  {expandedRating === rating ? "Hide" : "Show"} Problems
                </button>
                {expandedRating === rating && (
                  <ul className="list-group mt-2">
                    {groupedProblems[rating].map(({ problemId, name }) => (
                      <li key={problemId} className="list-group-item">
                        <a
                          href={`https://codeforces.com/problemset/problem/${problemId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="custom-link"
                        >
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemTable;