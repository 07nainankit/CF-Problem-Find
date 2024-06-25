import React, { useState } from "react";
import UserInput from "./components/UserInput";
import ProblemTable from "./components/ProblemTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/ProblemTable.css";

function App() {
  const [problems, setProblems] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleUsernameSubmit = (username) => {
    setUsername(username);

    fetch(`https://codeforces.com/api/user.status?handle=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const processedProblems = processData(data.result);
          setProblems(processedProblems);
        } else {
          console.error(data.status + " : " + data.comment);
        }
      });
    fetch(`https://codeforces.com/api/user.info?handles=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const user = data.result[0];
          setFirstName(user.firstName); // Use the state-setting function
          setLastName(user.lastName); // Use the state-setting function
        } else {
          console.error("Failed to fetch user info");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const processData = (resultArr) => {
    const processedProblems = resultArr
      .filter((sub) => sub.verdict === "OK")
      .map((sub) => ({
        problemId: `${sub.problem.contestId}/${sub.problem.index}`,
        rating: sub.problem.rating,
        name: sub.problem.name,
      }));

    const uniqueProblemIds = new Set();

    const uniqueProcessedProblems = processedProblems.filter((problem) => {
      if (!uniqueProblemIds.has(problem.problemId)) {
        uniqueProblemIds.add(problem.problemId);
        return true;
      }
      return false;
    });

    return uniqueProcessedProblems;
  };

  return (
    <div className="container-fluid container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1>CodeForces Problems</h1>
        </div>
      </div>
      <div className="row container">
        <div className="col-md-15">
          <UserInput onUsernameSubmit={handleUsernameSubmit} />
          {username && (
            <h4 className="mt-4" style={{ textAlign: "center" }}>
              {" "}
              Problems Solved By:{" "}
              {firstName
                ? `${firstName} ${lastName}`
                : lastName
                ? lastName
                : username}
            </h4>
          )}
          {problems.length > 0 && <ProblemTable problems={problems} />}
        </div>
      </div>
      <footer className="mt-4 text-center">
        <h3>Made by - Ankit Nain</h3>
        <a
          href="https://www.linkedin.com/in/ankit-nain"
          target="_blank"
          rel="noopener noreferrer"
          className="a-style"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/07nainankit"
          target="_blank"
          rel="noopener noreferrer"
          className="a-style"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;