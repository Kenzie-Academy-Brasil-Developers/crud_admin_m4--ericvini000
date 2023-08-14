import express, { Application, json } from "express";
import { handleErrors } from "./middlewares";
import { coursesRouter, userRouter } from "./routers";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/courses", coursesRouter);

app.use(handleErrors);

export default app;
