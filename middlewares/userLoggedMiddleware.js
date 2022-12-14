const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.emailCookie
    let userFromCookie=undefined
    for (i=0;i<users.length;i++){
        if (users[i].email==emailInCookie){
            userFromCookie = users[i]
            
        }
    }
    if (userFromCookie!=undefined){
        req.session.userLogged = userFromCookie
        
    }

    if (req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged; 
    }

next()

}
module.exports=userLoggedMiddleware