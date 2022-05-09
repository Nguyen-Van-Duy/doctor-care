import db from '../models/index'
import hash from 'object-hash'

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

module.exports = {
    getHomePage: getHomePage,
    postHomePage: postHomePage
}