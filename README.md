# ⚽ Soccer Project

A full-stack web application that delivers live and historical soccer data using the [Football Data API v4](https://api.football-data.org/v4). The project is cleanly architected with **backend** and **frontend** separation, offering an interactive, visually rich experience for football enthusiasts.

---

## API Used

All football data in this app is powered by the robust [Football Data API](https://api.football-data.org/v4), enabling access to:

- Live & scheduled matches
- Standings and statistics
- Teams, squads, and more

---

## Backend

- **Stack:** Node.js, Express
- **Purpose:** Acts as a secure middle layer between the Football Data API and the frontend.
- **Responsibilities:**
  - Manages and protects the API key for [football-data.org](https://football-data.org)
  - Fetches, processes, and transforms football data (matches, standings, teams, etc.)
  - Exposes clean RESTful endpoints for the frontend
  - Handles backend logic such as data transformation or caching (if implemented)

---

## Frontend

- **Stack:** React + JavaScript
- **Purpose:** Presents an intuitive and interactive user interface for exploring football data.
- **Features:**
  - Fetches football data from the backend
  - Visualizes leagues, matches, team details, standings, and more
  - Responsive UI with engaging visuals (see screenshots)
  - Robust error handling and loading states for API requests

---

## Screenshots

Explore the UI in action:

![Screenshot 2025-05-29 220550](https://github.com/user-attachments/assets/2721a857-5fe9-42b7-9df3-62a8778ca446)
![Screenshot 2025-05-29 220603](https://github.com/user-attachments/assets/93e2ab70-9f78-4933-a845-75adfe584bf1)
![Screenshot 2025-05-29 220640](https://github.com/user-attachments/assets/f3e3c0b3-c83e-48b9-9708-dbf49a012f9a)

---

## Getting Started

### Prerequisites

- A Football Data API key ([register here](https://www.football-data.org/client/register))
- Node.js and npm installed

---
