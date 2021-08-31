const { User } = require('../models/User');

let auth = (req, res, next) => {
    let token = req.cookies.x_auth; //client 에서 쿠키 가져옴
    
    User.findByToken(token, (err, user) => {// 토큰 Decode -> User ID를 찾음
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })
}


module.exports = { auth };