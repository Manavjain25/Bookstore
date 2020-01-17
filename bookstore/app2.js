var mysql = require('mysql'),


var myModule = require('./server');
   myModule.hello(); 

var myModule1 = require('./public/app1');
  var m= myModule1.hello(); 
  console.log(m)


