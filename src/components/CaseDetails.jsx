import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../assets/styles/CaseDetails.css';

const CaseDetails = () => {
  const location = useLocation();
  const caseData = location.state?.caseData;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!caseData) {
    return (
      <div className="case-details-container">
        <div className="container">
          <div className="not-found">
            <h2>Case Not Found</h2>
            <p>No case data is available. Please try searching again.</p>
            <Link to="/#track-case" className="btn btn-accent">Go Back</Link>
          </div>
        </div>
      </div>
    );
  }

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get the most recent hearing
  const getNextHearing = () => {
    if (!caseData.hearings || caseData.hearings.length === 0) {
      return null;
    }
    
    const futureHearings = caseData.hearings
      .filter(hearing => new Date(hearing.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return futureHearings.length > 0 ? futureHearings[0] : null;
  };

  const nextHearing = getNextHearing();

  return (
    <div className="case-details-container">
      <div className="container">
        <div className="case-details-header">
          <h1>Case Details</h1>
          <span className={`status-badge ${caseData.status.toLowerCase()}`}>
            {caseData.status}
          </span>
        </div>

        <div className="case-details-card">
          <h2>{caseData.caseTitle}</h2>
          
          <div className="case-details-section">
            <h3>General Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Token Number:</span>
                <span className="detail-value">{caseData.tokenNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Case Type:</span>
                <span className="detail-value">{caseData.caseType}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Filing Date:</span>
                <span className="detail-value">{formatDate(caseData.filingDate)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Court:</span>
                <span className="detail-value">{caseData.court}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Judge:</span>
                <span className="detail-value">{caseData.judge}</span>
              </div>
              {caseData.firNumber && (
                <div className="detail-item">
                  <span className="detail-label">FIR Number:</span>
                  <span className="detail-value">{caseData.firNumber}</span>
                </div>
              )}
            </div>
          </div>

          <div className="case-details-section">
            <h3>Parties</h3>
            <div className="parties-container">
              <div className="party-item">
                <h4>Petitioner</h4>
                <p>{caseData.petitioner}</p>
              </div>
              <div className="party-item">
                <h4>Respondent</h4>
                <p>{caseData.respondent}</p>
              </div>
            </div>
          </div>

          {nextHearing && (
            <div className="case-details-section highlight-section">
              <h3>Next Hearing</h3>
              <div className="next-hearing">
                <p className="hearing-date">
                  <strong>Date:</strong> {formatDate(nextHearing.date)}
                </p>
                <p className="hearing-description">
                  <strong>Description:</strong> {nextHearing.description}
                </p>
                <p className="hearing-status">
                  <strong>Status:</strong> {nextHearing.status}
                </p>
              </div>
            </div>
          )}

          <div className="case-details-section">
            <h3>Hearing History</h3>
            {caseData.hearings && caseData.hearings.length > 0 ? (
              <div className="hearings-timeline">
                {caseData.hearings
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((hearing, index) => (
                    <div className="timeline-item" key={index}>
                      <div className="timeline-date">
                        {formatDate(hearing.date)}
                      </div>
                      <div className="timeline-content">
                        <h4>{hearing.description}</h4>
                        <p className="judge-remarks">
                          <strong>Judge Remarks:</strong> {hearing.judgeRemarks || 'No remarks provided'}
                        </p>
                        <span className={`timeline-status ${hearing.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {hearing.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="no-hearings">No hearings have been scheduled yet.</p>
            )}
          </div>

          <div className="case-actions">
            <Link to="/#track-case" className="btn">Go Back</Link>
            <button className="btn btn-accent">Print Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;