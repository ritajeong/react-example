const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){//비밀번호 암호화(bcrypt 사용). pre는 mongoose의 method. 저장하기 전에 function을 수행한다
  var user = this //this는 userSchema를 가리킴
  if (user.isModified('password')) { //isModified는 mongoose 문법, 비밀번호가 변경되었을 때에만 다시 암호화를 진행함
      bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) return next(err)

          bcrypt.hash(user.password, salt, function (err, hash) { //hash는 암호화된 pwd
              if (err) return next(err) 
              user.password = hash
              next() //index.js 의 save로 감
          })
      })
  } else {
    next()
  }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }