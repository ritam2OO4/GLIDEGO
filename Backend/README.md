
<!-- Cmd+Shift+V for document view -->

# User Authentication Module

This project contains a user authentication module implemented with Node.js, Express, MongoDB, and related tools. It includes functionality for user registration, user login, password hashing, token generation, and validation.

## Features
- **User Registration**
  - Validates user input using `express-validator`.
  - Hashes passwords using `bcrypt` before storing them.
  - Generates JWT tokens for authenticated users.

- **User Login**
  - Authenticates users using email and password.
  - Issues JWT tokens upon successful authentication.

- **Password Hashing**
  - Ensures secure storage of user passwords.

- **JWT Token Generation**
  - Issues JSON Web Tokens for user authentication and authorization.

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- A `.env` file containing the following environment variables:
  ```env
  JWT_SECRET=<your_jwt_secret>
  MONGO_URI=<your_mongodb_connection_uri>
  ```

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file with appropriate values.

4. Start the server:
   ```bash
   npm start
   ```

## Project Structure
```
project_root/
├── Controllers/
│   └── userController.js
├── ModelsSchema/
│   └── userModel.js
├── Routes/
│   └── authRoutes.js
├── Services/
│   └── userService.js
├── .env
├── server.js
└── README.md
```

### Explanation
1. **`userModel.js`**
   - Defines the Mongoose schema for users.
   - Implements methods for password hashing, token generation, and password comparison.

2. **`authRoutes.js`**
   - Contains route definitions for user-related operations, such as registration and login.
   - Uses `express-validator` for input validation.

3. **`userService.js`**
   - Contains a `createUser` function for creating new user records in the database.

4. **`userController.js`**
   - Contains the controller logic for user registration and login.
   - Validates incoming requests and invokes the service layer.

## API Endpoints

### POST `users/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Validation**:
  - `firstName`: At least 3 characters.
  - `email`: Must be a valid email.
  - `password`: At least 8 characters.

- **Response**:
  - **Success**: 201 Created
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "<user_id>",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "johndoe@example.com"
      }
    }
    ```
  - **Failure**: 400 Bad Request (Validation errors)
    ```json
    {
      "errors": [
        { "msg": "First Name must contain at least 3 characters" },
        { "msg": "Invalid email" }
      ]
    }
    ```

### POST `users/login`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Validation**:
  - `email`: Must be a valid email.
  - `password`: Cannot be empty.

- **Response**:
  - **Success**: 200 OK
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "_id": "<user_id>",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "johndoe@example.com"
      }
    }
    ```
  - **Failure**: 401 Unauthorized (Invalid credentials)
    ```json
    {
      "errors": [
        { "msg": "Invalid email or password" }
      ]
    }
    ```

## Error Handling
- The module uses Express's error-handling middleware to catch and process unexpected errors.
- Validation errors are returned with a 400 status code.
- Authentication errors return a 401 status code.

## Dependencies
- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building APIs.
- **Mongoose**: ODM for MongoDB.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating JWT tokens.
- **express-validator**: Middleware for request validation.

## License
This project is licensed under the MIT License.

