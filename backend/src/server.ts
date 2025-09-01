import "module-alias/register";

import app from "./app";
import { config } from "./config/config";

app
  .listen(config.port, () => {
    console.log(
      `Server is Successfully Running, and App is listening on port ${config.port}`,
    );
  })
  .on("error", (err: Error) => {
    console.log(`Server Error: ${err.message}`);
  });
