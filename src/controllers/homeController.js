import db from '../models/index'
import hash from 'object-hash'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

require("dotenv").config()


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll({
            where: {
              password: '14c8f66a941b01aec0f81605659b450a'
            }})
        console.log('---------------------------------------------------')
        console.log(data)
        return res.json(data)
        // return res.render("homePage.ejs", {
        //     data: JSON.stringify(data)
        // })
    } catch (e) {
        console.log(e)
    }
}

let postHomePage = async (req, res) => {
    try {
        const password = req.body.password
        const HasPassword = hash.MD5(password)
        const data = await db.User.create({
            email: "DataTypes.STRING",
            password: HasPassword,
            firstName: "DataTypes.STRING",
            lastName: "DataTypes.STRING",
            address: "DataTypes.STRING",
            gender: true,
            roleid: "DataTypes.STRING",
          });
        console.log("Jane's auto-generated ID:", data);
        res.status(200).json({message: 'success!'})
        // return res.render("homePage.ejs", {
        //     data: JSON.stringify(data)
        // })
    } catch (e) {
        return res.status(400).json({ error: err.message });
    }
}

let createAccount = async (req, res) => {
    try {
        const password = req.body.password
        const email = req.body.email
        const HasPassword = hash.MD5(password)
        const data = await db.Account.create({
            email: email,
            password: HasPassword,
          });
        console.log("Jane's auto-generated ID:", data);
        res.status(200).json({message: 'success!'})
    } catch (e) {
        return res.status(400).json({ error: err.message });
    }
}

let loginAccount = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const HasPassword = hash.MD5(password)
        let data = await db.Account.findAll({
            where: {
              email: email,
              password: HasPassword
            }})
        console.log(data)
        if(data.length <= 0) {
            return res.sendStatus(401)
        }
        const accessToken = jwt.sign({email: email, id: data[0].id}, 'duy', {expiresIn: '10s'})
        return res.json({
            token: accessToken,
            accountId: data[0].id,
            email: email
        }
        )
    } catch (e) {
        return res.status(400).json({ error: err.message });
    }
}

let sendSimpleEmail = async (req, res) => {

    const email = req.body.email
    if(!email) return res.sendStatus(401)

    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Duy 👻" <duy124678@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Xác nhận đặt hàng ✔", // Subject line
            html: `<h3>Xin chào ${email}!</h3>
            <p>Bạn nhận được email này vì bạn đã đặt hàng online trên shopee.<p>
            <p>Thông tin đơn hàng:<p>
            <div><b>Thời gian: ${new Date()}</b></div>
            <div><b>Sản phẩm: 1111111</b></div>

            <p>Nếu thông tin trên là đúng sự thật, vui lòng click vào đường link bên đưới để xác nhận và hoàn tất thử tục đặt hàng</p>
            <div><a href='https://www.youtube.com/' target="_blank">Click here</a></div>
            <div>Xin chân thành cảm ơn!</div>
            `
        });
        res.json({info: info})
    } catch (error) {
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getHomePage: getHomePage,
    postHomePage: postHomePage,
    createAccount: createAccount,
    loginAccount: loginAccount,
    sendSimpleEmail: sendSimpleEmail
}