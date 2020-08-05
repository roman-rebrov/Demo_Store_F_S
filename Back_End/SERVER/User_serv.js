let UserBase = require('../DataBase/User-Base')
module.exports = {
    SecureKeyAccount : {
        AccessKey_1: "j90cKfL78Hd8hR77t5",
        AccessKey_2: "h75LodERi55pO90xfZ"
    },
    userSessions : {
        users : []
    },
    inAccount(login,password){
        this.login = login
        this.pass = password
        let res
        UserBase.list.forEach((item,i) => {
            if( UserBase.list[i].User.nickname === this.login ){
                if ( UserBase.list[i].User.password === this.pass ){
                    res =  this.sessionCreater(item)
                }
            }
        })
        return res 
    },
    sessionCreater(user){
        let date = new Date()
        let sessionCreate = {}
        sessionCreate.access = 'ok'
        sessionCreate.date = [date.getDate(), date.getMonth()+1, date.getFullYear()]
        sessionCreate.key = this.SecureKeyAccount.AccessKey_1
        sessionCreate.id = user.User.id
        sessionCreate.name = user.User.name
        sessionCreate.active =  user.User.active
        this.userSessions.users.push(sessionCreate)
        return sessionCreate
    },
    checkKey(user){
        let check;
        console.log(JSON.parse(user.key));
        let data = user // JSON.parse(user)
        this.userSessions.users.forEach((item, i) => {
            console.log(data.id, item.id);
            if ( item.key === JSON.parse(data.key) ) {
                if ( item.id === JSON.parse(data.id) ){
                    check = 'ok'
                }
            }
        })
        console.log(check);
        return check
    },
    logOut(data){
        this.userSessions.users.forEach((item, i) => {
            console.log(data.id, item.id);
            if ( item.key === data.key ) {
                if ( item.id === data.id ){
                    this.userSessions.users.splice( i , 1)
                    check = 'ok'
                    console.log(this.userSessions);
                }
            }
        })
        return check
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
// class UserAccess{
//     inAccount(login,password){
//         this.login = login
//         this.pass = password
//         let res
//         UserBase.list.forEach((item,i) => {
//             if( UserBase.list[i].User.nickname === this.login ){
//                 if ( UserBase.list[i].User.password === this.pass ){
//                     res = this.sessionCreater(item)
//                 }
//             }
           
//         })
//         return res
//     };
//     sessionCreater(user){
//         let sessionCreate = {}
//         sessionCreate.key = SecureKeyAccount.AccessKey_1
//         sessionCreate.id = user.User.id
//         sessionCreate.name = user.User.name
//         sessionCreate.active =  user.User.active
//         userSessions.users.push(sessionCreate)
//         return sessionCreate
//     }
//     userFavoriteProducts(event, idProduct, userKey){
//         userSessions.users.forEach((item,i) => {
//             if(item.key === userKey){
//                 if ( event === 'push' ){item.active.myCart.push(idProduct)}
//                 if ( event === 'splice' ){item.active.myCart.splice(item.active.myCart.indexOf(idProduct), 1)}
//             }
//         })
//     }
//     OutAccount(id, key){
//         this.id = id
//         this.keyAccount = key
//         let res
//         userSessions.users.forEach((item,i) => {
//             if( item.id === this.id ){
//                 if ( item.key === this.keyAccount ){
//                     userSessions.users.splice(i , 1)
//                     res = true
//                 }
//             }
           
//         })
//         return res
//     }
//     sessionControl(){

//     }
// }
// let ServeerAccess = new UserAccess()