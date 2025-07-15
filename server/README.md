# Community Task-and-Help Board Backend

A Node.js/Express/MongoDB backend for a Nigerian-local MERN app where users post and claim local tasks.

## Features
- JWT authentication (register, login, get current user)
- Task CRUD and claim logic
- User profile and stats
- Input validation, error handling, security middlewares
- Ready for deployment to Render, Railway, or Heroku

## Folder Structure
```
server/
├── config/
│   └── db.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env
├── server.js
```

## Setup
1. **Clone the repo**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a `.env` file** in `server/`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri_here
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```
4. **Run locally**
   ```bash
   npm run dev
   ```

## Deployment
- **Render/Railway/Heroku:**
  - Set environment variables in the dashboard
  - Set build/start commands:
    - Build: `npm install`
    - Start: `node server.js`
  - For fullstack: serve frontend from `/client/build` (see `server.js`)

## API Endpoints
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks
- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/claim`

### Users
- `GET /api/users/me`
- `GET /api/users/:id/tasks`

## Dev Dependencies
- `nodemon` for development

## Security
- Helmet, CORS, rate-limit, xss-clean

## License
MIT 