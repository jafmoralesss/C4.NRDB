# C4.NRDB
Repository with deliverables for Challenge 4.

# Project: Restaurant Review API

This repository contains the code service for a restaurant review application. The API is built with Node.js, Express, and MongoDB.

The application features a role-based model, distinguishing between regular users who can submit reviews and managers who have full administrative control over restaurant's data.

---
## Features

* **CRUD:**  Create, Read, Update, and Delete functionality.
* **Nested Reviews:** Users can add multiple reviews (rate and comment) to any restaurant.
* **User Authentication:** A secure registration and login system using JSON Web Tokens (JWTs).
* **Password Security:** User passwords are never stored in plain text; they are securely hashed using `bcryptjs`.
* **Role-Based Authorization:** The API distinguishes between two roles:
    * **User:** Can register, log in, and add reviews to restaurants.
    * **Manager:** Can perform all user actions, plus create, update, and delete restaurants.

---
## Repository Structure

The project is structured using the Model-View-Controller (MVC) pattern to separate concerns and improve maintainability.

* **`/controllers`**: Contains the main application logic. These files handle incoming requests, use the models to interact with the database, and send back responses.
* **`/middleware`**: Holds functions that run between the request and the controller. This is where authentication (`auth.middleware.js`) and authorization (`authManager.middleware.js`) logic resides.
* **`/models`**: Defines the database schemas and all direct interactions with the MongoDB collections.
* **`database.js`**: A dedicated module to manage the connection to the MongoDB Atlas database.
* **`index.js`**: The main entry point for the application. It initializes the Express server, sets up middleware, and connects the API routes to their respective controllers.
* **`.env`**: Stores secret environment variables, such as the database connection string and JWT secret. This file is kept private and is not committed to version control.
* **`.gitignore`**: Specifies files and folders (like `.env` and `node_modules`) that should be ignored by Git.

---
## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with MongoDB Atlas)
* **Authentication:** JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`)
* **Environment Variables:** `dotenv`

---


### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/jafmoralesss/C4.NRDB.git](https://github.com/jafmoralesss/C4.NRDB.git)
    ```

2.  **Navigate to the backend folder:**
    ```bash
    cd C4.NRDB/back 
    ```

3.  **Install NPM packages:**
    ```bash
    npm install
    ```

4.  **Create the environment file:**
    Create a new file named `.env` in the `back` folder. This file holds your secret keys and connection strings. Add the following variables, replacing the placeholder values with your own:

    ```env
    # Your MongoDB Atlas connection string
    DATABASE_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database

    # A secret key for signing JWTs (can be any random string)
    JWT_SECRET="YOUR_SUPER_SECRET_KEY"
    ```

5.  **Start the server:**
    ```bash
    node index.js
    ```
    The server will start on `http://localhost:3000`.

---
## API Endpoints

| Functionality          | Method  | URL                           | Authorization |
----------------------------------------------------------------------
| **Get All Restaurants**| `GET`   | `/api/restaurants`            | Public        | 
| **Create Restaurant**  | `POST`  | `/api/restaurants`            | Manager       |
| **Update Restaurant**  | `PUT`   | `/api/restaurants/:id`        | Manager       |
| **Delete Restaurant**  | `DELETE`| `/api/restaurants/:id`        | Manager       |
| **Add a Review**       | `POST`  | `/api/restaurants/:id/reviews`| Any User      |
| **Register User**      | `POST`  | `/api/users/register`         | Public        |
| **Login User**         | `POST`  | `/api/users/login`            | Public        |
