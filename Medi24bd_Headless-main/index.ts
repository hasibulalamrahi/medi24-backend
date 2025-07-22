const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const helmet = require("helmet")
const app = express();
// require('./config/database');
// import {syncDatabase} from './config/database'
// syncDatabase().then(() => {
//     console.log("✅ Server is ready to start!");
//   });
const adminRoutes=require('./src/routes/admin/index.route')
const clientRoute = require('./src/routes/client/index.route')
app.use(express.json())
require("dotenv").config();
app.use(cors())
app.use(helmet());

// connectDB();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/client",clientRoute)

module.exports = app;