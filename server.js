// express
const express = require("express");
const app = express();
const path = require("path");

// Routes

// used in place of installing body-parser module
app.use(express.json());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));

// if not route is built use build folder
app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// keep port as an environment variable
const port = process.env.PORT || 5000;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
