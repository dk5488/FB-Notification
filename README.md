# MERN Stack Application

This guide provides instructions to set up and run a MERN stack application from GitHub. Follow the steps below to get started.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js ([https://nodejs.org/](https://nodejs.org/))

- MongoDB ([https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community))

- Git ([https://git-scm.com/](https://git-scm.com/))

- A code editor (e.g., Visual Studio Code)

## Steps to Clone and Run the Application

### 1. Clone the Repository

1\. Open your terminal/command prompt.

2\. Run the following command to clone the repository:

   ```bash

   git clone <repository_url>

   ```

3\. Navigate to the project directory:

   ```bash

   cd <repository_name>

   ```

### 2. Install Dependencies

#### Backend

1\. Navigate to the backend directory:

   ```bash

   cd backend

   ```

2\. Install the necessary dependencies:

   ```bash

   npm install

   ```

#### Frontend

1\. Navigate to the frontend directory:

   ```bash

   cd ../frontend

   ```

2\. Install the necessary dependencies:

   ```bash

   npm install

   ```

### 3. Set Up Environment Variables for the Backend

1\. In the `backend` directory, create a `.env` file:

   ```bash

   touch .env

   ```

2\. Open the `.env` file in your code editor and add the following variable:

   ```env

   MONGO_URI=<your_mongo_connection_string>

   ```

   Replace `<your_mongo_connection_string>` with your MongoDB connection string. For example:

   ```env

   MONGO_URI=mongodb://localhost:27017/mydatabase

   ```

3\. Save and close the file.

### 4. Start the Application

#### Backend

1\. Navigate to the `backend` directory:

   ```bash

   cd backend

   ```

2\. Start the server:

   ```bash

   npm start

   ```

#### Frontend

1\. Navigate to the `frontend` directory:

   ```bash

   cd ../frontend

   ```

2\. Start the React development server:

   ```bash

   npm start

   ```

### 5. Access the Application

1\. Open your web browser and visit:

   ```

   http://localhost:<frontend_port>

   ```

   Replace `<frontend_port>` with the port number displayed in your terminal for the frontend (usually 3000).

## Directory Structure

```

project-root

├── backend

│   ├── index.js

│   ├── package.json

│   ├── .env

│   └── ...

├── frontend

│   ├── src

│   ├── package.json

│   └── ...

├── README.md

└── ...

```

## Troubleshooting

- **MongoDB connection issues**: Ensure MongoDB is installed and running locally or verify your cloud connection string.

- **Port conflicts**: If the default ports (3000 for frontend, 5000 for backend) are in use, update the ports in the `index.js` file or package.json scripts.

- **Dependencies errors**: Ensure all dependencies are correctly installed by running `npm install` in both the `frontend` and `backend` directories.
