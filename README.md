# DSA Partner

A Chrome Extension for scheduling and tracking Data Structures and Algorithms (DSA) problems from LeetCode and GeeksforGeeks. Built with React and Manifest V3, DSA Partner helps you stay consistent with spaced-repetition-based problem review — directly inside your browser.

Published on the Chrome Web Store with a 4.8 user rating.

---

## Overview

DSA Partner injects a floating panel into LeetCode and GeeksforGeeks pages, allowing you to bookmark problems as you solve them and review them on a scheduled interval. The extension tracks which problems are due today, which are upcoming, and which have been missed — giving you a clear picture of your revision status at any time.

---

## Features

- **One-click problem capture** — Automatically detects the problem title, URL, and platform when you are on a LeetCode or GeeksforGeeks problem page.
- **Spaced repetition scheduling** — Problems are scheduled for review after a configurable interval (default: 4 days). Each review cycle resets the interval.
- **Review dashboard** — Problems are grouped into three categories: Missed, Today, and Upcoming.
- **Mark as Solved / Resolve Again** — Dismiss a problem permanently or reschedule it for another review cycle.
- **Configurable review interval** — Set your preferred review cadence (1–30 days) from the Settings panel.
- **Feedback form** — Submit feature requests or bug reports directly from within the extension via EmailJS.
- **Fully offline** — All data is stored locally using the Chrome Storage API. No account or backend required.

---

## Technology Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 7 with `@crxjs/vite-plugin` |
| Extension API | Chrome Manifest V3 |
| Storage | `chrome.storage.local` |
| Date Handling | `date-fns` |
| Icons | Lucide React, React Icons |
| Feedback Delivery | EmailJS (`@emailjs/browser`) |
| Styling | Vanilla CSS |

---

## How It Works

1. Navigate to any problem page on LeetCode or GeeksforGeeks.
2. Click the floating DSA Partner button that appears on the page.
3. Switch to the **Add** view — the problem title, URL, and platform are auto-filled from the current page URL.
4. Submit the form to schedule the problem for review.
5. On the scheduled review date, the problem appears under **Today's Problems** in the dashboard.
6. Mark it as **Solved** to remove it, or **Resolve Again** to reschedule it for another review cycle.

---

## Storage Schema

Each problem entry stored in `chrome.storage.local` follows this structure:

```json
{
  "id": "1713484800000-abc123xyz",
  "title": "Two Sum",
  "url": "https://leetcode.com/problems/two-sum/",
  "platform": "LeetCode",
  "dateAdded": 1713484800000,
  "nextReviewDate": 1713830400000
}
```

The review interval is stored as a separate key (`dsa_partner_review_days`) and defaults to `4` days.

---

## Local Development

**Prerequisites:** Node.js 18+, npm or yarn

### Install dependencies

```bash
npm install
# or
yarn install
```

### Start the Vite dev build (watch mode)

```bash
npm run dev
# or
yarn dev
```

### Build for production

```bash
npm run build
# or
yarn build
```

The compiled extension will be output to the `dist/` directory.

### Load the extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select the `dist/` folder.
4. Navigate to a LeetCode or GeeksforGeeks problem page to test the floating panel.

---

## Permissions

| Permission | Purpose |
|---|---|
| `storage` | Persist problem data and settings locally via `chrome.storage.local` |

The extension does not collect, transmit, or store any user data on external servers. All problem records remain on the user's local machine.

---

## Publishing

The extension is available on the [Chrome Web Store](https://chromewebstore.google.com/detail/dsa-partner/mbfpkgojkdhbeohcaldjojfhehcbncea). Current version: **1.0.5**.

---