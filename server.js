const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

// GraphQL type definition
// Query type has a top level field called planet, which is of type String
const typeDefs = `
  type Query { planet: String }
`;

// Resolvers map GraphQL types (like planet) to functions
// Every time a consumer asks for the planet key, we will return the string "world"
const resolvers = {
  Query: {
    planet: () => {
      return "world";
    }
  }
};

// Create a schema based on type definitions and resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const server = express();

server.use(cors());

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connect schema to an HTTP server, in the route /graphql
server.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// Provide an interactive GraphQL explorer called GraphiQL in the /graphiql route
server.use(
  "/",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

server.listen(PORT, () => {
  console.log(`Go to http://${HOST}:${PORT}/ to run queries!`);
});