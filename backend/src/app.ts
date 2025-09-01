import express from "express";
import cors from "cors";

import healthRouter from "./api/health/health.routes";

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

export default app;
