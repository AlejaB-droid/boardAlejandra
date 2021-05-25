const express = require("express");
const mongoose = require("mongoose");

const User = require("./routes/user");

const app = express();
app.use(express.json());
app.use("/api/user/", User);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server executing on port " + port));

mongoose.connect("mongodb://127.0.0.1:27017/boardalejadb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log("Connected with MongoDB"))
.catch((error) => console.log("Error while trying to connect with MongoDB: ", error))