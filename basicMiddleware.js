const express = require('express');
const app = express();

//Function to check if a person is 14 years old or not to ride this ride1
/* By Express:
function isOldEnough(age){
    if(age >= 14){
        return true;
    }
    else{
        return false;
    }
}
 */
//By Middleware:
function isOldEnoughMiddleware(req, res, next){
    const age = req.query.age;
    if(age >= 14){
        next();
    }
    else{
        res.json({
            msg: "You are not old enough to ride this!"
        });
    }
}
//As express is a series of middleware function, so after the isOldEnoughMiddleware
//function got called successfully it will call the next middleware by 'next' key.

//If there is more than one routes and you want to use the isOldEnoughMiddleware in each of them
//then simply write: app.use(isOldEnoughMiddleware); in first instead of writing it again and again.
app.get("/ride1", isOldEnoughMiddleware, function(req, res){
    res.json({
        msg : "You have successfully riden ride1"
    });  
});

app.listen(3001);