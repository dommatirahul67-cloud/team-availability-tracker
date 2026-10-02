# 🚀 Team Availability Tracker

A real-time team availability management system built with **React, Node.js, Express, and Supabase**.

The application allows teams to monitor member availability, update statuses, search team members, filter members by status, and view the last updated time from a centralized dashboard.

---

## 📌 Project Overview

The **Team Availability Tracker** is a full-stack web application designed to make it easy for teams to understand who is:

- 🟢 Available
- 🔴 Busy
- 🟡 Away

Team members can update their availability directly from the dashboard, and the application automatically refreshes the latest team information.

---

## ✨ Features

- 👥 View all team members
- 🟢 Available / 🔴 Busy / 🟡 Away status tracking
- 🔄 Real-time status updates
- 🔍 Search members by name or role
- 🎯 Filter members by availability status
- 📊 Dashboard statistics
- 🌐 Display member timezone
- 💼 Display member role
- 🕐 Display last updated time
- 🔄 Manual refresh button
- ⏱️ Automatic data refresh
- 📱 Responsive user interface
- 🔐 Secure environment variable configuration
- 🗄️ Supabase PostgreSQL database
- 🔌 REST API using Express

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- CORS
- dotenv

### Database

- Supabase
- PostgreSQL

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

## 📁 Project Structure

```text
team-availability-tracker/
│
├── backend/
│   ├── .gitignore
│   ├── index.js
│   ├── seed.js
│   ├── package.json
│   ├── package-lock.json
│   └── team_availability_seed.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

🗄️ Database
The application uses a Supabase PostgreSQL table called:
team_members

Table Fields
Field	Type	Description
id	bigint	Unique member ID
name	text	Team member name
role	text	Team member role
status	text	Current availability status
timezone	text	Member timezone
created_at	timestamptz	Record creation time
updated_at	timestamptz	Last status update time


Allowed Statuses
Available
Busy
Away

🔌 API Endpoints
1. Health Check
GET /api/health

Used to verify that the backend server is running.
Example response:
{
  "success": true,
  "message": "Team Availability Tracker backend is running!"
}

2. Get Team Members
GET /api/team-members

Returns all team members stored in the Supabase database.
3. Update Member Status
PUT /api/team-members/:id/status

Updates the availability status of a specific team member.
Example request:
{
  "status": "Available"
}

Supported values:
Available
Busy
Away

⚙️ Environment Variables
The backend requires environment variables to connect to Supabase.
Create a file named:
backend/.env

Add:
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=5000
FRONTEND_URL=http://localhost:5173

Replace the placeholder values with your own Supabase project details.

🔒 Security
Never upload the .env file to GitHub.
Never expose your:
SUPABASE_SERVICE_ROLE_KEY

The .gitignore files are configured to prevent environment files and node_modules from being uploaded.
📦 Installation
Clone the repository
git clone https://github.com/dommatirahul67-cloud/team-availability-tracker.git

Move into the project:
cd team-availability-tracker

🔧 Backend Setup
Open a terminal and navigate to:
cd backend

Install dependencies:
npm install

Create the .env file and configure the Supabase credentials.
Then start the backend:
node index.js

The backend will run on:
http://localhost:5000

Health check:
http://localhost:5000/api/health

🌐 Frontend Setup
Open another terminal.
Navigate to:
cd frontend

Install dependencies:
npm install

Start the development server:
npm run dev

Vite will display the local development URL in the terminal.
Usually it will be:
http://localhost:5173

If port 5173 is already being used, Vite may automatically use another port such as:
http://localhost:5174

▶️ Running the Application
Two terminals are required.
Terminal 1 — Backend
cd backend
node index.js

Terminal 2 — Frontend
cd frontend
npm run dev

Then open the frontend URL displayed by Vite in your browser.
🌱 Database Seed Data
The project includes sample team member data in:
backend/team_availability_seed.json

The seed file contains sample team members with different:
- Names
- Roles
- Availability statuses
- Timezones
To seed the database:
cd backend
node seed.js

The seed script inserts the sample team member records into the Supabase team_members table.
📊 Dashboard
The dashboard displays:
- Total team members
- Available members
- Busy members
- Away members
Each member card displays:
- Member name
- Role
- Current status
- Timezone
- Last updated time
- Status update controls
🔍 Search and Filtering
Users can search team members using:
Name
Role

The dashboard also supports filtering by:
All Status
Available
Busy
Away

🔄 Automatic Refresh
The application periodically fetches the latest team member information from the backend.
A manual Refresh button is also available to retrieve the latest data immediately.
🕐 Last Updated Tracking
Whenever a team member's status is changed, the backend updates the:
updated_at

timestamp.
The frontend converts this timestamp into a readable format such as:
Just now
5 minutes ago
2 hours ago

🔐 Security Considerations
The project follows basic security practices:
- Environment variables are used for Supabase credentials.
- .env files are excluded from Git.
- Supabase service-role credentials are not stored in frontend code.
- node_modules directories are excluded from Git.
- API status values are validated by the backend.
🚀 Future Improvements
Possible future enhancements include:
- 👤 User authentication
- 🧑‍💼 Admin dashboard
- 🔔 Availability notifications
- 📅 Availability scheduling
- 📈 Team availability analytics
- 🕒 Timezone-aware working hours
- 👥 Team and department management
- 🌍 Production deployment
- 📱 Progressive Web App support
🎯 Project Purpose
The main purpose of this project is to provide a simple centralized system for tracking team availability and making collaboration easier.
Instead of asking team members individually about their availability, the team can use a single dashboard to view and update their current status.
👨‍💻 Author
Dommati Rahul
B.Tech — Computer Science & Engineering (AI & ML)
📄 License
This project is created for educational and project-development purposes.