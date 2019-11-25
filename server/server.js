// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

console.log(Object.keys(app.models));


app.models.user.find((err, result) => {
  if(!err && result){
  if(result.length === 0){
    const demoUser = { email:"folajoe@gmail.com",password: "test", username:"folajoe"};
    app.models.user.create(demoUser,(err,result) =>{
      console.log("Tried to create a user:", err, result);

    });
  }}
   
});


app.models.user.afterRemote('create',(ctx,user, next) =>{
  console.log("The new user:" ,user);

  app.models.Profile.create({
      first_name:user.username,
      name : user.name,
      created_at:new Date(), 
      userId:user.id,
      role : user.role||'subsriber'
    },(err, result) =>
      {
        if(!err && result){
          console.log("New Profile created:", result);
        }

        else{
          console.log("There is an error", err);
        }
      
  });
  console.log(user.role)
  if(user.role){
    app.models.Role.find({where:{name:user.role}}, (err2, role)=>{
      if(!err2 && role){
        if(role[0].name === user.role){
          console.log(`Adding a ${user.role}`);
          role[0].principals.create({
            principalType: app.models.RoleMapping.USER,
            principalId : user.id 
          },(err3,principal)=>{
            console.log('Created',err3,principal);
  
          })
        }
       
      }
      else{
        console.log("Unexpected situation");
      }
    });

  }
  
  next();
});

app.models.Role.find({where:{name:"admin"}}, (err, role)=>{
  if(!err && role){
    console.log('No error, role is', role.length);
    if(role.length === 0){
      app.models.Role.create({name: 'admin'}, (err2, result) =>
      {
        if(!err2 && result){
          app.models.user.findOne((err3,user)=>{
            if(!err3 && user){
              result.principals.create({
                principalType: app.models.RoleMapping.USER,
                principalId : user.id
              }, (err4, principal)=>{
                console.log("Created principal", err4, principal);
              });
            }
          });
        }
      });
    }
  }
});

app.models.Role.find({where:{name:'editor'}},(roleErr, roles) => {
  if(!roleErr && roles){
    console.log(roles);
    if(roles.length === 0){
      app.models.Role.create({name: 'editor'}, (createRoleErr, result)=>{
        console.log(createRoleErr, result);
      });
    }
  }
});