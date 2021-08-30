const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const { User } = require("./models/User")
const { auth } = require("./middleware/auth")

app.use(bodyParser.urlencoded({extended: true})) //application/x-www-form-urlencoded
app.use(bodyParser.json()) //json 타입
app.use(cookieParser()) //json 타입

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

  app.get('/', (req, res) => res.send('Hello World!'))

  app.listen(port, ()=> console.log(`Example app listeng on port  ${port}!`))
  
  
  app.post('/api/users/register', (req,res) => {
    //client가 보낸 회원가입 정보를 db에 저장
    console.log(req)
    const user = new User(req.body)
    console.log(user)

    user.save((err,userInfo)=>{
      if(err) return res.json({success: false, err}) //err메세지를 같이 전달
      return res.status(200).json({
        success: true
      })
    })
  })

  app.post('/api/users/login', (req, res) => {
    console.log(req)
    //요청된 이메일이 db에 있는지 확인->있으면 비밀번호 체크->맞으면 토큰생성
    User.findOne({ email: req.body.email }, (err, user) => {
      if(!user){
        return res.json({
          loginSuccess: false,
          message: "유저가 없습니다"
        })
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch)
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
        
        //비밀번호 맞으면 토큰 생성
        user.generateToken((err, user)=>{
          if(err) return res.status(400).send(err);

          //토큰을 저장. (쿠키-application-cookies, 로컬스토리지, 세션스토리지)
          res.cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
        })
      })
    })
  })


// role이 0이면 회원, 아니면 관리자
app.get('/api/users/auth', auth, (req, res) => {
  //이 시점에 도착했다 == middleware통과, 즉 Auth 인증에서 true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})