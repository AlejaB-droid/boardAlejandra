const express = require("express");
const cors = require("cors");
const {dbConnection} = require("./db/db");
require("dotenv").config();

const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");


const app = express();
app.use(express.json());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board", Board);

app.listen(process.env.port, () => console.log("Server executing on port " + process.env.port));

dbConnection();
