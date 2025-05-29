# Soccer Project

## Overview

This project is a soccer data application that utilizes the [Football Data API v4](https://api.football-data.org/v4) to fetch and display football-related data. It is structured with a clear separation between backend and frontend components.

---

## API Used

The core data for this project is powered by the Football Data API:
---

## Backend

- **Technology:** Node.js, Express
- **Purpose:** Handles all API requests to the Football Data API, processes the data, and exposes endpoints for the frontend.
- **Key Responsibilities:**
  - Securely manages the API key for `football-data.org`
  - Fetches and processes football data (matches, standings, teams, etc.)
  - Provides RESTful endpoints for frontend consumption
  - Handles any backend logic such as data transformation or caching if implemented

## Frontend

- **Technology:** React+Javascript
- **Purpose:** Provides a user interface to interact with the backend and display football data visually.
- **Key Features:**
  - Fetches football data from the backend
  - Displays leagues, matches, team details, standings, etc.
  - Interactive UI with visuals (see screenshots below)
  - Error handling and loading states for API requests
---

## Screenshots

Below are some screenshots showcasing the application:

![Screenshot 2025-05-29 220550](https://github.com/user-attachments/assets/2721a857-5fe9-42b7-9df3-62a8778ca446)
![Screenshot 2025-05-29 220603](https://github.com/user-attachments/assets/93e2ab70-9f78-4933-a845-75adfe584bf1)
![Screenshot 2025-05-29 220640](https://github.com/user-attachments/assets/f3e3c0b3-c83e-48b9-9708-dbf49a012f9a)

---

## Getting Started

### Prerequisites
- Football Data API key from [football-data.org](https://www.football-data.org/client/register)

### Setup

#### Backend

1. Clone the repository
2. Set up environment variables (API key, etc.)
3. Install dependencies
4. Run the backend server

#### Frontend

1. Navigate to the frontend directory
2. Install dependencies
3. Run the frontend development server

---
