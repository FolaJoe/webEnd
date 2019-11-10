var models = require('./server.js').models;
/*
var toSave  = [
    {name: "sola", email:"sola1@gmail.com"},
    {name: "sola", email:"sola2@gmail.com"},
    {name: "sola2", email:"sola3@gmail.com"},
    {name: "sola3", email:"sola4@gmail.com"},
    {name: "solaj", email:"sola5@gmail.com"},
    {name: "solak", email:"sola6@gmail.com"},
    {name: "sola2", email:"sola7@gmail.com"},
    {name: "sola1", email:"sola8@gmail.com"},
    {name: "sola4", email:"sola9@gmail.com"},
    {name: "solaj", email:"sola0@gmail.com"},
    {name: "solak", email:"sola11@gmail.com"},
    {name: "sola", email:"sola12@gmail.com"},
    {name: "solaz", email:"solaj@gmail.com"},
];

toSave.map(obj => {
    models.Profile.create(obj, (err, instance)=>{
        console.log("Profile created?", err , instance);
    });
});
*/
var filter = {
    where: { name:{like:'ola'}},
    order: 'date ASC',
    limit:10,
}

models.Profile.destroyById("5da479befd260f3e948ca88b", (err, found)=>{
    console.log("Found? " , err , found);
});
