// module.exports = {
//     hello: function() {
//        return "Hello";
//     }
//  }
module.exports={

hello: function(){

  con = mysql.createConnection({
    host: "localhost",
    user: "root",
      // database: "manavdb"
    //  password: "Manavjain@25",
    port:3306,
    database:"bookstore"
    //  socketPath: '/var/run/mysqld/mysqld.sock'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  }); 

}}
