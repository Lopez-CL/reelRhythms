# ReelRhythms

**Plan your watchlist. Own your schedule.**

ReelRhythms is a film calendar scheduling app that helps users move beyond endless watchlists by turning them into structured, downloadable viewing calendars. Search for films, organize them into seasonal calendars, and export schedules to stay accountable to your viewing goals.

> **Status:** In development — working toward MVP

---

## MVP Scope

The goal for this project is a focused MVP with three core capabilities:

1. **Secure login** — user registration and authentication
2. **Film calendar creation** — search for films and organize them into scheduled viewing calendars
3. **Calendar export** — download calendars for use in Google Calendar, Apple Calendar, etc.

### Completed

- User registration and login with profile image upload
- JWT-based authentication with HTTP-only cookies
- Protected routes for authenticated users
- Film search powered by the OMDb API
- Database models and API endpoints for film calendars

### In Progress

- Film calendar creation UI and full scheduling workflow
- Calendar export/download (.ics file generation)

---

## Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Frontend     | Next.js 15, React 19, TypeScript        |
| Backend      | Express 5, Node.js                      |
| Database     | MongoDB with Mongoose ODM               |
| Auth         | JSON Web Tokens (JWT), bcrypt           |
| External API | OMDb API (film data)                    |
| File Uploads | Multer (profile images)                 |
| Styling      | Custom CSS with container queries       |

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- **MongoDB** running locally on the default port (`27017`)
- **OMDb API key** — get one free at [omdbapi.com](https://www.omdbapi.com/apikey.aspx)

### Installation

```bash
git clone https://github.com/Lopez-CL/reelRhythms.git
cd reelRhythms/client
npm install
```

### Environment Variables

Create a `.env` file in the `client/` directory:

```
APP_KEY=your_jwt_secret
OMBD_KEY=your_omdb_api_key
```

| Variable   | Description                        |
|------------|------------------------------------|
| `APP_KEY`  | Secret key used to sign JWTs       |
| `OMBD_KEY` | API key for the OMDb film database |

### Running the App

```bash
# Development (Express + Next.js with hot reload)
npm run dev

# Production build
npm run build
npm start
```

The app runs at **http://localhost:8000** by default.

---

## Project Structure

```
reelRhythms/
└── client/
    ├── backend/
    │   ├── config/          # MongoDB & JWT configuration
    │   ├── controllers/     # Route handlers (user, film, filmCalendar)
    │   ├── models/          # Mongoose schemas
    │   ├── routes/          # Express route definitions
    │   └── utilities/       # Auth middleware, default avatar logic
    │
    ├── src/
    │   ├── app/             # Next.js App Router pages
    │   │   ├── (authenticating)/  # Login & registration routes
    │   │   ├── dashboard/         # User dashboard (protected)
    │   │   ├── schedule-films/    # Film scheduling (protected)
    │   │   └── explore-films/     # Browse calendars (protected)
    │   ├── components/      # React components (forms, nav, header)
    │   ├── hooks/           # Custom React hooks
    │   ├── types/           # TypeScript interfaces & enums
    │   └── styles/          # Global and component CSS
    │
    ├── public/              # Static assets (images, icons)
    ├── expressServer.js     # Express server entry point
    └── package.json
```

The app uses a **monolithic architecture** — the Express backend and Next.js frontend live in the same codebase. Express serves as a custom server wrapping Next.js, handling API routes and page-level auth middleware.

---

## API Endpoints

All API routes are prefixed with `/backend`.

### Users `/api/users`

| Method | Endpoint              | Auth | Description                  |
|--------|-----------------------|------|------------------------------|
| POST   | `/register`           | No   | Create a new user account    |
| POST   | `/login`              | No   | Authenticate and get token   |
| GET    | `/logout`             | No   | Clear auth cookie            |
| GET    | `/getUser/:_id`       | No   | Fetch user with calendars    |
| GET    | `/getAvatar/:_id`     | No   | Fetch user profile image     |
| GET    | `/authenticate`       | Yes  | Verify JWT token             |
| PUT    | `/updateUser/:_id`    | No   | Update user profile          |

### Films `/api/films`

| Method | Endpoint              | Auth | Description                  |
|--------|-----------------------|------|------------------------------|
| POST   | `/search`             | Yes  | Search films via OMDb API    |
| POST   | `/addFilm`            | Yes  | Save a film to the database  |
| GET    | `/getFilm/:iMDB_ID`   | Yes  | Get film details from OMDb   |

### Film Calendars `/api/filmCals`

| Method | Endpoint              | Auth | Description                  |
|--------|-----------------------|------|------------------------------|
| POST   | `/createfilmCal`      | Yes  | Create a new film calendar   |
| GET    | `/getfilmCals`        | Yes  | Fetch all film calendars     |
| GET    | `/filmCal/:_id`       | Yes  | Get a specific calendar      |

---

---

## License

This project is licensed under the [MIT License](LICENSE).
