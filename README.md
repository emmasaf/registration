### FullStack Registration Project

This is a FullStack Registration Project built using Node.js, Express.js, JSON as the database for the backend, and React.js with Redux Saga and Bootstrap for the frontend.

The project structure consists of two main parts:
1. **Server**: Backend code resides in the `server` folder.
2. **Client**: Frontend code resides in the `client` folder.

### Prerequisites
- Node.js installed on your machine.
- Yarn or npm package manager.

### Setting up the Backend

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm run dev
    ```

### Setting up the Frontend

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Start the frontend:
    ```bash
    yarn start
    ```
    or
    ```bash
    npm start
    ```

### Project Structure

```
fullstack-registration-project/
│
├── server/                  # Backend code
│   ├── app.js               # Express application setup
│   ├── controllers/         # Controllers handling routes logic
│   ├── models/              # Data models
│   ├── routes/              # API endpoints
│   └── db.json              # JSON file acting as database
│
└── client/                  # Frontend code
    ├── public/              # Public assets
    ├── src/                 # Source code
    │   ├── actions/         # Redux actions
    │   ├── components/      # React components
    │   ├── reducers/        # Redux reducers
    │   ├── sagas/           # Redux sagas
    │   ├── store/           # Redux store setup
    │   ├── App.js           # Main React component
    │   ├── index.js         # Entry point for React application
    │   └── styles.css       # Global styles
    │
    ├── package.json         # Frontend dependencies and scripts
    └── yarn.lock            # Yarn lock file
```

### Technologies Used

- **Backend**:
  - Node.js
  - Express.js

- **Frontend**:
  - React.js
  - Redux Saga
  - Bootstrap

### Contributing

Contributions are welcome! If you have any suggestions, enhancements, or bug fixes, feel free to open issues or pull requests.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

Special thanks to the developers of Node.js, Express.js, React.js, Redux Saga, and Bootstrap for providing such excellent tools and frameworks.
