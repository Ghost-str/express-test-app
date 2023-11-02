import { Router } from "express";
import balanceRouter from "./balanceRout.js";

const appRouter = Router();

appRouter.use(balanceRouter);

export default appRouter;
