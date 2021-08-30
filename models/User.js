const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

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

userSchema.methods.comparePassword = function(plainPassword, cb){
	//plainPassword 1234567  암호화된 비밀번호  $2b$10$FRcrltx1ld6rgfK4m8qJOeth3Mu37bYmjSk1tveWH6T.IOywHInaC
	//암호화된 비밀번호를 복호화할 수 없으므로,  plainPassword를 암호화해서 둘이 같은지 비교한다. 

	bcrypt.compare(plainPassword, this.password, function(err, isMatch){
		if(err) return cb(err)
		cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function(cb){
	var user = this;
	console.log(user)
	//jsonwebtoken으로 token 생성
	var token = jwt.sign(user._id.toHexString(), 'secretToken')
	
	/*
	user._id + 'secretToken' = token
	->
	'secretToken' -> user._id
	*/
	user.token = token
	user.save(function(err, user){
		if(err) return cb(err)
		cb(null, user)
	})
}
const User = mongoose.model('User', userSchema)

module.exports = { User }