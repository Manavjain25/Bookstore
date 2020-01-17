
//var mysql =require('mysql'),

// var myModule = require('./server');
// myModule.hello(); 




 function myfunction(i) {

  //  var mysql =require('mysql')
  

    console.log(i);
    var n = document.images.item(i).src;
    console.log(n)
    var el = document.querySelectorAll("#demo");
    console.log(el[i].innerText)
    var newdata={img :n ,title:el[i].innerText}
    console.log (newdata)
    
    
  }
 

   //  module.exports = {
   //      hello: function myfunction(i){
   //              console.log(i)
   //              var n =document.images.item(i).src
   //              console.log(n)
   //              var el =document.querySelectorAll("#demo")
   //              console.log(el[i].innerText)
   //              var newdata={img :n ,title:el}
   //              return(newdata)
   //          }
   //  }

    