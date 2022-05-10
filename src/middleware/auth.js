import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)

    try {
        const decode = jwt.verify(token, 'duy')
        req.dataAll = decode
        next()
    } catch(err) {
        return res.sendStatus(403)
    }
}

module.exports = verifyToken