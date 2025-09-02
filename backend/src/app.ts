import express from "express";
import cors from "cors";

import healthRouter from "./api/health/health.routes";
import queueRouter from "./api/queue/queue.routes";
import gtidRouter from "./api/gtid/gtid.routes";

const app = express();

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(
    cors({
      origin: ["http://localhost:4000", "http://localhost:5173"],
    }),
  );

app.use("/api/health", healthRouter);
app.use("/api/queue", queueRouter);
app.use("/api/gtid", gtidRouter);

export default app;
