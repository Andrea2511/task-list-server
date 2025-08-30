const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const listEditRouter = require("./list-edit-router");
const listViewRouter = require("./list-view-router");

app.use("/api", listViewRouter);
app.use("/api", listEditRouter); 

app.listen(port, (req, res ) => {
    console.log(`Server running on port ${port}`);
});