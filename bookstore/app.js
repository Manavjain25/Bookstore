var express = require('express');
    path =require('path'),
    app = express(),
    bodyParser = require("body-parser"),
    request =require ('request'),
    mysql = require('mysql'),
    passport =require("passport"),
    LocalStrategy=require("passport-local"),
    nodemailer = require('nodemailer');
  


var session = require('express-session');
var flash = require('req-flash');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
    

var myModule = require('./server');
  myModule.hello(); 
 
 
var myModule =require('./paypal');
myModule.hello1();

app.use(express.static('public'));
app.use(express.static(__dirname +'/public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());



  app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));

  
app.use(flash());


var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'bookstore3020@gmail.com',
    pass: 'bookstore@123'
  }
});

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'bookstore3020@gmail.com',
//     pass: 'bookstore@123'
//   }
// });

var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/


app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        var sql ="Insert into signup set ?"
    
    con.query(sql, newdata, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
        var data=newdata.username;
        var count=0;

        res.render("home",{data:data,count:count});
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});



app.get("/",(req,res)=>{
        res.render("landing");
     });
// app.get("/error",(req,res)=>{
//       res.render("error");
//    });

app.get("/admin",(req,res)=>{
   res.render("admin",{errors: req.flash('error')});
})
app.get("/adminpage",(req,res)=>{
  var sql ="Select bookname,status,bookimg,price,emailid,Phoneno from oldbook where status = 'PENDING' "

  con.query(sql,function (err, result) {
     if (err) throw err; 
  //  console.log(result);
   count=result.length
   res.render("adminpage",{result:result,count:count})
   
  })
});


app.post("/accept",(req,res)=>{
  var sql = "UPDATE oldbook SET status = 'Accepted' WHERE status = 'PENDING'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result.affectedRows + " record(s) updated");
    count=result.length
    res.render("adminpage",{result:result,count:count})
  
  });

})


  app.get("/paypal",(req,res)=>{
      res.render("index");
   });
    
app.get("/practice",(req,res)=>{
      res.render("practice");
   });

app.get("/search",(req,res)=>{
    res.render("search");
 });


app.get("/checkout",(req,res)=>{

  res.render("checkout");

})

app.get("/checkout2",(req,res)=>{
  var sql ="Select title,price from  cart where username like ? "
  data=user.username
  console.log(data);
  con.query(sql,data, function (err, result) {
    if (err) throw err;
  console.log(result); 
  count=result.length
  console.log(result.length);
   res.render("checkout2",{result:result,count:count})
  });

})


 app.get("/home",(req,res)=>{
  var sql ="Select img,title,price from  cart where username like ? "
  data=user.username
  con.query(sql,data, function (err, result) {
    if (err) throw err; 
  count=result.length
  console.log(result.length);
  res.render("home",{data:data,count:count});
});
// console.log(count);

 });


app.get("/sell",(req,res)=>{
  res.render("sell");
});



app.get("/purchase",(req,res)=>{

  var sql ="Select bookname,status,bookimg,price,emailid,Phoneno from oldbook where status = 'Accepted' "

con.query(sql,function (err, result) {
   if (err) throw err; 
 console.log(result);
 count=result.length
 res.render("purchase",{result:result,count:count})
 
})



});


app.post("/sell",(req,res)=>{
  console.log(req.body);
  var sql ="Select Emailid from  signup where username like ? "
  data=user.username
  con.query(sql,data, function (err, result) {
    if (err) throw err; 

    emailid=result[0].Emailid;
    console.log(emailid);
    console.log(req.body.Phoneno)
  var newdata={
    bookname :req.body.BookName, bookimg :req.body.upload_cont_img, price: req.body.BookPrice,status:"PENDING",bookDetails:req.body.BookDetails,emailid:emailid,Phoneno:req.body.Phoneno
     }

     var sql ="Insert into oldbook set ?"
    
    con.query(sql, newdata, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
       });

});
    res.redirect("/home");
});


app.get("/cart",(req,res)=>{

 var sql="Delete from cart where img is NULL"
con.query(sql,function(err,result){
  if(err) throw err;
})  

  var sql ="Select img,title,price from  cart where username like ? "
  data=user.username
  con.query(sql,data, function (err, result) {
    if (err) throw err; 
  count=result.length
  console.log(result.length);
  res.render("cart",{result:result,count:count})


  // res.send("Hello")
 
});
// res.render("cart",{user:user});
// con.end()
});


