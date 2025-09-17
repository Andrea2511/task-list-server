const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const allowedMethods = new Set(["GET", "POST", "PUT", "DELETE", "OPTIONS"]);

app.use((req, res, next) => {
  if (!allowedMethods.has(req.method)) {
    return res.status(400).json({ error: "Invalid HTTP method" });
  }
  next();
});

const listEditRouter = require("./list-edit-router.js");
const listViewRouter = require("./list-view-router");

app.use("/api", listViewRouter);
app.use("/api", listEditRouter); 

app.listen(port, (req, res ) => {
    console.log(`Server running on port ${port}`);
});