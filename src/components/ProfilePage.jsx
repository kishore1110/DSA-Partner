import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";
import { getReviewInterval, updateReviseDays } from "../utils/problemStorage";
import {FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ProfilePage = () => {

    const serviceId = "service_6x71dxs";
    const templateId = "template_ad0rnpg";
    const publicKey = "Qcd1oWl7nD7hamAnR";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        feedback: "",
    });
    const [error, setError] = useState("");
    const [errorSuccess, setErrorSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const { name, email, subject, feedback } = formData;
        if (!name || !email || !subject || !feedback) {
            setError("All fields are required!");
            return false;
        }
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (!nameRegex.test(name)) {
            setError("Invalid name format");
            return false;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format!");
            return false;
        }
        setError("");
        return true;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [reviseDay, setReviseDay] = useState("3");
    const sendEmail = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        emailjs
            .send(serviceId, templateId, formData, publicKey)
            .then(() => {
                setErrorSuccess(true);
                setError("Feedback sent successfully!");
                setFormData({ name: "", email: "", subject: "", feedback: "" });
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                setError("Failed to send message.");
                setErrorSuccess(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleReviseDayChange = async (e) => {
        const strValue = e.target.value.trim();

        setReviseDay(strValue);
        
        if(!strValue){
            return;
        }
        
        if (strValue < 1 || strValue > 30) {
            alert('Invalid input: value must be a number between 1 and 30.');
            return;
        }
        
        
        await updateReviseDays(strValue); 
    };


    useEffect(() => {
        const fetchReviewInterval = async () => {
            const interval = await getReviewInterval();
            setReviseDay(interval || 4);
        };

        fetchReviewInterval();
    }, []);

    useEffect(() => {
        if (errorSuccess) {
            const timer = setTimeout(() => {
                setError("");
                setErrorSuccess(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [errorSuccess]);

    return (
        <div className="profile-sections">
            {/* About Me Section */}
            <div className="about-me-section">
                <div className="section-header">
                    <h2 className="profile-section-title">Developed by</h2>
                </div>
                <div className="about-me-content">
                    <div className="about-me-text">
                        <div>
                            <h3 className="profile-name">Kishore S</h3>
                        </div>
                        <div className="social-links">
                            <button
                                className="social-link"
                                onClick={() =>
                                    window.open(
                                        "https://www.linkedin.com/in/kishore1110/",
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
                                    window.open("https://github.com/kishore1110", "_blank")
                                }
                            >
                                <img
                                    src="https://github.githubassets.com/favicons/favicon.svg"
                                    alt="Github icon"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button
                                className="social-link"
                                onClick={() =>
                                    window.open(
                                        "https://www.leetcode.com/u/kishore_1110/",
                                        "_blank"
                                    )
                                }
                            >
                                <img
                                    src="https://leetcode.com/static/images/LeetCode_logo.png"
                                    alt="Leetcode icon"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button
                                className="social-link"
                                onClick={() =>
                                    window.open(
                                        "https://www.geeksforgeeks.org/user/kishore_1110/",
                                        "_blank"
                                    )
                                }
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
                                    alt="GFG icon"
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
                        Your feedback helps to improve this tool. Let me know what you think,
                        suggest new features, or report bugs!
                    </p>

                    <form className="feedback-form" onSubmit={sendEmail}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                className="form-input"
                                placeholder="Enter Your Name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email ID
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className="form-input"
                                placeholder="you@example.com"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject" className="form-label">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                className="form-input"
                                onChange={handleInputChange}
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
                            />
                        </div>
                        {error && (
                            <div className={`message ${errorSuccess ? "success" : "error"}`}>
                                <p>{error}</p>
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="submit-feedback-button"
                        >
                            {loading ? (
                                <div className="spinner-container">
                                    <FaSpinner className="spinner" />
                                </div>
                            ) : (
                                "Send Feedback"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
