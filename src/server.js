import express from "express";
//thu vien lay cac tham so client sd(id)
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
//goi config .env giup run process.env
import connectDB from "./config/connectDB"

require('dotenv').config();

let app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)
connectDB()

let port = process.env.PORT || 6969
app.listen(port, () => {
    console.log('Be true' + port)
})