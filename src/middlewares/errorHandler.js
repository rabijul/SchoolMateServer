// middlewares/error.middleware.js

const errorHandler = (err, req, res, next) => {
  console.error('Error occurred: and is now inside the middleware/errorHandler and the message is : ', err.message);
  console.error(err.stack); // Log the full error stack
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = { errorHandler };
