var createError = require('http-errors');
var bcrypt = require('bcryptjs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({dest:'./uploads'});
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var User = require('./models/user');
var Room = require('./models/room');
var tenuser = new User() ;
var oldStatus;
var room1oldmess;
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var listUserOnline = [];
var friended;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Handle sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave:true
}));
//soket io
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
//Passport
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(require('connect-flash')());

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(function(req,res,next){
    res.locals.errors = null;
    res.locals.user = null;
    res.locals.email = null;
    next();
  });

  app.get('/', function(req, res, next) {
    res.render('index');
  });
  
  app.get('/register',function(req,res){
   res.render('index');
  });
  
  app.post('/register',function(req,res,next){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var birthday = req.body.bday;
    var gender = req.body.gender;
  
    //Form Validator
    req.checkBody('firstname','Họ là bắt buộc').notEmpty();
    req.checkBody('lastname','Tên là bắt buộc').notEmpty();
    req.checkBody('username','Tên đăng nhập là bắt buộc').notEmpty();
    req.checkBody('email','Email là bắt buộc').notEmpty();
    req.checkBody('email','Email không được chứa ký tự đặc biệt').isEmail();
    req.checkBody('password','Mật khẩu là bắt buộc').notEmpty();
    req.checkBody('password2','Mật khẩu không đúng').equals(req.body.password);
  
    //Check errors
    var errors = req.validationErrors();
    if(errors){
      res.render('index',{
        errors: errors
      });
    }else{
      //kiem tra tai khoan va mat khau ton tai
       User.getUserByUsername(username,function(err,user){
         if(err) throw err;
         if(user){
           res.render('index',{
             user:user
           });
         }else{
           User.getEmailByEmailName(email,function(err,email){
             if (err) throw err;
             if(email){
               res.render('index',{
                 email: email
               });
           }else{
      var newUser = new User({
      firstName : firstname,
      lastName : lastname,
      userName : username,
      passWord : password,
      email : email,
      status: [
        {
            "time": "",
            "text": ""
        }
    ],
      friends: [ 
        {
            "user" : "",
            "message" : ""
        }
    ],
      room:[ 
        {
            "roomName" : "",
            "isCreated" : "",
            "message" : [ 
                {
                    "user" : "",
                    "message" : "",
                    "time" : ""
                }
            ]
        }
    ]
      })
  
      User.createUser(newUser,function(err,user){
       if (err) throw err;
        console.log(user);
      });
  
       req.flash('success','Chào mừng bạn đến với Social');
       res.location('/');
       res.redirect('/');
            }
          });
         }
       });
     }
   });
  
  //Handle Login
  app.post('/login',
    passport.authenticate('local', {failureRedirect: '/', failureFlash: 'Tài khoản hoặc mật khẩu không đúng'}),
    function(req,res){
    res.render('homepage');
  });
  
  passport.use(new LocalStrategy(function(username,password,done){
    User.getUserByUsername(username,function(err,user){
      if (err) throw err;
      if(!user) {
        return done(null,false);
      }
  
      User.comparePassword(password,user.passWord,function(err,isMatch){
        if(err) return done(err);
        if(isMatch){
        tenuser = user;
        return done(null,user);
        } 
        else return done(null,false);
      });
    });
  }));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

  io.on("connection",function(socket){
    console.log("co nguoi ket noi: " + socket.id);
    console.log(tenuser);
    listUserOnline.push(tenuser);
    socket.user = tenuser;
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("social");
      dbo.collection("users").findOne({userName:tenuser.userName},function(err,res){
        if (err) throw err;
        oldStatus = res.status;
        socket.emit('your-status',res.status);
      });
      dbo.collection("rooms").findOne({roomName:'chuyentinhcam'},function(err,res){
        if (err) throw err;
        room1oldmess = res.chat;
      });
      db.close();
    });
    //GetNameByUserName
    //TODO: code here
    ///////////////////
    socket.emit('your-name',tenuser);
    io.sockets.emit('user-online',listUserOnline);
    socket.on("disconnect",function(){
    console.log("byte");
    listUserOnline.splice(listUserOnline.indexOf(socket.user),1);
    socket.broadcast.emit('user-online',listUserOnline);
   });
    //tao Room
   socket.on('tuvantinhcam-CreateRoom',function(data){
    socket.join(data);
    //Load tin nhan cu len
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("social");
      
      dbo.collection("rooms").findOne({roomName:'chuyentinhcam'},function(err,res){
        if (err) throw err;
        room1oldmess = res.chat;
        socket.emit("old-mess-room1",res.chat);
        //console.log(res.chat);
      });
      db.close();
    });
   });
   //chat
   socket.on('tuvantinhcam-chatting',function(data){
    socket.in('tuvantinhcam').broadcast.emit("tuvantinhcam-chat",data);
    socket.emit('your-mess',data);
    //luu tin nhan vao db
    MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("social");
      var newMess = { $set: {chat: room1oldmess + data + "```"}};

      dbo.collection("rooms").updateOne({roomName:'chuyentinhcam'},newMess,function(err){
        if (err) throw err;
      });

      dbo.collection("rooms").findOne({roomName:'chuyentinhcam'},function(err,res){
        if (err) throw err;
        room1oldmess = res.chat;
      });
      db.close();
    });
   });

   //luu status
   socket.on("save-status",function(user,time,text){
     MongoClient.connect(url,function(err,db){
      if (err) throw err;
      var dbo = db.db("social");
      var newObj = {
        "time" : time,
        "text" : text
    }
      var newVal = { $push: {status: newObj} };
      dbo.collection("users").updateOne({userName:user.userName},newVal,function(err){
        if (err) throw err;
      });
      dbo.collection("users").findOne({userName:user.userName},function(err,res){
        if (err) throw err;
        console.log(res);
        oldStatus = res.status;
      });
      db.close();
      });
   });
   function isFriend(user1,user2){
     MongoClient.connect(url,function(err,db){
      if (err) console.log(err);
      var dbo = db.db("social");
      dbo.collection("users").findOne({userName: user2},function(err,res){
       if (err) console.log(err);
       if(res)
       for(i=1;i<res.friends.length;i++){
         if (res.friends[i].userName == user1)
         friended = 1;
         break;
       }
      });
      db.close();
    });    
  }
   //them ban
   socket.on('addfriend',function(data){
     if (data != socket.user.userName){
       friended = 0;
      isFriend(data,socket.user.userName);
      console.log(friended);
       //khong tu ket ban voi chinh minh
  //      if (friended == 0){
  //        console.log("Unfriended!")
  //    MongoClient.connect(url,function(err,db){
  //     if (err) throw err;
  //     var dbo = db.db("social");
  //     var newfriend = {
  //         "user": data,
  //         "message": ""
  //       }
  //     var newVal = { $push: {friends: newfriend} };
      
  //     //them ban vao db cua minh
  //     dbo.collection("users").updateOne({userName:socket.user.userName},newVal,function(err){
  //       if (err) throw err;
  //     });

  //     newfriend = {
  //       "user": socket.user.userName,
  //       "message": ""
  //     }
  //     newVal = { $push: {friends: newfriend}};
  //     //them ban vao db cua ban
  //     dbo.collection("users").updateOne({userName: data},newVal,function(err){
  //       if (err) throw err;
  //     });
  //     db.close();
  //   });
  // }
}
   });
   
   ///TODO: code here
  });

  app.get("/logout",function(req,res){
    res.render("index");
  });
  
