const { makeExecutableSchema } = require("graphql-tools");
const { PostgresPubSub } = require("graphql-postgres-subscriptions");
const database = require("./database");

const pubsub = new PostgresPubSub({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT
});

const typeDefs = `
  type Pin { title: String!, link: String!, image: String!, id: Int! }
  type Query { pins: [Pin] }
  type Mutation { addPin(title: String!, link: String!, image: String!): Int }
  type Subscription { pinAdded: Pin }
`;

const resolvers = {
  Query: {
    pins: async () => {
      const pins = await database("pins").select();
      return pins;
    }
  },
  Mutation: {
    addPin: async (_, { title, link, image }) => {
      const [id] = await database("pins")
        .returning("id")
        .insert({ title, link, image });
      pubsub.publish("pinAdded", { pinAdded: { title, link, image, id } });
      return id;
    }
  },
  Subscription: {
    pinAdded: {
      subscribe: () => pubsub.asyncIterator("pinAdded")
    }
  }
};

module.exports = {
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  })
};
