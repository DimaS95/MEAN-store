    var express  = require('express');
    var app      = express();                               
    var mongoose = require('mongoose');                    
    var morgan = require('morgan');             
    var bodyParser = require('body-parser');   
    var methodOverride = require('method-override'); 
/*model*/

var Product = require('./models/product');
var User = require('./models/user');
var config = require('./config'); 

var moment = require('moment');
    // configuration =================
    var jwt    = require('jwt-simple'); 
    mongoose.connect('mongodb://127.0.0.1:27017/store');     
    app.set('superSecret', config.secret);
    app.use(express.static(__dirname + '/public'));                 
    app.use(morgan('dev'));                                         
    app.use(bodyParser.urlencoded({'extended':'true'}));           
    app.use(bodyParser.json());                                    
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(methodOverride());



app.post('/registration',function(req, res) {
         
            var user = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });
            //var message = null;
           
            user.save(function(err) {
              if (err) {
               
               res.send(err);
               
              }

           
        
           
            });
          
          
    });

     app.post('/admin',function(req, res){
      User.findOne({ name: req.body.name, password : req.body.password}, 'name password isAdmin', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Name or password is wrong' });
    }
    console.log(user.isAdmin);
    if(user.isAdmin == 'true'){
    const payload = {
      name: user.name 
    }

    

   

   res.send({
      name: user.name,
      token: createJWT(user)
    });
  }else{
    return res.status(401).send({ message: 'Go away' });
  }
  });
     });
          
          
   



 app.get('/api/products',ensureAuthenticated,function(req, res) {

  console.log(req.user);
   User.findOne({ _id : req.user}, 'isAdmin',function(err,user){
if(user.isAdmin == 'true'){

     Product.find(function(err, products) {

            
            if (err)
                res.send(err)

            res.json(products); 
        });
 }
        
      else{  Product.find({
          user_id : req.user
        }, function(err, products) {

           
            if (err)
                res.send(err)

            res.json(products); 
        });
    }
  });
 
    });
  app.get('/api/allproducts',function(req, res) {

  

     Product.find(function(err, products) {

            if (err)
                res.send(err)

            res.json(products); 
        });
 
        
      
 
    });


    app.get('/api/products/:id',ensureAuthenticated, function(req, res){
         Product.findOne({
            _id : req.params.id
        },function(err, product){

            if(err) res.send(err);
            res.json(product);

        });

       


        });
 

   
    app.post('/api/products',ensureAuthenticated, function(req, res) {



        
        Product.create({
            user_id : req.user,
            name : req.body.name,
            price : req.body.price,
            
             }, function(err, product) {
            if (err)
                res.send(err);

            
            Product.find({
                        user_id : req.user
                      },function(err, products) {
                if (err)
                    res.send(err)
                res.json(products);
            });
        });

    });

    
    app.delete('/api/products/:id', function(req, res) {
        Product.remove({
            _id : req.params.id
        }, function(err, product) {
            if (err) res.send(err);

            res.json(product);
              

          
     
        
        });

    });
    app.put('/api/products/:id',ensureAuthenticated, function (req, res) {
        console.log(req.body.name);
        var id = req.params.id;
        var name = req.body.name;
        var price  = req.body.price;
        if(name == undefined){
             return res.status(422).send({ message: 'JAJJAJ'});
        }
        Product.findById(id, function(err, product){
            if(err) res.json(err);

            product.name = name;
            product.price = price;

            product.save(function(err, product){
                if(err) res.json(err);
                      Product.find({
                        user_id : req.user
                      }, function(err, products) {

          
            if (err)
                res.send(err)

            res.json(products); 
        });
            });

        });



    });
   
 app.get('/profile',ensureAuthenticated,function(req, res){
       User.findById(req.user, 'name', function(err, user) {
      if(!user)return res.status(403).send({ message: 'You are not registered as user' });
      if(user){
        res.send(user);
      }
    });
  });


  function createJWT(user) {
  var payload = {
    sub: user._id,
    adm : user.isAdmin,
    iat: moment().unix(),
    exp: moment().add(3600, 'days').unix()
  };
  return jwt.encode(payload, config.secret);
}
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.secret);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(440).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  
  next();
}

 app.post('/login',function(req, res, next) {
   // console.log('/');
           User.findOne({ name: req.body.name, password : req.body.password}, 'name password ', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Name or password is wrong' });
    }
    console.log(user);

    const payload = {
      name: user.name 
    };
res.send({
      name: user.name,
      token: createJWT(user)
    });
  });
  });


     app.listen(8080);
    console.log("App listening on port 8080");