"use strict"
let data = {
    url : 'http://localhost:3200',
    prodList: JSON.parse(JSON.stringify(products)),
    userKey : '',
    input : document.querySelector('.filter-price-tools'),
    search: [],
    searchState: false,
    viewType: 0,
    course: 0,
    euro: 0.85,
    pound: 0.8,
    costMin: 1,
    costMax: 1
}
// --------------------------------
const userAccess = {
    enter: new UserEnter(),
    init(){
        this.enter.init()
    }
}
userAccess.init()
// --------------------------------
const productCards = {
    productBuild : new ProductBuild(),
    tools : new ProdoctTools(),
    search : new Search(),
    filter : new FilterConstructor(),
    costWidget: new WidgetCost,
    init(){
        this.productBuild.init()
        this.tools.events()
        this.search.start()
        this.filter.filterInit()
        this.costWidget.init()
    }
}
productCards.init()

///////////////////////////////////////////
const dataPost = {p : 'YYyyyeeeee'}

// fetch(urlp + "/test", {   
//     method : "Post",
//     mode : 'cors',
//     headers : {
//         'Content-Type' : 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body : JSON.stringify(dataPost) 
// })
// .then(res => res.json())         
// .then( data => {  
//     let d =  data  
//     console.log(d)}     
// )      

// fetch(urlp + '/checkUser')
//     .then(res => {return res.json()}) 
//     .then(data => {
//         let pop = data  
//         console.log(pop)   
//     }) 
fetch(data.url + '/')
.then(res => {return res.json()}) 
.then(data => {
    let pop = data  
    console.log(pop)   
})  
///////////////////////////////////////////
// const requests = {
    // checkKey(){
    //     let getKey =  {}
    //     getKey.key = localStorage.getItem('Key')
    //     getKey.id = localStorage.getItem('Id')
    //     if(getKey.key != '' || getKey.key != null ) {
    //         fetch(data.url + '/checkKey', {
    //             method : 'POST',
    //             mode : 'cors',
    //             headers : {
    //                 'Content-Type' : 'application/json'
    //             },
    //             body :  JSON.stringify(getKey)
    //         })
    //         .then(data => {return data.json()})
    //         .then(data => {
    //             console.log(data);
    //             if(data.res === 'ok){
    //                 this.userComplite()
    //             }
    //         })
    //     };

    // }
// }

// requests.checkKey()