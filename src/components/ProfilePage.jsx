import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";
import { CircleCheckBig } from "lucide-react";
import { getReviewInterval, updateReviseDays } from "../utils/problemStorage";

const ProfilePage = () => {
  const [iconUrl, setIconUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    linkedInId: "",
    feedback: "",
  });
  const [status, setStatus] = useState("");
  const [reviseDay, setReviseDay] = useState(4);

  useEffect(() => {
    setIconUrl(chrome.runtime.getURL("public/linkedin_icon.png"));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/myzebpoj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", linkedInId: "", feedback: "" });
        setTimeout(() => {
          setStatus("");
        }, 10000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus("error");
    }
  };

  const handleReviseDayChange = async (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1 || value > 30) {
      console.log('Invalid input: value must be a number between 1 and 30.');
      return;
    }
    setReviseDay(value);
    await updateReviseDays(value);
  };

  useEffect(() => {
    const fetchReviewInterval = async () => {
      const interval = await getReviewInterval();
      setReviseDay(interval || 4);
    };

    fetchReviewInterval();
  }, []);

  return (
    <div className="profile-sections">
      {/* About Me Section */}
      <div className="about-me-section">
        <div className="section-header">
          <h2 className="profile-section-title">Developed with ❤️ by</h2>
        </div>

        <div className="about-me-content">
          <div className="avatar">
            <img
              className="avatar-image"
              src="https://avatars.githubusercontent.com/u/87434089?v=4"
              alt="Profile"
            />
          </div>

          <div className="about-me-text">
            <div>
              <h3 className="profile-name">Shikhar Gupta</h3>
            </div>
            <div className="social-links">
              <button
                className="social-link"
                onClick={() =>
                  window.open("https://github.com/shikhar-9519", "_blank")
                }
              >
                <img
                  src="https://github.githubassets.com/favicons/favicon.svg"
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
                  src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0xMF8xLnBuZw.png"
                  alt="Linkedin icon"
                  width={24}
                  height={24}
                />
              </button>
              <button
                className="social-link"
                onClick={() =>
                  window.open("https://www.youtube.com/@5minutescode", "_blank")
                }
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                  alt="Youtube icon"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="setting-section">
        <div className="section-header">
          <h2 className="profile-section-title">Settings</h2>
        </div>

        <div className="setting-content">
          <div className="form-group">
            <label htmlFor="reviseDay" className="form-label">
              Revise After (Days)
            </label>
            <input
              id="reviseDay"
              name="reviseDay"
              type="number"
              className="form-input"
              value={reviseDay}
              onChange={handleReviseDayChange}
              min="1"
              max="30"
              required
            />
          </div>
        </div>
      </div>
      {/* Feedback Section */}
      <div className="feedback-section">
        <div className="section-header">
          <h2 className="profile-section-title">Send Feedback</h2>
        </div>

        <div className="feedback-content">
          <p className="feedback-description">
            Your feedback helps improve this tool. Let me know what you think,
            suggest new features, or report bugs!
          </p>

          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                LinkedIn ID
              </label>
              <input
                id="linkedInId"
                name="linkedInId"
                type="url"
                className="form-input"
                value={formData.linkedInId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedback" className="form-label">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                className="form-textarea"
                value={formData.feedback}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="submit-feedback-button"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>

          {/* Status Messages */}
          {status === "success" && (
            <p className="success-message flex-4">
              <CircleCheckBig color="green" />
              Thank you for your feedback!
            </p>
          )}
          {status === "error" && (
            <p className="error-message">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
