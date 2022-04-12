import express from "express";

let configViewEngine = (app) => {
    //cau hinh truy cap vao file public
    app.use(express.static('./src/public'))
    //dung view engine cos thu vien ejs (go logic trong html)
    app.set('view engine', 'ejs')
    //dung cac file trong thu muc views
    app.set('views', './src/views')


}

module.exports = configViewEngine