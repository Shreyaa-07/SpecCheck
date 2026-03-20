SpecCheck - Automated Web Accessibility Auditor

SpecCheck is a full-stack web accessibility auditor designed to help developers identify and resolve A11y issues in real-time. With a modern, responsive UI and visual data representation, auditing your web applications has never been easier.

Key Features

- **Accessibility Auditing:** Easily scan any URL for accessibility violations using axe-core and puppeteer.
- **Visual Reports:** Dynamic radial progress and impact-based categorization for quick insights.
- **Industry Standard Scoring:** Guided by the Google Lighthouse weighted per-rule algorithm.
- **Real-time Feedback:** Instant analysis and detailed violation logs for immediate remediation.
- **Responsive Design:** Built with React and Tailwind CSS for a seamless experience on any device.

Tech Stack

Frontend

- React (Vite): UI Library
- Tailwind CSS: Utility-first styling
- Chart.js: Data visualization
- Axios: HTTP Client
- Lucide Icons: Icon library

Backend

- Node.js & Express: Server-side runtime and framework
- Puppeteer: Headless browser for DOM analysis
- Axe-core: Accessibility engine
- CORS: Cross-origin resource sharing

Installation & Setup

Follow these steps to run the project locally.

1. Clone the repository

git clone <your-repo-url>
cd allylens

2. Backend Setup

Navigate to the server folder and install dependencies:

cd server
npm install

Run the backend server:

node index.js

3. Frontend Setup

Navigate to the client folder and install dependencies:

cd ../client
npm install

Run the frontend application:

npm run dev

The app should now be running on http://localhost:5173.

Deployment

Backend (Render)

The backend is deployed on Render.

- Create a Web Service on Render.
- Connect your GitHub repo.
- Set Build Command: npm install
- Set Start Command: node index.js

Frontend (Vercel)

The frontend is deployed on Vercel.

- Import the frontend directory in Vercel.
- Set Build Command: npm run build
- Set Output Directory: dist
- Deploy!
