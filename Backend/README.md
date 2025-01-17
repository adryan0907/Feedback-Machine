# Quiz and Cell Management API

The Quiz and Cell Management API is a Spring Boot application designed to manage quizzes and a grid of cells. It provides robust RESTful endpoints for creating, reading, updating, and deleting quizzes, questions, answers, and cells. The project serves as a backend system for applications requiring quiz-based functionality and dynamic grid cell management.

---

## Project Purpose

This project aims to:
- Simplify the management of quizzes and related data (questions and answers).
- Provide a flexible solution for managing grid cells with customizable properties, such as color.
- Demonstrate efficient REST API development using Spring Boot and best practices in backend design.

---

## Features

### Quiz Management:
- Full CRUD (Create, Read, Update, Delete) operations for quizzes.
- Dynamic management of questions and answers within quizzes.
- Efficient database handling for storing and retrieving quiz data.

### Cell Management:
- CRUD operations for a grid of cells.
- Support for assigning and managing cell attributes, such as colors.

### Additional Features:
- **H2 Database**: Utilizes an in-memory H2 database for quick setup and testing.
- **OpenAPI (Swagger UI)**: Automatically generated API documentation for easier integration and testing.

---

## Technologies Used

- **Spring Boot**: Framework for building Java-based RESTful APIs.
- **JPA (Hibernate)**: Manages database interactions with an object-relational mapping (ORM) approach.
- **H2 Database**: Provides a lightweight in-memory database for testing and development.
- **Gradle**: Build tool for managing dependencies and project structure.
- **Swagger UI**: Documentation tool for exploring and testing APIs directly from the browser.

---

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Feedback-Machine-Vladyslav_backend/Backend
   ```

3. Build the project:
   ```bash
   ./gradlew build
   ```

4. Run the application:
   ```bash
   ./gradlew bootRun
   ```

5. Access the API at:
   - `http://localhost:8080`

---

## Accessing Swagger UI

Open your browser and navigate to:
```
http://localhost:8080/swagger-ui/index.html
```
This interface provides a user-friendly way to explore and test the available APIs.

---

## Future Enhancements

The project is designed to be modular and extensible. Possible future enhancements include:
- Integration with external databases for persistent storage.
- Authentication and authorization for API endpoints.
- Extended features for cell customization and quiz analytics.

Feel free to contribute or suggest new features through pull requests or issue reports.
