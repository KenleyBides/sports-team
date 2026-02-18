# Sports Teams API

A RESTful API built with **Node.js, Express, TypeScript, and MongoDB** for managing sports teams.

## Features

- Create, Read, Update, Delete (CRUD) teams
- Swagger documentation available at `/api-docs`
- MongoDB Atlas integration
- CORS enabled for cross-origin requests

## API Endpoints

| Method | Endpoint           | Description                  |
|--------|------------------|------------------------------|
| GET    | /api/v1/teams     | Get all teams               |
| GET    | /api/v1/teams/:id | Get a single team by ID     |
| POST   | /api/v1/teams     | Create a new team           |
| PUT    | /api/v1/teams/:id | Update a team by ID         |
| DELETE | /api/v1/teams/:id | Delete a team by ID         |

## Setup

1. Clone the repository
2. Install dependencies:  
```bash
npm install
