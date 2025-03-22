import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSignOutAlt,
  faInfoCircle,
  faBalanceScale,
  faExclamationCircle,
  faExclamation,
  faCheckCircle,
  faFolderOpen,
  faSearch,
  faCalendarAlt,
  faUserTie,
  faFlag,
  faHashtag,
  faEye,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
  // Initial mock data
  const initialCases = [
    {
      id: 1,
      title: "Murder Case",
      type: "Criminal",
      description: "A person was murdered in a street fight. Investigation ongoing with multiple witnesses.",
      priority: "high",
      assignedTo: "Senior Legal Team",
      date: "2025-03-18"
    },
    {
      id: 2,
      title: "Cyber Fraud",
      type: "Financial",
      description: "Online fraud using fake credit cards. Multiple victims across different states.",
      priority: "medium",
      assignedTo: "Cyber Crime Unit",
      date: "2025-03-15"
    },
    {
      id: 3,
      title: "Land Dispute",
      type: "Civil",
      description: "Neighbor dispute over land boundary. Documentation being reviewed by surveyor.",
      priority: "low",
      assignedTo: "Civil Cases Team",
      date: "2025-03-10"
    },
    {
      id: 4,
      title: "Robbery Case",
      type: "Criminal",
      description: "Armed robbery at a convenience store. Surveillance footage being analyzed.",
      priority: "high",
      assignedTo: "Criminal Investigation Unit",
      date: "2025-03-20"
    },
    {
      id: 5,
      title: "Corporate Tax Evasion",
      type: "Financial",
      description: "Investigation into suspected tax evasion by local corporation.",
      priority: "medium",
      assignedTo: "Financial Crimes Unit",
      date: "2025-03-12"
    }
  ];

  // State variables
  const [cases, setCases] = useState(initialCases);
  const [filteredCases, setFilteredCases] = useState([...initialCases]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  // Update counts and filtered cases when cases change
  useEffect(() => {
    applyFilters();
  }, [cases, searchTerm, currentFilter]);

  // Show toast message
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // Change case priority
  const changePriority = (id, newPriority) => {
    setCases(prevCases => {
      return prevCases.map(caseItem => {
        if (caseItem.id === id) {
          const oldPriority = caseItem.priority;
          showToast(`Case #${id} priority changed from ${oldPriority.toUpperCase()} to ${newPriority.toUpperCase()}`);
          return { ...caseItem, priority: newPriority };
        }
        return caseItem;
      });
    });
  };

  // Apply filters
  const applyFilters = () => {
    setFilteredCases(cases.filter(caseItem => {
      // Apply priority filter
      if (currentFilter !== 'all' && caseItem.priority !== currentFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        return (
          caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          caseItem.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          caseItem.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return true;
    }));
  };

  // View case details
  const viewDetails = (id) => {
    showToast(`Viewing details for Case #${id}`);
    // Implement actual view details functionality here
  };

  // Edit case
  const editCase = (id) => {
    showToast(`Editing Case #${id}`);
    // Implement actual edit case functionality here
  };

  // Logout handler
  const handleLogout = () => {
    showToast('Logging out...');
    setTimeout(() => {
      // Redirect to login page
      // You would replace this with proper auth logout logic
      window.location.href = '/admin-login';
    }, 1000);
  };

  // Calculate counts
  const highPriorityCount = cases.filter(c => c.priority === 'high').length;
  const mediumPriorityCount = cases.filter(c => c.priority === 'medium').length;
  const lowPriorityCount = cases.filter(c => c.priority === 'low').length;
  const totalCasesCount = cases.length;

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <Link to="/" className="logo">Legal<span>Assist</span> Admin</Link>
            <div>
              <Link to="/" className="btn">
                <FontAwesomeIcon icon={faHome} /> Main Site
              </Link>
              <button className="btn btn-accent" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className={`toast ${toast.show ? 'show' : ''}`}>
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>{toast.message}</span>
      </div>

      <div className="container admin-dashboard">
        <div className="admin-header">
          <h2><FontAwesomeIcon icon={faBalanceScale} /> Case Prioritization Dashboard</h2>
          <div className="priority-legend">
            <span className="priority-indicator priority-high">High Priority</span>
            <span className="priority-indicator priority-medium">Medium Priority</span>
            <span className="priority-indicator priority-low">Low Priority</span>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <FontAwesomeIcon icon={faExclamationCircle} />
            <h3>{highPriorityCount}</h3>
            <p>High Priority Cases</p>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faExclamation} />
            <h3>{mediumPriorityCount}</h3>
            <p>Medium Priority Cases</p>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faCheckCircle} />
            <h3>{lowPriorityCount}</h3>
            <p>Low Priority Cases</p>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faFolderOpen} />
            <h3>{totalCasesCount}</h3>
            <p>Total Active Cases</p>
          </div>
        </div>

        <div className="filter-controls">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input 
              type="text" 
              placeholder="Search cases..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <button 
              className={`btn btn-sm ${currentFilter === 'all' ? 'active' : ''}`} 
              onClick={() => setCurrentFilter('all')}
            >
              All Cases
            </button>
            <button 
              className={`btn btn-sm btn-high ${currentFilter === 'high' ? 'active' : ''}`} 
              onClick={() => setCurrentFilter('high')}
            >
              High Priority
            </button>
            <button 
              className={`btn btn-sm btn-medium ${currentFilter === 'medium' ? 'active' : ''}`} 
              onClick={() => setCurrentFilter('medium')}
            >
              Medium Priority
            </button>
            <button 
              className={`btn btn-sm btn-low ${currentFilter === 'low' ? 'active' : ''}`} 
              onClick={() => setCurrentFilter('low')}
            >
              Low Priority
            </button>
          </div>
        </div>

        <div className="priority-list">
          {filteredCases.length === 0 ? (
            <div className="no-cases-found">
              <FontAwesomeIcon icon={faSearch} />
              <h3>No cases found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredCases.map(caseItem => (
              <div className={`case-card priority-${caseItem.priority}`} key={caseItem.id}>
                <div className="case-header">
                  <h3>{caseItem.title}</h3>
                  <span className="case-type">{caseItem.type}</span>
                </div>
                <p className="case-description">{caseItem.description}</p>
                <div className="case-meta">
                  <span><FontAwesomeIcon icon={faCalendarAlt} /> {caseItem.date}</span>
                  <span><FontAwesomeIcon icon={faUserTie} /> {caseItem.assignedTo}</span>
                </div>
                <div className="case-meta">
                  <span>
                    <FontAwesomeIcon icon={faFlag} /> Priority:
                    <span className={`badge badge-${caseItem.priority}`}>
                      {caseItem.priority.toUpperCase()}
                    </span>
                  </span>
                  <span><FontAwesomeIcon icon={faHashtag} /> Case #{caseItem.id}</span>
                </div>
                <div className="case-actions">
                  <div className="priority-buttons">
                    <button 
                      className="btn btn-sm btn-high" 
                      onClick={() => changePriority(caseItem.id, 'high')}
                    >
                      High
                    </button>
                    <button 
                      className="btn btn-sm btn-medium" 
                      onClick={() => changePriority(caseItem.id, 'medium')}
                    >
                      Medium
                    </button>
                    <button 
                      className="btn btn-sm btn-low" 
                      onClick={() => changePriority(caseItem.id, 'low')}
                    >
                      Low
                    </button>
                  </div>
                  <div className="case-actions-right">
                    <button 
                      className="btn btn-sm" 
                      onClick={() => viewDetails(caseItem.id)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button 
                      className="btn btn-sm" 
                      onClick={() => editCase(caseItem.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;