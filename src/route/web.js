import express from "express";
import homeController from "../controllers/homeController";

//sd router cua express
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.post('/post', homeController.postHomePage)
    return app.use('/', router)
}

module.exports = initWebRoutes