
const swaggerAutogen = require('swagger-autogen')()
const doc = {
    info: {
      title: 'Shop Game Api',
      description: 'Api da loja de shop game',
    },
    host: 'localhost:3001',
    schemes: ['http'],
  };
const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles,doc)