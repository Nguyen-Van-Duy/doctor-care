import db from '../models/index'
import hash from 'object-hash'
import jwt from 'jsonwebtoken'


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

module.exports = {
    getHomePage: getHomePage,
    postHomePage: postHomePage,
    createAccount: createAccount,
    loginAccount: loginAccount
}