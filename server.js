const express = require("express")
require("dotenv/config");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

let port = process.env.PORT;
let app = express();
app.use(bodyParser.json());
const userRoutes = require("./routes/Users");
const thoughtRoutes = require("./routes/Thoughts");

app.get('/',(req, res)=>{
    res.send("Hello");
});

app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, ()=>{
    console.log("connected to mongo");
});

app.listen(port, ()=>{
    console.log("Listening on port "+port);
})