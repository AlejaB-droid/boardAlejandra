const mongoose = require("mongoose");

const dbConnection = async () => {
    mongoose.connect(process.env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log("Connected with MongoDB"))
    .catch((error) => console.log("Error while trying to connect with MongoDB: ", error))
};

module.exports = {dbConnection};
