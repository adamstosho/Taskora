# 📚 Community Task-and-Help Board API Documentation

**Base URL:**  
- Local: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

---

## Authentication

### Register a New User
- **Endpoint:** `POST /auth/register`
- **Description:** Register a new user account.
- **Body Parameters:**
  | Field      | Type   | Required | Description                |
  |------------|--------|----------|----------------------------|
  | name       | String | Yes      | User's full name           |
  | email      | String | Yes      | User's email (unique)      |
  | password   | String | Yes      | Password (min 6 chars)     |
  | location   | String | Yes      | Nigerian city (see below)  |

- **Sample Request:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123",
    "location": "Lagos"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Body:**
    ```json
    {
      "success": true,
      "user": {
        "_id": "userId",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "location": "Lagos",
        "joinedAt": "2024-06-01T12:00:00.000Z",
        "role": "user",
        "profilePicture": "/uploads/profile-pictures/filename.jpg",
        "token": "JWT_TOKEN"
      }
    }
    ```
- **Errors:**  
  - 400: Email already in use, missing/invalid fields

---

### Login
- **Endpoint:** `POST /auth/login`
- **Description:** Log in with email and password.
- **Body Parameters:**
  | Field    | Type   | Required | Description         |
  |----------|--------|----------|---------------------|
  | email    | String | Yes      | User's email        |
  | password | String | Yes      | User's password     |

- **Success Response:**  
  - **Code:** 200
  - **Body:** Same as register

- **Errors:**  
  - 401: Invalid credentials

---

### Get Current User
- **Endpoint:** `GET /auth/me`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>`
- **Description:** Get the currently authenticated user's info.
- **Success Response:**
  ```json
  {
    "success": true,
    "user": {
      "_id": "userId",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "location": "Lagos",
      "joinedAt": "2024-06-01T12:00:00.000Z",
      "role": "user",
      "profilePicture": "/uploads/profile-pictures/filename.jpg"
    }
  }
  ```
- **Errors:**  
  - 401: Not authorized, token missing/invalid

---

## Tasks

### Create Task
- **Endpoint:** `POST /tasks`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body Parameters:**
  | Field       | Type   | Required | Description                |
  |-------------|--------|----------|----------------------------|
  | title       | String | Yes      | Task title                 |
  | description | String | Yes      | Task details               |
  | location    | String | Yes      | Nigerian city              |
  | category    | String | Yes      | See categories below       |

- **Success Response:**  
  - **Code:** 201
  - **Body:**
    ```json
    {
      "success": true,
      "task": {
        "_id": "taskId",
        "title": "Help with groceries",
        "description": "Need someone to buy groceries.",
        "location": "Abuja",
        "category": "Errands",
        "status": "open",
        "postedBy": "userId",
        "createdAt": "2024-06-01T12:00:00.000Z",
        "updatedAt": "2024-06-01T12:00:00.000Z"
      }
    }
    ```
- **Errors:**  
  - 400: Validation errors

---

### Get All Tasks
- **Endpoint:** `GET /tasks`
- **Description:** Retrieve all tasks.
- **Success Response:**
  ```json
  {
    "success": true,
    "count": 2,
    "tasks": [
      {
        "_id": "taskId",
        "title": "Help with groceries",
        "description": "Need someone to buy groceries.",
        "location": "Abuja",
        "category": "Errands",
        "status": "open",
        "postedBy": {
          "_id": "userId",
          "name": "Jane Doe",
          "location": "Abuja",
          "profilePicture": "/uploads/profile-pictures/filename.jpg"
        },
        "createdAt": "2024-06-01T12:00:00.000Z",
        "updatedAt": "2024-06-01T12:00:00.000Z"
      }
    ]
  }
  ```

---

### Get Single Task
- **Endpoint:** `GET /tasks/:id`
- **Description:** Retrieve a specific task by ID.
- **Success Response:**  
  - **Code:** 200
  - **Body:** Same as single task above
- **Errors:**  
  - 404: Task not found

---

### Update Task
- **Endpoint:** `PUT /tasks/:id`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>`
- **Description:** Update a task (only by the owner).
- **Body Parameters:** (any of the following)
  | Field       | Type   | Description                |
  |-------------|--------|----------------------------|
  | title       | String | Task title                 |
  | description | String | Task details               |
  | location    | String | Nigerian city              |
  | category    | String | See categories below       |
  | status      | String | open, claimed, completed, cancelled |

