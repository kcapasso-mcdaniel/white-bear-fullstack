// express
const express = require("express");
const app = express();

// Routes

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));
app.get("/", (req, res) => res.send("Hello World!"));

// keep port as an environment variable
const port = process.env.PORT || 5000;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
