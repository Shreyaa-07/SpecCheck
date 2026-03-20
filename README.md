# SpecCheck 🔍

SpecCheck is a premium, automated web accessibility auditor designed for developers to identify and resolve A11y issues in real-time. Using industry-standard algorithms, it provides deep DOM analysis and dynamic visualizations to ensure your web applications are accessible to everyone.

## Key Features

- **Standardized Health Scoring:** Implements the **Google Lighthouse** weighted per-rule algorithm for accurate, industry-standard accessibility metrics.
- **Axe-core Integration:** Powered by the industry-leading `axe-core` and `puppeteer` engines for deep, automated DOM analysis.
- **Visual Reports:** Dynamic SVG Radial Progress interface and interactive charts to visualize your application's accessibility Health.
- **Impact-Based Categorization:** Automatically groups violations by severity (Critical, Serious, Moderate, Minor) for efficient remediation.
- **Sticky UI Dashboard:** A high-performance, real-time interface that keeps analytics visible while you review detailed violation logs.
- **Protocol-Agnostic Audit:** Intelligent URL handler that automatically sanitizes inputs and supports bare domain scanning.

## Tech Stack

### Frontend
- **React (Vite):** Core UI Framework for high performance.
- **Tailwind CSS:** Modern utility-first styling for a premium look.
- **Chart.js:** Data visualization for accessibility trends and distributions.
- **Lucide Icons:** Clean, consistent iconography throughout the dashboard.
- **Axios:** Reliable HTTP client for backend communication.

### Backend
- **Node.js & Express:** Robust server-side runtime and framework.
- **Puppeteer:** Headless browser control for real-world DOM simulation.
- **Axe-core:** The world's leading accessibility testing engine.
- **CORS:** Secure cross-origin resource sharing.

## Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd allylens
```

### 2. Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```
Run the backend server:
```bash
node index.js
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
Navigate to the client folder and install dependencies:
```bash
cd ../client
npm install
```
Run the frontend application:
```bash
npm run dev
```
The application should now be running on `http://localhost:5173`.

## Deployment

### Backend (Render)
- Create a Web Service on Render.
- Connect your repository.
- Build Command: `npm install`
- Start Command: `node index.js`
- Ensure node version is compatible with Puppeteer requirements.

### Frontend (Vercel/Netlify)
- Connect your repository and select the `client` directory.
- Build Command: `npm run build`
- Output Directory: `dist`
- Set `VITE_API_URL` to your backend service URL.
