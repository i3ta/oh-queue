import express from "express";
import cors from "cors";
import cron from "node-cron";

import healthRouter from "./api/health/health.routes";
import queueRouter from "./api/queue/queue.routes";
import tasRouter from "./api/tas/tas.routes";
import gtidRouter from "./api/gtid/gtid.routes";
import { updateRemote } from "./utils/log";

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
app.use("/api/tas", tasRouter);
app.use("/api/gtid", gtidRouter);

cron.schedule("* * * * *", updateRemote);

export default app;
