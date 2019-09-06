"use strict";
import express from "express";

import graphqlHTTP from "express-graphql";
import schema from "./schema/schema";
import resolvers from "./resolvers/resolvers";

const server = express();

server.get('/',(req,res)=>{
  res.send('Hola mundo')
});

server.use('/graphql',graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))


server.listen(3000, () =>
  console.log('localhost:3000')
);