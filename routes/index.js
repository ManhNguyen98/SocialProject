var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register',function(req,res){
 res.render('index');
});

router.post('/register',function(req,res,next){
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
    email : email
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

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/', failureFlash: 'Tài khoản hoặc mật khẩu không đúng'}),
  function(req,res){
  req.flash('success','Đăng nhập thành công');
  res.redirect('/');//chuyen huong
  });


  
passport.use(new LocalStrategy(function(username,password,done){
  User.getUserByUsername(username,function(err,user){
    if (err) throw err;
    if(!user) {
      return done(null,false);
    }

    User.comparePassword(password,user.passWord,function(err,isMatch){
      if(err) return done(err);
      if(isMatch) return done(null,user);
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


module.exports = router;
