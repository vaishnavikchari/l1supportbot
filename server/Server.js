const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");

const { schema } = require("./schema");

const PORT = process.env.SERVERPORT || 3000;
const HOST = process.env.HOST || "localhost";

class Server {
  constructor() {
    const server = express();

    server.use(cors());

    server.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

    server.use(
      "/graphiql",
      graphiqlExpress({
        endpointURL: "/graphql",
        subscriptionsEndpoint: `ws://${HOST}:${PORT}/subscriptions`
      })
    );
    this.ws = createServer(server);
  }
  listen() {
    return new Promise(resolve => {
      this.ws.listen(PORT, () => {
        console.log(`Go to http://${HOST}:${PORT}/graphiql to run queries!`);
        new SubscriptionServer(
          {
            execute,
            subscribe,
            schema
          },
          {
            server: this.ws,
            path: "/subscriptions"
          }
        );
        resolve();
      });
    });
  }
  close() {
    return this.ws.close();
  }
}

module.exports = Server;
