const express = require('express'),
app = express(),
port = 3200,
cors = require('cors');
let UserDB = require('./DataBase/User-Base'),
ProductDB = require('./DataBase/Product-Base'),
UserServ = require('./SERVER/User_serv');
app.listen(port, () => console.log("http://localhost:" + port))    
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
app.use(express.json({ limit : '1mb' }))
app.use(cors({
    origin :  'http://127.0.0.1:5501'
}))
// 
app.get('/', cors(), (req, res) => {
    ProductDB.products.list[0].id
    console.log(ProductDB.products.list[0].id);
    res.send(ProductDB)
})
app.post('/checkKey', cors(), (req, res) => {
    let data = req.body
    let check = UserServ.checkKey(data)
    if ( check === 'ok' ) {
        let result = {
            res : 'ok'
        }
        // if (check === 'ok'){
            console.log('OK');
            res.json(result) 
        // }
    }else {
        let result = 'no'
        res.json(result) 
    }
})
class AddSessoin{
    constructor(key, userId, date, name, active){

    }
}
app.post('/accountLogin', cors(), (req, res) => { 
    let data = req.body
    console.log(data);
    let access = UserServ.inAccount(data.login, data.password)
    console.log(UserServ.userSessions);
        res.json(access)

})
app.post('/logOut', cors(), (req, res) => { 
    let data = req.body
    console.log(data);
    let access = UserServ.logOut(data)
    // console.log(UserServ.userSessions);
    if (access === 'ok'){
        res.json(access)
    }
})