# SpecCheck - Automated Web Accessibility Auditor

SpecCheck is a full-stack web accessibility auditor designed to help developers identify and resolve A11y issues in real-time. With a modern, responsive UI and visual data representation, auditing your web applications has never been easier.

##  Key Features

*   **Accessibility Auditing**: Easily scan any URL for accessibility violations using axe-core and puppeteer.
*   **Visual Reports**: Dynamic radial progress and impact-based categorization for quick insights.
*   **Industry Standard Scoring**: Guided by the Google Lighthouse weighted per-rule algorithm.
*   **Real-time Feedback**: Instant analysis and detailed violation logs for immediate remediation.
*   **Responsive Design**: Built with React and Tailwind CSS for a seamless experience on any device.

##  Tech Stack

### Frontend
*   **React**: UI Library
*   **Tailwind CSS**: Utility-first styling
*   **Chart.js**: Data visualization
*   **Axios**: HTTP Client
*   **Lucide Icons**: Icon library

### Backend
*   **Node.js & Express**: Server-side runtime and framework
*   **Puppeteer**: Headless browser for DOM analysis
*   **Axe-core**: Accessibility engine
*   **CORS**: Cross-origin resource sharing

##  Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone <your-repo-url> speccheck
cd speccheck
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

The app should now be running on `http://localhost:5173`.

## Deployment

### Backend (Render)
The backend is deployed on Render.
1.  Create a Web Service on Render.
2.  Connect your GitHub repo.
3.  Set Build Command: `npm install`
4.  Set Start Command: `node index.js`

### Frontend (Vercel)
The frontend is deployed on Vercel.
1.  Import the `client` directory in Vercel.
2.  Set Build Command: `npm run build`
3.  Set Output Directory: `dist`
4.  Deploy!
