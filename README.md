# Taskora: Nigerian Community Task Platform

## Introduction
Taskora is a web application that helps people in Nigerian communities connect, share, and solve tasks together. Whether you need help with something or want to help others, Taskora makes it easy to post, find, and claim tasks in your area.

## Problem Statement
Many people in local communities need help with daily tasks but do not have an easy way to find trustworthy helpers nearby. Taskora solves this problem by providing a safe and simple platform where users can post tasks, offer help, and build connections in their community.

## Main Features
- **User Authentication:** Sign up and log in securely with your email and password.
- **Task Management:** Create, view, edit, delete, and claim tasks posted by others.
- **Search and Filter:** Easily search for tasks by location, category, or status.
- **User Profiles:** Manage your profile, upload a profile picture, and view your task history.
- **Responsive Design:** Works smoothly on phones, tablets, and computers.
- **Dark Mode:** Switch between light and dark themes for comfortable viewing.
- **Notifications and Error Handling:** Get clear feedback for your actions.

## How to Use Taskora
1. **Sign Up:**
   - Go to the Register page and fill in your details to create an account.
2. **Log In:**
   - Enter your email and password on the Login page to access your dashboard.
3. **Dashboard:**
   - See an overview of your activity and quick links to main features.
4. **Browse Tasks:**
   - Go to the Tasks page to see all available tasks. Use filters to find tasks by location or category.
5. **Post a Task:**
   - Click the "New Task" button, fill in the task details, and submit. Your task will appear for others to see and claim.
6. **Claim a Task:**
   - Find a task you want to help with and click "Claim". The task will be added to your claimed tasks.
7. **Edit or Delete Tasks:**
   - You can edit or delete tasks you posted from your profile or the tasks list.
8. **Profile:**
   - View and update your profile information, upload a profile picture, and see your posted and claimed tasks.
9. **Log Out:**
   - Click the logout button in the navigation to safely sign out.

## Tools and Technologies Used
- **Frontend:**
  - React 18 (with hooks)
  - Vite (for fast development and builds)
  - Tailwind CSS (for styling)
  - Framer Motion (for animations)
  - Axios (for API requests)
  - React Router (for navigation)
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT (for authentication)
  - Helmet, CORS, XSS-Clean, Rate-Limit (for security)
- **Other:**
  - ESLint (for code quality)
  - Nodemon (for backend development)

## Getting Started
### Prerequisites
- Node.js and npm installed on your computer
- MongoDB database (local or cloud, e.g., MongoDB Atlas)

### Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/taskora.git
   cd taskora
   ```
2. **Install Dependencies:**
   - For the client:
     ```bash
     cd client
     npm install
     ```
   - For the server:
     ```bash
     cd ../server
     npm install
     ```
3. **Set Up Environment Variables:**
   - In the `client` folder, create a `.env` file:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - In the `server` folder, create a `.env` file:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_uri_here
     JWT_SECRET=your_jwt_secret_here
     NODE_ENV=development
     ```
4. **Run the App:**
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - Start the frontend client (in a new terminal):
     ```bash
     cd ../client
     npm run dev
     ```
5. **Open in Browser:**
   - Go to `http://localhost:5173` (or the port shown in your terminal) to use Taskora.

## Navigating the App
- **Dashboard:** Your main page after login, showing your stats and quick links.
- **Tasks:** Browse, search, and filter all available tasks.
- **New Task:** Post a new task for others to see.
- **Profile:** Manage your account, see your posted and claimed tasks.
- **Navigation Bar:** Use the sidebar or top bar to move between pages easily.


## Preview of the App Interface (Screenshot)


## Contributing
1. Fork this repository.
2. Create a new branch for your feature or fix.
3. Make your changes and test them well.
4. Submit a pull request with a clear description of your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details. 