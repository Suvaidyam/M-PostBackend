const express = require('express');
const app = express();
// dotenv configuration
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, ".env") });
const port = process.env.PORT;
// JSON convert and process
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// api call from other ports
const Cors = require('cors')
app.use(Cors());

// database configuration
require('./DataBase/ConnectDB.js')

// profile picture upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// middleware configuration
app.use('/', require('./Api'));

// universal api routes
app.get("*", (req, res) => {
  res.send("404 page not get");
});

app.listen(port, () => console.log(`app listening on port ${port}!`))