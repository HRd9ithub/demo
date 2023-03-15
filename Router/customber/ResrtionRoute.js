var express = require('express');

var res_router = express.Router();

var conn  = require('../../DB/connection');

// ---------------------------------temp room table api
// temp_room table add data 
res_router.post('/add_temp',(req,res) => {
    console.log('req.body', req.body)
    let {Start_date,End_date,adult,Booking_Date ,Total,roomId } = req.body;

    try {
        conn.query("insert into temp_room(Booking_Date,Start_Date,End_Date,Adult,Total,roomId) values(?)",
        [[Booking_Date,Start_date,End_date,adult,Total,roomId]],(err,result) => {
            if(err){

                res.status(404).json({message : err})
            }
            else{
                res.status(201).json({result : result.insertId})
            }
        }
        ) 
    } catch (error) {
        console.log(error)
    }
})

// temp room data single data
res_router.get('/get_temp/:id',(req,res) => {
    let {id} = req.params;
    try {
        conn.query("select photo,temp_room.id,temp_room.roomId,temp_room.Booking_Date,temp_room.Start_Date,temp_room.End_Date,temp_room.Adult,temp_room.Total from room INNER JOIN temp_room ON room.id = temp_room.roomId and temp_room.id = ? ",id,(err,result) => {
            if(err){roo
               res.status(404).json({message:"error"})
           }else{
                res.status(201).json({result : result[0]})

            }
        })
   } catch (error) {
       console.log(error)
   }

})


// temp data delete 
res_router.delete('/delete_room/:id',(req,res) => {
    let {id} = req.params;
    try {
        conn.query("delete from temp_room where id = ?" ,id , (err,result) => {
             if(err){
                res.status(404).json({message: "error"})
             }else{
                res.status(201).json({message: "successfully delete"})
             }
        })
    } catch (error) {
        console.log("error")
    }
})

// ---------------------------------reservation table api

// add
res_router.post('/add_reservation',(req,res) => {
    let {name,email,address,number,city,card,loginId,temp_room_id,Transaction_date} = req.body;
    console.log(req.body)

    try {
        conn.query("insert into reservation(name,email,address,number,city,card_number,loginId,temp_room_id,Transaction_date) values (?)",[[
            name,email,address,number,city,card,loginId,temp_room_id,Transaction_date 
        ]],(err,result) => {
            if(err){
                console.log('err', err)
                res.status(404).json({message: err})
            }else{
                res.status(201).json({result: result.insertId})
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// //  single data
res_router.get('/get_reservation/:id',(req,res) => {
    let {id} = req.params;
    try {
        conn.query("select * from temp_room INNER JOIN reservation ON temp_room.id = reservation.temp_room_id and reservation.id = ? ",id,(err,result) => {
            if(err){
               res.status(404).json({message:"error"})
           }else{
                res.status(201).json({result : result[0]})
            }
        })
   } catch (error) {
       console.log(error)
   }

})

// //  all data get but condtion loginId
res_router.get('/get_all_reservation/:id',(req,res) => {
    let {id} = req.params;
    try {
        conn.query("select * from temp_room INNER JOIN reservation ON temp_room.id = reservation.temp_room_id and reservation.loginId = ? ",id,(err,result) => {
            if(err){
               res.status(404).json({message:"error"})
           }else{
                res.status(201).json({result })
            }
        })
   } catch (error) {
       console.log(error)
   }

})

// delete
res_router.delete('/delete_reservation/:id',(req,res) => {
    let {id} = req.params
    conn.query("delete from reservation where id = ?" ,id,(err,result) => {
        if(err){
            res.status(404).json({message: err})
        }else{
            res.status(201).json({message: "successfully delete"})
        }
    })
})


module.exports = res_router