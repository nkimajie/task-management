
# Task Management Assessment

### Task Overview

This project is a Task Management system implemented using **NestJS**. The system includes user management, task management, tagging, commenting, and notification features.

## Features

### 1. User Management
- **Registration and Login**: Implemented with JWT authentication.
- **User Roles**: 
  - **Admin**: Has the ability to manage all aspects of the system.
  - **Regular User**: Limited to managing their own tasks and comments.
- **Admin Creation**: Only Admins have the authority to create other Admins.

### 2. Task Management
- **Task Creation**: Users can create tasks with a title, description, due date, and status.
- **Task Assignment**: Users can assign tasks to themselves or to others.
- **Status Updates**: 
  - Users can update the status of tasks they own.
  - Admins can update the status of any task.

### 3. Tagging System
- **Tagging**: Users can add tags to tasks (e.g., "Urgent", "Bug", "Feature").
- **Filtering**: Users can filter tasks by tags.

### 4. Commenting System
- **Comment Creation**: Users can add comments to tasks.
- **Comment Management**: 
  - Users can edit or delete their own comments.
  - Admins can delete any comment.

### 5. Notifications
- **Task Assignment Notifications**: Notify users when they are assigned a task.
- **Task Status Notifications**: Notify users when the status of a task they are involved in is updated.

### 6. Validation
- **Payload Validation**: Implemented for all endpoints to ensure proper data formatting (e.g., valid email format, required fields).

### 7. Pagination & Sorting
- **Pagination**: Implemented for tasks.
- **Sorting**: Allows sorting tasks by due date and filtering by status.

### 8. Database
- **Relational Database**: The project uses a relational database such as PostgreSQL or MySQL.
- **Database Migrations**: Migrations are provided to set up the database schema.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**
   Run the following command to install all the necessary dependencies:
   ```bash
   npm install
   ```

3. **Database Setup**
   - Ensure that the database is created with the name: `taskmanagement_assessment`.
   - Update your `.env` file with the correct database connection details.

4. **Run Database Migrations**
   Run the following command to apply the necessary migrations and set up the database schema:
   ```bash
   npm run migrate:run
   ```

5. **Start the Application**
   Use the following command to start the project in development mode:
   ```bash
   npm run start:dev
   ```

## Technology Stack

- **Framework**: NestJS
- **Authentication**: JWT
- **Database**: PostgreSQL/MySQL (or any relational database)
- **ORM**: TypeORM (with migrations)

## License

This project is licensed under the MIT License.
```