import {} from "dotenv/config";
import { createServer } from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createApolloServer } from "./apollo/index";
import models from "./models";
import types from "./types/index";
import resolvers from "./resolvers";

const { MONGO_URL, CLIENT_URL, SERVER_PORT } = process.env;
console.log("mongo url", typeof MONGO_URL);
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Mongodb database connection successful`);
  })
  .catch(err => {
    console.error(`Error in databse connection ${err}`);
  });

const app = express();
app.use(cors({ credentials: true }));

const server = createApolloServer(types, resolvers, models);
server.applyMiddleware({ app, path: "/graphql" });

// Create http server and add subscriptions to it
const httpServer = createServer(app);
//server.installSubscriptionHandlers(httpServer);

// Listen to HTTP and WebSocket server
const port = process.env.port || SERVER_PORT;
httpServer.listen({ port: port }, () => {
  console.log(`server ready at port ${port}`);
});
