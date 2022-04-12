import express from "express";
//thu vien lay cac tham so client sd(id)
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
//goi config .env giup run process.env
import connectDB from "./config/connectDB"

require('dotenv').config();

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)
connectDB()

let port = process.env.PORT || 6969
app.listen(port, () => {
    console.log('Be true' + port)
})