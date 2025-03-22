import React, { useState } from "react";
import axios from "axios";

const CaseSearch = () => {
  const [token, setToken] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      setCaseData(null);
      const response = await axios.get(`http://localhost:4000/case/${token}`);
      setCaseData(response.data);
    } catch (err) {
      setError("Case not found");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Case by Token Number</h2>
      <input
        type="text"
        placeholder="Enter Token Number"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {caseData && (
        <div>
          <h3>Case Details</h3>
          <p><strong>Title:</strong> {caseData.caseTitle}</p>
          <p><strong>Type:</strong> {caseData.caseType}</p>
          <p><strong>Court:</strong> {caseData.court}</p>
          <p><strong>Judge:</strong> {caseData.judge}</p>
          <p><strong>Petitioner:</strong> {caseData.petitioner}</p>
          <p><strong>Respondent:</strong> {caseData.respondent}</p>
          <p><strong>Status:</strong> {caseData.status}</p>
          <h4>Hearings:</h4>
          {caseData.hearings.length > 0 ? (
            <ul>
              {caseData.hearings.map((hearing, index) => (
                <li key={index}>
                  <p><strong>Date:</strong> {new Date(hearing.date).toDateString()}</p>
                  <p><strong>Description:</strong> {hearing.description}</p>
                  <p><strong>Judge Remarks:</strong> {hearing.judgeRemarks}</p>
                  <p><strong>Status:</strong> {hearing.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hearings available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseSearch;
