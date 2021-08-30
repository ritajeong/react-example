### package.json **dependencies** 목록

- "express": "^4.17.1",

-  "mongoose": "^6.0.1"
- "body-parser": "^1.19.0"

Http 통신은 Client의 요청(Request)이 있을 대만 서버가 응답(Response)하는 단방향 통신이다. 

이 때, **body-parse**r는 Body 데이터를 분석(parse)해서 req.body로 출력한다. 

### package.json **devDependencies** 목록

-  "nodemon": "^2.0.12"

nodemon : 서버 관련하여 코드가 변경되었을 때, 서버를 중단하고 재시작하지 않아도 바로 변경한 부분이 실행될 수 있도록 도와준다. 

### Postman

개발중에는 API  Test Tool로는 Postman를 사용한다. 



### config directory

DB정보가 담긴 url을 따로 dev.js로 저장하고, gitignore를 저장한다. 

key.js에서 production모드일 때와 개발모드일 때를 분기한다.  

(환경변수 process.env.NODE_ENV가 Local 환경에서 development를 가지고, 배포후에는 production을 가지므로 key.js에서 적절히 분기한다.)



### bcrypt, salt

DB에 비밀번호를 암호화해서 저장하기 위해 bcrypt 라이브러리를 사용함.

[bcrypt npm 사이트 참고, Usage 부분](https://www.npmjs.com/package/bcrypt)

Register Route에서 유저정보를 DB에 저장하기 전에 암호화 로직을 작성한다. 

User.js에서 saltRounds = 10으로, 10자리의 salt를 먼저 생성한다.

그리고 bcrypt의 genSalt로 salt를 생성해서 hash 비밀번호를 만든 뒤 암호화를 완료한다. 



