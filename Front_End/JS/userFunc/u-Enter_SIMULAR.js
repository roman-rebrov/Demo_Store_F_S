/**
 *  
 */
class UserEnter extends AddProduct{
    constructor(){
        super()
        this.modalWindow = document.querySelector('.modal-login-wrap')
        this.myAccount = document.querySelector('.account-access-wrap')
        this.btnEnter = document.querySelector('.modal-login-btn-enter')
        this.btnClose = document.querySelector('.close-modal-window')
        this.modalInfo = document.querySelector('.modal-window-inform')
        this.inputsOfAccess = document.querySelector('.modal-login-inputs-wrap')
        this.url = 'http://localhost:3200'
        this.into = {active: {}}
    }
    init(){
        /**
         * Add events on buttons
         */
        this.checkKey()
        this.btnEnter.addEventListener('click', () => this.sendKey())
        // this.myAccount.addEventListener('click', () => this.getKey())
        this.myAccount.onclick = () => this.getKey()
        this.btnClose.addEventListener('click', ()=>{this.close()})
    }
    sendKey(){
        /**
         * Get value from inputs of Modal Window
         * Request Access
         */
        let login = this.inputsOfAccess.children[0].children[0].value,
        password = this.inputsOfAccess.children[1].children[0].value
        // this.inputsOfAccess.children[0].children[0]
        if( login === '' || password === ''){
            this.modalInfo.style.color = '#fff4be'
            this.modalInfo.innerHTML = '<div>Введите данные</div>'
        }else{
            this.modalInfo.innerHTML = ''
            fetch(data.url + '/accountLogin', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    login : login,
                    password : password
                })
            })
            .then(data => {return data.json()})
            .then(data => {
                this.into = data
                if ( this.into.access === 'ok' ){
                    data.userKey = this.into.key
                    localStorage.setItem('Key', JSON.stringify(this.into.key) )
                    localStorage.setItem('Id', JSON.stringify(this.into.id) )
                    localStorage.setItem('addedProduct', JSON.stringify(this.into.active.myCart) )
                    localStorage.setItem('userName', JSON.stringify(this.into.name) )
                    this.userComplite()
                }
            })
        }

    }// -------------
    userComplite(){
            console.log(this.into);
            // data.userKey = this.into.key
            this.myAccount.children[1].innerHTML = `<div>${this.into.name}</div>`
            this.modalWindow.style.display = 'none'
            this.myAccount.style.color = '#00855d'
            console.log(this.into.key);
            this.myAccount.innerHTML += (`
                <div class="account-drop-list">log out</div>
            `)
            document.querySelector('.account-drop-list').addEventListener('click', ()=>{this.logOut()})
            this.inputsOfAccess.children[0].children[0].value = ''
            this.inputsOfAccess.children[1].children[0].value = ''
            this.myAccount.onclick = null
            this.out()
            if( this.into.active.myCart.length > 0) {
                this.cart('#f58923', `${this.into.active.myCart.length} items`)
            }
            // window.location.reload()
    };
    checkKey(){
        let getKey =  {}
        getKey.key = localStorage.getItem('Key')
        getKey.id = localStorage.getItem('Id')
        if(getKey.key != '' ) {
            fetch(data.url + '/checkKey', {
                method : 'POST',
                mode : 'cors',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body :  JSON.stringify(getKey)
            })
            .then(data => {return data.json()})
            .then(data => {
                console.log(data);
                if(data.res === 'ok'){
                    this.into.name = JSON.parse(localStorage.getItem('userName'))
                    let myCart = localStorage.getItem('addedProduct')
                    this.into.active.myCart = JSON.parse(myCart)
                    this.userComplite()
                }else {
                    localStorage.setItem('Key', '' )
                    localStorage.setItem('Id', '' )
                    localStorage.setItem('userName', '' )
                    localStorage.setItem('addedProduct', '' )
                }
            })
        }
    };
    logOut(){
        let logOut = {}
        logOut.id = this.into.id,
        logOut.key = this.into.key,
        logOut.active = this.into.active
        fetch(data.url + '/logOut', {
            method : 'POST',
            mode : 'cors',
            headers : {
                'Content-Type' : 'application/json'
            },
            body :  JSON.stringify(logOut)
        })
        .then(data => {return data.json()})
        .then(data => {
            if (data === 'ok'){
                localStorage.setItem('Key', '' )
                localStorage.setItem('Id', '' )
                localStorage.setItem('userName', '' )
                localStorage.setItem('addedProduct', '' )
                document.location.reload()
            }
        })
    }
    getKey(){
        this.modalWindow.style.display = 'flex'
        
    }
    close(){
        this.modalWindow.style.display = 'none'
    }
    // logOut(){
    //     let id = this.into.id,
    //     key = this.into.key,
    //     active = this.into.active
    //     // res = ServeerAccess.OutAccount(id, key, active)
    //     fetch( data.url + '/', {
    //         method : 'POST',
    //         headers : {},
    //         body : {
    //             id : id,
    //             key : key,
                 
    //         }
    //     } )
        // if ( res === true ) {
        //     localStorage.setItem('Key', '' )
        //     localStorage.setItem('userName', '' )
        //     localStorage.setItem('addedProduct', '' )
        //     document.location.reload()
        //     // this.out()
        // }

    // }
}
