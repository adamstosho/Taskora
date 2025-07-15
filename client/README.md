# Taskora - Nigerian Community Task Platform

A modern, beautiful frontend for connecting Nigerian communities through task sharing and mutual help.

## Features

- **Authentication**: Secure login/register with JWT tokens
- **Task Management**: Create, view, edit, delete, and claim tasks
- **Advanced Filtering**: Search by location, category, and status
- **User Profiles**: Profile management with picture upload
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: Full dark mode support
- **Smooth Animations**: Powered by Framer Motion

## Tech Stack

- **React 18** - Modern functional components with hooks
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Reusable UI components
│   ├── layout/         # Layout components
│   └── tasks/          # Task-related components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── api/                # API client and endpoints
├── constants/          # Constants and enums
└── utils/              # Utility functions
```

## API Integration

The frontend integrates with the backend API using:
- JWT authentication with automatic token management
- Axios interceptors for request/response handling
- Error handling and loading states
- Optimistic UI updates

## Features Overview

### Authentication
- Register/login with email and password
- JWT token storage and management
- Protected routes and automatic redirects

### Task Management
- Create tasks with title, description, location, and category
- View all tasks with filtering and search
- Claim tasks from other users
- Edit and delete your own tasks

### User Profile
- View profile statistics
- Upload profile pictures
- See posted and claimed tasks
- Edit profile information

### UI/UX
- Clean, modern Nigerian-inspired design
- Smooth animations and micro-interactions
- Responsive layout for all screen sizes
- Dark mode support
- Loading states and error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.