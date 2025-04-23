import React, { useState } from "react";
import { X, Brain, List, BookOpen, User } from "lucide-react";
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
        aria-label="DSA Memoizer"
      >
        {isOpen ? <X size={24} /> : <Brain size={24} />}
      </button>

      {isOpen && (
        <div className="floating-panel">
          <div className="panel-header">
            <div className="flex-8">
              <BookOpen color="rgb(135, 106, 251)" />
              <h3>DSA Memoizer</h3>
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

          <div className="panel-footer">
            Practice makes perfect. Review problems in spaced intervals.
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
