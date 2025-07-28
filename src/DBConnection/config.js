const config = {
  user: process.env.DB_USER || 'sa',        
  password: process.env.DB_PASSWORD || 'Rabijul@12345', 
  server: process.env.DB_HOST || 'RABIJULPC\\SQLEXPRESS',     
  database: process.env.DB_NAME || 'TestCompany',  
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,    
  }
};

module.exports = config;