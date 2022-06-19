const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Shop Game Api",
    description: "Api da loja de shop game",
  },
  host: "localhost:3001",
  schemes: ["http"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be 'header', 'query' or 'cookie'
      name: "authorization", // name of the header, query parameter or cookie}
    },
  },
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
