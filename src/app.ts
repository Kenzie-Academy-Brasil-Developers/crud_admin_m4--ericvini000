import express, { Application, json } from "express";
import { handleErrors } from "./middlewares";

const app: Application = express();
app.use(json());

app.use(handleErrors);

export default app;
