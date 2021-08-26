const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

const config = require('./config/key')

const { User } = require("./models/User")

app.use(bodyParser.urlencoded({extended: true})) //application/x-www-form-urlencoded
app.use(bodyParser.json()) //json 타입

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

  app.get('/', (req, res) => res.send('Hello World!'))

  app.listen(port, ()=> console.log(`Example app listeng on port  ${port}!`))
  
  
  app.post('/register', (req,res) => {
    //client가 보낸 회원가입 정보를 db에 저장
    const user = new User(req.body)
    user.save((err,userInfo)=>{
      if(err) return res.json({success: false, err}) //err메세지를 같이 전달
      return res.status(200).json({
        success: true
      })
    })
  })
