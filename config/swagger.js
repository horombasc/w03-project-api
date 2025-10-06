// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'W03 Project API',
      version: '1.0.0',
      description: 'API documentation for Week 03 project'
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local server' }
    ]
  },
  apis: ['./routes/*.js'] // you can add swagger comments in route files or build full spec here
};

module.exports = swaggerJsdoc(options);
