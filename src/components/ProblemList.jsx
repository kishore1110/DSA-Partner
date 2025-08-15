import React, { useState, useEffect } from "react";
import {
    Clock,
    Check,
    CalendarDays,
    TriangleAlert,
    RefreshCcw,
    CircleCheckBig,
} from "lucide-react";
import { format } from "date-fns";
import "../styles/ProblemList.css";
import {
    deleteProblem,
    getAllProblems,
    handleRetryProblem,
    setToMidnight,
} from "../utils/problemStorage";

const ProblemList = () => {
    const [allProblems, setAllProblems] = useState([]);
    const [todayProblems, setTodayProblems] = useState([]);
    const [upcomingProblems, setUpcomingProblems] = useState([]);
    const [missedProblems, setMissedProblems] = useState([]);

    const updateUpcomingProblems = (problems, now) => {
        problems = problems.sort((a, b) => a.nextReviewDate - b.nextReviewDate);
        const groupedUpcomingProblems = problems
            .filter((problem) => problem.nextReviewDate > now)
            .reduce((acc, problem) => {
                const dateKey = format(
                    new Date(problem.nextReviewDate),
                    "EEEE, MMMM d"
                );
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }
                acc[dateKey].push(problem);
                return acc;
            }, {});

        setUpcomingProblems(groupedUpcomingProblems);
    };

    useEffect(() => {
        const fetchProblems = async () => {
            const problems = await getAllProblems();
            const now = setToMidnight(Date.now());
            setAllProblems(problems);
            setTodayProblems(
                problems.filter((problem) => problem.nextReviewDate === now)
            );
            updateUpcomingProblems(problems, now);
            setMissedProblems(
                problems.filter((problem) => problem.nextReviewDate < now)
            );
        };

        fetchProblems();
    }, []);

    const handleMarkAsSolved = async (id) => {
        const problemElement = document.getElementById(`problem-${id}`);
        if (problemElement) {
            problemElement.classList.add("fade-out");
            setTimeout(async () => {
                setTodayProblems((prevProblems) =>
                    prevProblems.filter((p) => p.id !== id)
                );
                setMissedProblems((prevProblems) =>
                    prevProblems.filter((p) => p.id !== id)
                );
                await deleteProblem(id);
            }, 500);
        }
    };

    const resolveAgain = async (problem) => {
        const id = problem.id;
        const problemElement = document.getElementById(`problem-${id}`);
        if (problemElement) {
            problemElement.classList.add("fade-out");
            setTimeout(async () => {
                setTodayProblems((prevProblems) =>
                    prevProblems.filter((p) => p.id !== id)
                );
                setMissedProblems((prevProblems) =>
                    prevProblems.filter((p) => p.id !== id)
                );
                await handleRetryProblem(problem, updateUpcomingProblems);
            }, 500);
        }
    };

    if (allProblems.length === 0) {
        return (
            <div className="empty-state">
                <Clock className="empty-state-icon" size={32} />
                <p className="empty-state-text">No problems to review today.</p>
                <p className="empty-state-subtext">
                    Add problems that you find challenging to review later.
                </p>
            </div>
        );
    }

    return (
        <div className="problem-list-container">
            <div>

                {missedProblems?.length ? (
                    <div className="mt-2px">
                        <div className="section-title mb-3 critical-color flex-4">
                            <TriangleAlert size={16} color="#e51f1f" />
                            Missed Problems :
                        </div>
                        <div>
                            {missedProblems.map((problem) => (
                                <div
                                    key={problem.id}
                                    className="problem-card missed-problem-overload"
                                    id={`problem-${problem.id}`}
                                >
                                    <div className="problem-header">
                                        <a
                                            href={problem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="problem-title"
                                        >
                                            {problem.title}
                                        </a>
                                        <span className="problem-badge">{problem.platform}</span>
                                    </div>
                                    <div className="flex-8 mt-8px">
                                        <button
                                            className="mark-solved-btn"
                                            onClick={() => handleMarkAsSolved(problem.id)}
                                        >
                                            <div className="flex-4">
                                                <CircleCheckBig size={12} /> Mark as Solved
                                            </div>
                                        </button>
                                        <button
                                            className="mark-solved-btn bg-indigo"
                                            onClick={() => resolveAgain(problem)}
                                        >
                                            <div className="flex-4">
                                                {" "}
                                                <RefreshCcw size={12} />
                                                Resolve Again{" "}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
                <div className="section-title mt-16px">Today's Problems :</div>
                {todayProblems.length === 0 ? (
                    <div className="no-today-problems">No problems to review today.</div>
                ) : (
                    <div>
                        {todayProblems.map((problem) => (
                            <div
                                key={problem.id}
                                className="problem-card todays-problem-overload"
                                id={`problem-${problem.id}`}
                            >
                                <div className="problem-header">
                                    <a
                                        href={problem.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="problem-title"
                                    >
                                        {problem.title}
                                    </a>
                                    <span className="problem-badge">{problem.platform}</span>
                                </div>
                                <div className="flex-8 mt-8px">
                                    <button
                                        className="mark-solved-btn"
                                        onClick={() => handleMarkAsSolved(problem.id)}
                                    >
                                        <div className="flex-4">
                                            <CircleCheckBig size={12} /> Mark as Solved
                                        </div>
                                    </button>
                                    <button
                                        className="mark-solved-btn bg-indigo"
                                        onClick={() => resolveAgain(problem)}
                                    >
                                        <div className="flex-4">
                                            {" "}
                                            <RefreshCcw size={12} />
                                            Resolve Again{" "}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-10px">
                <div className="section-title">Upcoming Problems :</div>
                {Object.keys(upcomingProblems)?.length === 0 ? (
                    <div className="no-today-problems">
                        No upcoming problems to review.
                    </div>
                ) : (
                    Object.entries(upcomingProblems).map(([date, problems]) => (
                        <div key={date} className="date-group">
                            <div className="date-title">
                                <CalendarDays size={16} color="rgb(113, 113, 122)" />
                                {date}
                            </div>
                            {problems.map((problem) => (
                                <div key={problem.id} className="problem-card">
                                    <div className="problem-header">
                                        <a
                                            href={problem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="problem-title"
                                        >
                                            {problem.title}
                                        </a>
                                        <span className="problem-badge">{problem.platform}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
            {/*  */}
        </div>
    );
};

export default ProblemList;