// show register form
app.get("/login",(req,res)=>{
      res.render("login",{errors: req.flash('error')});
   });

   app.get("/register",(req,res)=>{
    res.render("login");
 });


//handling signup logic
app.post("/register",function(req, res){


  console.log(req.body)
   email=req.body.email;
   pass=req.body.password;
 

  let hash = bcrypt.hashSync(pass, 10);
    newdata={
    username :req.body.username,password: hash, Emailid: req.body.email
     }
     console.log(newdata)
    //  var mailOptions = {
    //   from: 'manavmessi25@gmail.com',
    //   to:  req.body.email,
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!',
    //   html: '<h1>Welcome!</h1><p>Great to have you in our family</p> '
    // };
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
        to : req.body.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
        console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            res.render("temp",{});
         }
});
});


// handling login logic
app.post("/login",function(req,res){
   user =req.body
  var data=req.body.username
  var pass=req.body.password
  var sql ="Select password from  signup where username like ? "
  
    con.query(sql,data, function (err, result) {
              if (err) throw err; 
            console.log(result[0].password);
            var  hash=result[0].password

            if(bcrypt.compareSync(pass,hash)) {
              
               
              // res.render("home",{data:data})
              res.redirect("/home")
             } else {
              req.flash('error', 'Username or Password Incorrect!');
              res.redirect("/login");
              // Passwords don't match
             }

          
          });
  })


// handling login logic
app.post("/adminlogin",function(req,res){
 var data=req.body.username
 var pass=req.body.password
 var sql ="Select password from  signup where username like ? "
 
   con.query(sql,data, function (err, result) {
             if (err) throw err; 
           console.log(result[0].password);
           var  hash=result[0].password

           if(bcrypt.compareSync(pass,hash)) {
             
              
             // res.render("home",{data:data})
             res.redirect("/adminpage")
            } else {
             req.flash('error', 'Username or Password Incorrect!');
             res.redirect("/adminlogin");
             // Passwords don't match
            }

         
         });
 })


app.get("/results",function(req,res){ 
   query =req.query.search;
 var url="https://www.googleapis.com/books/v1/volumes?q="+query;
  request(url,function(error,response,body){
 if(!error && response.statusCode ==200){
  console.log("Working!");
 var data =JSON.parse(body)
  // console.log(data.items[1])
 res.render("results",{data:data,user:user,mysql:mysql,query:query}); 
}});
});


app.post("/cart",function(req,res){
  
  console.log(req.body.title)
   var newdata={
       username:user.username,password:user.password, img:req.body.img ,title:req.body.title,price:req.body.price
       }
    var sql ="Insert into cart set ?"
     con.query(sql, newdata, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
  
     });
   res.redirect("/cart");
});


app.post("/cart1",function(req,res){

    m=req.body.title
    console.log(req.body)
    var sql= `DELETE FROM cart WHERE title = ?`
    con.query(sql,m, (error, results, fields) => {
     if (error)
       return console.error(error.message);
   
     console.log('Deleted Row(s):', results.affectedRows);
     res.redirect("/cart")
   });
  //  con.end()
})




app.post("/checkout",function(req,res){
  console.log(req.body.price)
   result=req.body.price
 res.render("checkout2",{result:result})
 
  // console.log(req.body);
  // console.log(res.body);

});


app.post("/checkout2",function(req,res){
    console.log(req.body);

    var sql ="Select title,price from  cart where username like ? ";
    data=user.username;
    con.query(sql,data, function (err, result) {
      if (err) throw err; 
    console.log(result);
  });


    var newdata={
      FirstName:req.body.firstName, LastName :req.body.lastName, Username: req.body.username,Email:req.body.email,
      Address:req.body.address,Country:req.body.country,State:req.body.state,Zip:req.body.zip,Amount:result,MOD:req.body.paymentMethod
    }   
    var sql ="Insert into customer set ?"
    con.query(sql, newdata, function (err, result) {
     if (err) throw err;
     console.log("1 record inserted");
    });
    res.render("Feedback");
});



// <!-- <div id="amount">
// <input id="Value" type="text" style="display: none;"> -->
// <!-- <%= result/70 %>  -->

// <!-- </div> -->

app.get('*', function(req, res){
  res.redirect("error")
});

app.listen(3001,()=>{
    console.log("server started");
});


