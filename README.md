# Alloy Applicant Evaluation Application

A React application integrated with the Alloy sandbox API to collect applicant information and submit applicants for evaluation.

## Tech Stack
 * Frontend: React.js, Vite
 * Backend: Node.js, Express.js
 * API: Alloy Sandbox API
 * Authentication: HTTP Basic Authentication
 * Environment Variables: dotenv


## Prerequisites

Before running the application, make sure you have installed:

 * Node.js (v18 or later recommended)
 * npm
 * Alloy sandbox workflow credentials

## Installation
1. Clone the repository
```sh
bash
git clone <repository-url>
cd my-project
```

3. Install frontend dependencies
```sh
bash
cd frontend
npm install
```

5. Install backend dependencies (Open another terminal)
```sh
bash
cd backend
npm install
```


Backend dependencies:
```sh
bash
npm install express cors dotenv
```

## Environment Configuration

Create a .env file inside the backend directory:
```sh
env
PORT=5050

ALLOY_BASE_URL=https://sandbox.alloy.co

ALLOY_WORKFLOW_TOKEN=your_workflow_token
ALLOY_WORKFLOW_SECRET=your_workflow_secret
```
Replace the credential placeholders with the workflow token and secret provided by Alloy.

Important: Never expose Alloy credentials in the React frontend or commit your .env file to version control.

## Running the Application

The frontend and backend must run simultaneously in separate terminals.

1. Start the backend (Open a terminal and navigate to the backend directory)
```sh
bash
cd backend
```

Start the Express server:
```sh
bash
node server.js
```


The backend will run at:
```sh
http://localhost:5050
```

Expected terminal output: Server running on port 5050

2. Start the frontend (Open another terminal and navigate to the frontend directory)
```sh
bash
npm run dev
```


The frontend will typically run at:

```sh
http://localhost:5173
```

