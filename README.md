# Red Wine

**ExpressJS Backend API with Sequelize, MySQL, Docker, and Swagger**

## Introduction

This project is a robust and scalable backend API built with ExpressJS, Sequelize, and MySQL.
Docker is used for containerization to ensure consistent environments across different stages of development, testing, and production. Swagger is integrated for API documentation, making it easier for developers to understand and interact with the API.

## Features

-   **Authentication**: Secure login and registration using JWT.
-   **Role-Based Access Control (RBAC)**: Fine-grained access control for different user roles (admin, end-user).
-   **API Documentation**: Interactive API documentation using Swagger.
-   **Containerization**: Dockerized setup for consistent development and deployment environments.
-   **Validation and Error Handling**: Robust validation using Express Validator and centralized error handling.
-   **Third-Party API Integration**: Seamless integration with various external APIs for extended functionality.
-   **WebSocket Support**: Real-time communication capabilities using WebSockets.

## Technologies Used

-   **Node.js**: JavaScript runtime.
-   **Express.js**: Web framework for Node.js.
-   **Sequelize**: ORM for SQL databases.
-   **MySQL**: Relational database.
-   **Docker**: Containerization platform.
-   **Swagger**: API documentation tool.
-   **JWT**: JSON Web Token for secure authentication.
-   **Express Validator**: Middleware for validation.
-   **Nodemon**: Tool for automatically restarting the server during development.
-   **Babel**: JavaScript compiler for using ES6+ features.
-   **Jest**: Testing frameworks for unit and integration tests.

## Prerequisites

-   **Node.js** (v20.10.0 or higher)
-   **Docker** (v26.1.4 or higher)
-   **MySQL** (v8.3 or higher)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/red-wine-backend.git
cd red-wine-backend
```

### Environment Variables

Create a .env file in the root directory and configure the following environment variables

### Docker Setup

Build and start the Docker containers:

```bash
docker-compose up --build
```

### Run Migrations

```bash
docker-compose exec your-image npm run migrate:up
```

### Seed the Database

```bash
docker-compose exec your-image npm run seed:up
```

### Start the Server

```bash
docker-compose up
```

The server will be running at http://localhost:6969.

## API Documentation

Swagger UI is available at http://localhost:6969/api-docs.

## Folder Structure

```bash
📦red-wine-backend
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┣ 📂constants
 ┃ ┣ 📂controllers
 ┃ ┣ 📂di
 ┃ ┣ 📂documents
 ┃ ┣ 📂middlewares
 ┃ ┣ 📂migrations
 ┃ ┣ 📂models
 ┃ ┣ 📂public
 ┃ ┣ 📂repositories
 ┃ ┣ 📂requests
 ┃ ┣ 📂routes
 ┃ ┣ 📂seeders
 ┃ ┣ 📂services
 ┃ ┣ 📂storage
 ┃ ┣ 📂utils
 ┃ ┣ 📂views
 ┃ ┗ 📜index.js
 ┣ 📂tests
 ┣ 📜.babelrc
 ┣ 📜.env
 ┣ 📜.env-example
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜.sequelizerc
 ┣ 📜docker-compose.yml
 ┣ 📜Dockerfile
 ┣ 📜jsconfig.json
 ┣ 📜nodemon.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```

## Scripts

-   npm start: Start the server.
-   npm test: Run tests with Jest

## Contribution

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is proprietary and confidential. Unauthorized copying or distribution of this file, via any medium, is strictly prohibited.
