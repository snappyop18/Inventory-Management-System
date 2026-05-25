# Product Inventory Manager (Web CRUD Application)

A lightweight web application built to fulfill CLO-01 guidelines. Features a decoupled setup connecting an HTML5/JavaScript client to an ASP.NET Core API server, executing real operations inside a live MongoDB layer.

## Architecture & Data Flow
* **Frontend Origin:** Running on local web server architecture (`http://127.0.0.1:5500`) to comply with browser safety standards.
* **Backend API Host:** Hosted natively via ASP.NET Core Kestrel engine (`http://localhost:5107`).
* **Database Server Instance:** Managed locally via MongoDB Community Edition (`mongodb://localhost:27017`).

---

## Setup Instructions

### ### Prerequisites
* .NET 10.0 SDK or later
* MongoDB Community Server running locally (`localhost:27017`)
* VS Code **Live Server** Extension installed (or any local static file server)

### ### Step 1: Fire up Backend
1. Open your terminal in VS Code and navigate to the backend folder:
   ```bash
   cd Backend
