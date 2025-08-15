import React, { useState } from "react";
import { X, List, User } from "lucide-react";
import { FaHandshakeAngle } from "react-icons/fa6";
import ProblemList from "./ProblemList";
import AddProblemForm from "./AddProblemForm";
import "../styles/FloatingButton.css";
import ProfilePage from "./ProfilePage";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("problems");
  const isLeetcode = window.location.href.includes("leetcode.com");
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setView("problems");
  };

  return (
    <div className="floating-container">
      <button
        onClick={toggleOpen}
        className="floating-button"
        aria-label="DSA Partner"
      >
        {isOpen ? <X size={24} /> : <FaHandshakeAngle size={24} />}
      </button>

      {isOpen && (
        <div className="floating-panel">
          <div className="panel-header">
            <div className="flex-8">
              <FaHandshakeAngle size={24} color="#FFB700" />
              <h3>DSA Partner</h3>
            </div>
            <div className="button-group flex-8">
              <button
                className={view === "problems" ? "active" : "inactive"}
                onClick={() => setView("problems")}
              >
                <List size={16} />
              </button>
              <button
                className={view === "add" ? "active" : "inactive"}
                onClick={() => setView("add")}
              >
                <X size={16} className="rotate-45" />
              </button>
              <button
                className={view === "profile" ? "active" : "inactive"}
                onClick={() => setView("profile")}
              >
                <User size={16} />
              </button>
            </div>
          </div>

          <div className="panel-content" style={{
            maxHeight: isLeetcode ? "53vh" : "285px"
          }}>
            {view === "problems" ? (
              <ProblemList />
            ) : view === "add" ? (
              <AddProblemForm onClose={() => setView("problems")} />
            ) : (
              <ProfilePage />
            )}
          </div>

          <div className="panel-footer text-center">
            Practice makes perfect.
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
