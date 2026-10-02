# 🚀 Team Availability Tracker

A real-time team availability management system that allows teams to monitor member availability, update statuses, search members, and filter team members by different attributes.

## 📌 Project Overview

The **Team Availability Tracker** is a full-stack web application designed to help teams quickly understand who is available, busy, or away.

The application provides a centralized dashboard where team members can be viewed along with their:

- Availability status
- Role
- Timezone
- Last updated time

Team member statuses can be updated directly from the dashboard, and the application automatically refreshes team data periodically.

---

## ✨ Features

### 👥 Team Dashboard
- Displays all team members
- Shows total number of members
- Displays Available, Busy, and Away counts
- Clean and responsive dashboard

### 🟢 Availability Management
Team members can have one of three statuses:

- 🟢 Available
- 🔴 Busy
- 🟡 Away

Status changes are saved to the database and reflected immediately on the dashboard.

### 🔎 Search
Search team members by:

- Name
- Role

### 🎯 Status Filter
Filter team members by:

- All Status
- Available
- Busy
- Away

### 💼 Role Filter
Filter team members by:

- Design
- Product
- Engineering
- QA

### 🌍 Timezone Filter
Filter members based on their timezone:

- Europe/London
- Asia/Kolkata
- America/New_York

### 🔄 Refresh
A manual refresh button allows users to fetch the latest team information.

The dashboard also automatically refreshes team data periodically.

### 🕐 Last Updated
Each team member displays when their availability information was last updated.

---

## 🛠️ Tech Stack

### Frontend

- React
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
- PowerShell

---

## 🏗️ Project Architecture

```text
Team Availability Tracker
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── index.js
│   ├── seed.js
│   ├── team_availability_seed.json
│   ├── package.json
│   └── .gitignore
│
├── .gitignore
└── README.md