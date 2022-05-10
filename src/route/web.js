import express from "express";
import homeController from "../controllers/homeController";
import verifyToken from "../middleware/auth"

//sd router cua express
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.post('/post', homeController.postHomePage)
    router.post('/account', homeController.createAccount)
    router.post('/login', homeController.loginAccount)
    router.get('/getdata', verifyToken, (req, res) => {
        res.json({data: req.dataAll})
    })
    return app.use('/', router)
}

module.exports = initWebRoutes