- **Success Response:**  
  - **Code:** 200
  - **Body:** Updated task object
- **Errors:**  
  - 403: Not authorized (not owner)
  - 404: Task not found

---

### Delete Task
- **Endpoint:** `DELETE /tasks/:id`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>`
- **Description:** Delete a task (only by the owner).
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Task deleted"
  }
  ```
- **Errors:**  
  - 403: Not authorized (not owner)
  - 404: Task not found

---

### Claim Task
- **Endpoint:** `PATCH /tasks/:id/claim`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>`
- **Description:** Claim an open task (cannot claim your own).
- **Success Response:**  
  - **Code:** 200
  - **Body:** Updated task object with `claimedBy` and `status: claimed`
- **Errors:**  
  - 400: Task not open, or trying to claim own task
  - 404: Task not found

---

## Users

### Get My Profile & Stats
- **Endpoint:** `GET /users/me`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>`
- **Description:** Get your profile, posted/claimed tasks, and stats.
- **Success Response:**
  ```json
  {
    "success": true,
    "user": {
      "_id": "userId",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "location": "Lagos",
      "joinedAt": "2024-06-01T12:00:00.000Z",
      "role": "user",
      "profilePicture": "/uploads/profile-pictures/filename.jpg",
      "postedTasksCount": 2,
      "claimedTasksCount": 1
    },
    "postedTasks": [ /* ... */ ],
    "claimedTasks": [ /* ... */ ]
  }
  ```

---

### Get a User’s Posted & Claimed Tasks
- **Endpoint:** `GET /users/:id/tasks`
- **Description:** Get all tasks posted and claimed by a specific user.
- **Success Response:**
  ```json
  {
    "success": true,
    "postedTasksCount": 2,
    "claimedTasksCount": 1,
    "postedTasks": [ /* ... */ ],
    "claimedTasks": [ /* ... */ ]
  }
  ```

---

### Upload Profile Picture
- **Endpoint:** `POST /users/me/profile-picture`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>`
- **Description:** Upload a profile picture for the current user.
- **Request:**
  - Content-Type: `multipart/form-data`
  - Body: file field named `profilePicture`
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Profile picture uploaded",
    "imageUrl": "/uploads/profile-pictures/filename.jpg"
  }
  ```
- **Errors:**
  - 400: No file uploaded or invalid file

---

## Error Response Format
All errors return structured JSON:
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```
Or for validation:
```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Valid email is required" }
  ]
}
```

---

## Enumerations
- **Locations:**  
  `"Lagos"`, `"Abuja"`, `"Ilorin"`, `"Port Harcourt"`, `"Kano"`, `"Ibadan"`, `"Enugu"`, `"Benin City"`, `"Jos"`, `"Ogbomoso"`, `"Oyo"`, `"Abeokuta"`, `"Awka"`, `"Onitsha"`, `"Nnewi"`, `"Ekwulobia"`, `"Obosi"`, `"Ikeja"`, `"Lagos Island"`, `"Lekki"`, `"Surulere"`, `"Badagry"`, `"Minna"`, `"Offa"`, `"Omu-Aran"`, `"Lafiagi"`, `"Patigi"`, `"Bida"`, `"Suleja"`, `"Kontagora"`, `"Zungeru"`, `"Other"`

- **Categories:**  
  `"Tutoring"`, `"Errands"`, `"Repairs"`, `"Transport"`, `"Volunteer"`, `"Paid"`, `"Other"`

- **Task Status:**  
  `"open"`, `"claimed"`, `"completed"`, `"cancelled"`

---

## Authentication
All private endpoints require the following header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Example Usage
**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jane","email":"jane@example.com","password":"password123","location":"Lagos"}'
```

**Get All Tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Upload Profile Picture:**
```bash
curl -X POST http://localhost:5000/api/users/me/profile-picture \
  -H 'Authorization: Bearer <JWT_TOKEN>' \
  -F 'profilePicture=@/path/to/image.jpg'
```

---

## Contact
For questions or support, open an issue or contact the maintainer. 