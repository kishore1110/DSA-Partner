import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";
import linkedIcon from "../../public/linkedin_icon.png";

const ProfilePage = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [iconUrl, setIconUrl] = useState('');
  
  useEffect(() => {
    // Set the correct URL when component mounts
    setIconUrl(chrome.runtime.getURL('public/linkedin_icon.png'));
  }, []);

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", feedbackMessage);
    setFeedbackMessage("");
  };

  return (
    <div className="profile-container">
      <div className="profile-sections">
        {/* About Me Section */}
        <div className="about-me-section">
          <div className="section-header">
            <div className="section-icon user-icon"></div>
            <h2 className="section-title">About Me</h2>
          </div>

          <div className="about-me-content">
            <div className="avatar">
              <img
                className="avatar-image"
                src="/placeholder.svg"
                alt="Profile"
              />
              <div className="avatar-fallback">JD</div>
            </div>

            <div className="about-me-text">
              <div>
                <h3 className="profile-name">John Doe</h3>
                <p className="profile-role">Software Engineer</p>
              </div>

              <p className="profile-description">
                I'm a passionate developer who loves solving DSA problems. I
                created this tool to help others practice consistently and
                improve their problem-solving skills through spaced repetition
                and organized tracking.
              </p>

              <div className="social-links">
              <button
                    className="social-link"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/shikhar-gupta-98a15b197/",
                      "_blank"
                    )
                  }
                >
                  <img
                    src="https://github.com/shikhar-9519"
                    alt="Linkedin icon"
                    width={24}
                    height={24}
                  />
                </button>
                <button
                    className="social-link"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/shikhar-gupta-98a15b197/",
                      "_blank"
                    )
                  }
                >
                  <img
                    src={iconUrl}
                    alt="Linkedin icon"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="feedback-section">
          <div className="section-header">
            <div className="section-icon feedback-icon"></div>
            <h2 className="section-title">Send Feedback</h2>
          </div>

          <div className="feedback-content">
            <p className="feedback-description">
              Your feedback helps improve this tool. Let me know what you think
              or suggest new features!
            </p>

            <form className="feedback-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback" className="form-label">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  className="form-textarea"
                  placeholder="Share your thoughts, suggestions, or report issues..."
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="submit-feedback-button"
                onClick={handleSubmitFeedback}
                disabled={!feedbackMessage.trim()}
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
