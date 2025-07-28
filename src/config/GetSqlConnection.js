const sql = require('mssql');

const config = {
  user: process.env.DB_USER || 'sa',  
  password: process.env.DB_PASSWORD || 'Rabijul@12345',
  server: process.env.DB_HOST || 'RABIJULPC\\SQLEXPRESS',
  // database: process.env.DB_NAME || 'TestCompany',
  database: process.env.DB_NAME || 'SchoolCoreDB',
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  }
};

async function getConnection() {
  try {
    console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_NAME);
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

module.exports = { sql, getConnection };