const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT || 3001;
const HOST = process.env.PROJECT_DOMAIN || "localhost"

// GraphQL type definition
// Query type has a top level field called planet, which is of type String
const typeDefs = `
  type Query { planet: String }
`;

// Resolvers map GraphQL types (like planet) to functions
// Every time a consumer asks for the planet key, we will return the string "globe"
const resolvers = {
  Query: {
    planet: () => {
      return "globe";
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

// https://dev.to/loujaybee/using-create-react-app-with-express
server.use(express.static(path.join(__dirname, 'build')));

server.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connect schema to an HTTP server, in the route /graphql
server.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// Provide an interactive GraphQL explorer called GraphiQL in the /graphiql route
server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

server.listen(PORT, () => {
  console.log(`Go to http://${HOST}:${PORT}/ to run queries!`);
});