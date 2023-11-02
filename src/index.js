import express from "express";
import bootstrap from "./bootstrap/index.js";
import appRouter from "./routes/index.js";

const connectionPool = await bootstrap();

const app = express();
app.use(appRouter);
app.set("connection", connectionPool);

const port = +process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
