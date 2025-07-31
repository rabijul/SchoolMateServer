const sql = require('mssql');

const DBconfig = {
  user: process.env.DB_USER || 'sa',  
  password: process.env.DB_PASSWORD || 'Rabijul@12345',
  server: process.env.DB_HOST || 'RABIJULPC\\SQLEXPRESS',
  // database: process.env.DB_NAME || 'TestCompany',
  database: process.env.DB_NAME || 'SchoolDB',
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  }
};

const SharedDBConfig = {
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


async function getDBConnection(clientDBName = 'SchoolDB') {
  try {    
    console.log(`inside GetsqlConnection line 34: `,clientDBName);
     const config = {
      ...DBconfig,
      database: clientDBName
    };

    //console.log(config);
    //const Clientpool = await new sql.connect(config).connect(); // ✅ create new pool
    const Clientpool = await new sql.ConnectionPool(config).connect();
    return Clientpool;
  } catch (error) {
   console.error(`Database connection to "${clientDBName}" failed:`, error);
    throw error;
  }
}

async function getSharedConnection() {
  try {   
    const pool = await sql.connect(SharedDBConfig);
    return pool;
  } catch (error) {
    console.error(`Database connection to SharedDB failed:`, error);
    throw error;
  }
}

module.exports = { sql, getDBConnection, getSharedConnection };