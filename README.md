# Margins — Books Review App

A full-stack web application for discovering and reviewing books. Users can
browse books, write reviews, and manage their own book entries.

**Live demo:** https://margins-books-app.netlify.app

## Tech Stack

**Frontend**

- React + Vite
- Tailwind CSS
- React Router

**Backend**

- Node.js + Express
- PostgreSQL (raw SQL, no ORM)
- JWT authentication
- bcrypt password hashing

## Features

- User registration and login with JWT auth
- Browse all books
- View book details and reviews
- Add, edit and delete your own books
- Write and delete your own reviews with 1-5 star rating
- Protected routes — only logged-in users can add books or reviews
- Ownership checks — users can only edit/delete their own content
- Responsive design with mobile hamburger menu

## Running locally

**Backend**

```bash
cd server
npm install
# Create .env with: PORT, JWT_SECRET, DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, CLIENT_URL
npm start
```

**Frontend**

```bash
cd client
npm install
# Create .env with: VITE_API_URL=http://localhost:3000
npm run dev
```

## API Endpoints

| Method | Endpoint                     | Description             | Auth |
| ------ | ---------------------------- | ----------------------- | ---- |
| POST   | /auth/register               | Register a new user     | No   |
| POST   | /auth/login                  | Login and get JWT token | No   |
| GET    | /books                       | Get all books           | No   |
| GET    | /books/:id                   | Get a single book       | No   |
| POST   | /books                       | Add a new book          | Yes  |
| PUT    | /books/:id                   | Update a book           | Yes  |
| DELETE | /books/:id                   | Delete a book           | Yes  |
| GET    | /books/:id/reviews           | Get reviews for a book  | No   |
| POST   | /books/:id/reviews           | Add a review            | Yes  |
| DELETE | /books/:id/reviews/:reviewId | Delete a review         | Yes  |
