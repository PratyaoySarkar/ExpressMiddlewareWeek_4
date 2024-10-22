/* Lets create an in memory hospital:

1.GET: User can check how many kidneys they have and their health
2.POST: User can add a new kidney
3.PUT: User can replace a kidney, make it healthy
4.DELETE: User can remove a kidney */

const express =  require("express");
const app = express();

const users = [{
    name: "John",
    kidneys: [{
      healthy: false
    }]
}];

app.use(express.json());

app.get("/", function(req, res){
    const johnKidney = users[0].kidneys;
    const numberOfKidneys = johnKidney.length;
    let numOfHealthyKidneys = 0;
    for(let i=0; i<johnKidney.length; i++){
        if(johnKidney[i].healthy){
            numOfHealthyKidneys = numOfHealthyKidneys + 1;
        }
    }
    const numOfUnhealthyKidneys = numberOfKidneys - numOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numOfHealthyKidneys,
        numOfUnhealthyKidneys
    })
})

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})
//You have to give input in Postman as:
/* {
    "isHealthy": true
}
to push healthy kidneys, otherwise by default it will push all unhealthy kidneys */

app.put("/", function(req,res){
    //If there is no unhealthy kidneys, no need to do the operation
    if(isThereUnhealthyKidney()){
        for(let i=0; i<users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true;
        }
        res.json({});
    }
    else{
        
    }
    
})

function isThereUnhealthyKidney(){
    let UnhealthyKidneys = false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            UnhealthyKidneys = true;
        }
    }
    return UnhealthyKidneys;
}

app.delete("/", function(req,res){
    //Only if, atleast one unhealthy kidneys is there then only execute, else return 411
    if(isThereUnhealthyKidney()){
        const newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "Done!"
        })
    }
    else{
        res.status(411).json({
            msg: "You have no bad kidneys :)"
        })
    }
})
app.listen(3000);