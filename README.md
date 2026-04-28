# Sound Groove Music API

**Creator:** Jose Corril

**Description:** A REST API built with Node.js, Express, and Sequelize for a music platform. This project supports user registration, JWT authentication, role-based access control, track and artist management, and admin administration.

## Features

- REST API using Node.js and Express
- Sequelize ORM with PostgreSQL / SQLite support
- JWT-based authentication with `register` and `login`
- Role-based authorization: `listener`, `artist`, `admin`
- CRUD operations for `User`, `Artist`, and `Track`
- Public and authenticated routes with proper HTTP status codes
- Unit tests with Jest and Supertest
- Render deployment ready with `render.yaml` and Node version pinning

## Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd soundgroovemusicAPI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment example and configure your values:

   ```bash
   cp .env.example .env
   ```

4. Set required environment variables in `.env`:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL` (optional)
   - `NODE_ENV` (optional)
5. Start the app locally:

   ```bash
   npm run dev
   ```

## Environment Variables

```env
DATABASE_URL=sqlite:./database.sqlite
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## Running Tests

```bash
npm test
```

The test suite uses Jest and Supertest to cover authentication and RBAC behavior.

## Deployment on Render

- Render uses `npm install` and `npm start`
- The project includes `render.yaml`
- Node version is pinned to `24.14.1`
- Ensure Render environment variables are configured:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `FRONTEND_URL` (optional)

## API Endpoints

### Authentication

- `POST /auth/register`
  - Request: `{ username, email, password, role }`
  - Roles: `listener`, `artist`, `admin`
- `POST /auth/login`
  - Request: `{ email, password }`
  - Response: `{ token }`

### Public routes

- `GET /public/tracks`
- `GET /public/artists`

### Track management

- `GET /tracks`
- `GET /tracks/:id`
- `POST /tracks` (artist or admin)
- `PUT /tracks/:id` (artist or admin)
- `DELETE /tracks/:id` (artist or admin)

### Artist management

- `GET /artist/me` (artist)
- `GET /artist` (artist)
- `POST /artist` (artist)
- `PUT /artist/:id` (artist or admin)
- `DELETE /artist/:id` (artist or admin)
- `GET /artist-only/tracks` (artist)
- `GET /artist-only/stats` (artist)

### User / admin management

- `GET /admin/users` (admin)
- `GET /admin/users/:id` (admin)
- `POST /admin/users` (admin)
- `PUT /admin/users/:id` (admin)
- `DELETE /admin/users/:id` (admin)
- `GET /admin/artists` (admin)
- `GET /admin/artists/:id` (admin)
- `DELETE /admin/artists/:id` (admin)

### Profile & protected routes

- `GET /profile` (authenticated)
- `POST /logout`
- `GET /protected` (authenticated)

## Role Definitions

- `listener` – default user role, can view public tracks and artists
- `artist` – can manage artist profile and create/update/delete tracks
- `admin` – can manage users and artists and access admin-only endpoints

## Notes

- The API uses JWT in the `Authorization: Bearer <token>` header.
- For production deployments, use `DATABASE_URL` pointing to a Postgres database.
- The local default is SQLite via `database.sqlite`.
