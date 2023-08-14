import express, { Application, json } from "express";
import { handleErrors } from "./middlewares";
import { userRouter } from "./routers";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);

app.use(handleErrors);

export default app;
