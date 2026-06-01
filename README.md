# Inventory Management System

## Overview

A full-stack Inventory Management System built using FastAPI, React, PostgreSQL, Docker, and Docker Compose.

The application allows users to manage products, customers, and orders while automatically tracking inventory levels.

## Features

* Product Management (CRUD)
* Customer Management (CRUD)
* Order Management (CRUD)
* Automatic Inventory Tracking
* Stock Validation
* Dashboard Analytics
* Dockerized Deployment

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL (Neon)

### Frontend

* React
* Axios
* Material UI
* Recharts

### DevOps

* Docker
* Docker Compose

## Running Locally

### Backend

```bash
cd backend
source venv/Scripts/activate
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Running with Docker

```bash
docker compose build
docker compose up
```

Backend Swagger:

http://localhost:8000/docs

Frontend:

http://localhost:5173

## Author

Anirudh
