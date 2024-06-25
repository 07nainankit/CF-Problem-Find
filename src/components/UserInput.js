// UserInput.js

import React, { useState } from "react";
import "./ProblemTable.css";

function UserInput({ onUsernameSubmit }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUsernameSubmit(username);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control custom-input rounded"
                placeholder="Enter Codeforces Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-dark custom-button" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserInput;