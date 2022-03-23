// Required Consts!
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Set up for Heroku or Port 5000 cause I'm crazy!
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Optimize for Heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Connect to the mongo database!
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/music", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// Let the user know the server is running, and which port.  Yeay!
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});