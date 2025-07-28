require('dotenv').config();  // Load environment variables from .env file

// Export the configuration as an object
module.exports = {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT
};