import React, { useState, useEffect } from "react";
import { addProblem } from "../utils/problemStorage";
import { getCurrentUrl } from "../utils/pageInfo";
import "../styles/AddProblem.css";
const AddProblemForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const getPageInfo = async () => {
      try {
        const currentUrl = await getCurrentUrl();
        setUrl(currentUrl);
        setTitle(extractProblemTitle(currentUrl) || "");
        if (currentUrl.includes("leetcode.com")) {
          setPlatform("LeetCode");
        } else if (currentUrl.includes("geeksforgeeks.org")) {
          setPlatform("GeeksForGeeks");
        }
      } catch (error) {
        console.error("Error getting page info:", error);
      }
    };

    getPageInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !url) {
      return;
    }

    const newProblem = await addProblem({
      title,
      url,
      platform: platform || "Other",
    });

    setTitle("");
    setUrl("");
    setPlatform("");
    onClose();
  };

  const extractProblemTitle = (url) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/");
      const problemsIndex = pathParts.findIndex((part) => part === "problems");
      if (problemsIndex !== -1 && pathParts[problemsIndex + 1]) {
        const rawTitle = pathParts[problemsIndex + 1]
          .split("-")
          .join(" ")
          .replace(/\d+$/, "")
          .trim();
        return rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
      }
      return null;
    } catch (err) {
      console.error("Error extracting problem title:", err);
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Problem Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter problem title"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="url">
          URL
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="platform">
          Platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="form-select"
        >
          <option value="">Select platform</option>
          <option value="LeetCode">LeetCode</option>
          <option value="GeeksForGeeks">GeeksForGeeks</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Add for Review
        </button>
      </div>
    </form>
  );
};

export default AddProblemForm;
