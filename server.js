const http = require("http");
const express = require("express");
require("dotenv").config();

const itemsRouter = require("./routes/items");

const app = express();
app.use(express.json());

app.use("/items", itemsRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT);
console.debug("Server listening on port " + PORT);
