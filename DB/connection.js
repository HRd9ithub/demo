const mysql = require('mysql');


const conn = mysql.createConnection({
    host: "localhost",
    user :"root",
    password:"",
    database : "hotel_management"
})


conn.connect(() => {
    console.log("database connected")
})

module.exports = conn;