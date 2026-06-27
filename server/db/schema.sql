CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) CHECK (LENGTH(password) >= 8) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE books (
   id SERIAL PRIMARY KEY,
   title TEXT NOT NULL,
   author TEXT NOT NULL,
   genre TEXT NOT NULL,
   description TEXT NOT NULL,
   cover_image TEXT NOT NULL,
   created_by INTEGER REFERENCES users(id) NOT NULL,
   created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment VARCHAR(1000),
    created_at TIMESTAMP DEFAULT NOW()
    );
