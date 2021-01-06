import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "../db/mongo";
import schema from "../graphql/schemas";

const app = express();

app.set(`PORT`, process.env.PORT);
app.use(morgan(`dev`));
connect();

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(app.get(`PORT`), () => {
  console.log(
    `[4leaf_project_02 server start] :: ${process.env.PORT}, WITH GraphQL - mongoDB`
  );
});
