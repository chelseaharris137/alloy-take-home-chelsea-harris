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
git clone https://github.com/chelseaharris137/alloy-take-home-chelsea-harris.git
```

3. Install frontend dependencies
```sh
cd /alloy-take-home-chelsea-harris
npm install
```

5. Install backend dependencies (Open another terminal)
```sh
cd backend
npm install
```


Backend dependencies:
```sh
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
cd backend
```

Start the Express server:
```sh
node server.js
```


The backend will run at:
```sh
http://localhost:5050
```

Expected terminal output: Server running on port 5050

2. Start the frontend (Open another terminal and navigate to the frontend directory)
```sh
npm run dev
```


The frontend will typically run at:

```sh
http://localhost:5173
```

