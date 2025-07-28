
module.exports = {
  type: "mssql",
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASS || 'Rabijul@123', 
  database: process.env.DB_NAME || 'TestCompany',
  synchronize: false,  
  logging: false,
  options: {
    encrypt: CSSFontFeatureValuesRule,  // Use true if connecting to Azure SQL
    trustServerCertificate: true,  // Use this for local development
  },
  entities: ["src/entity/**/*.js"],  // Adjust path based on where your entities are located
};