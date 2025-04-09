
export const STORAGE_KEY = 'dsa_memoizer_problems';
const REVIEW_INTERVAL_DAYS = 4;
const MILLISECONDS_PER_DAY = 86400000;

export const setToMidnight = (timestamp) => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const getAllProblems = async() => {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      resolve(result[STORAGE_KEY] || []);
    });
  });
};

const saveProblems = async(problems) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: problems }, () => {
      resolve();
    });
  });
};

export const addProblem = async ({ title, url, platform }) => {
  const problems = await getAllProblems();
  
  const existingProblem = problems.find(p => p.url === url);
  if (existingProblem) {
    return existingProblem;
  }
  
  const now = setToMidnight(Date.now());;
  
  const newProblem = {
    id: `${now}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    url,
    dateAdded: now,
    nextReviewDate: now + (REVIEW_INTERVAL_DAYS * MILLISECONDS_PER_DAY),
    platform,
  };
  
  problems.push(newProblem);
  await saveProblems(problems);
  
  return newProblem;
};

export const deleteProblem = async(id) => {
  const problems = await getAllProblems();
  const filteredProblems = problems.filter(p => p.id !== id);
  
  if (filteredProblems.length === problems.length) {
    return false;
  }
  
  await saveProblems(filteredProblems);
  return true;
};

export const handleRetryProblem = async (problem, updateUpcomingProblems) => {
  const {id, title, url, platform} = problem;
  const problems = await getAllProblems();
  const filteredProblems = problems.filter(p => p.id !== id);
  const now = setToMidnight(Date.now());;
  
  filteredProblems.push({
    id: `${now}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    url,
    dateAdded: now,
    nextReviewDate: now + (REVIEW_INTERVAL_DAYS * MILLISECONDS_PER_DAY),
    platform,
  })
  await saveProblems(filteredProblems);
  updateUpcomingProblems(filteredProblems, now);
  return true;
}