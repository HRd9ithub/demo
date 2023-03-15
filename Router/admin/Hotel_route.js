const express = require('express');
const conn = require('../../DB/connection');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// hotel detail update api

router.put('/updatehoteldetail/:id',(req,res) => {
    let {name,number,email,address} = req.body;

    let {id} = req.params;

    try {
        conn.query("update hotel_detail set ? where id=?",[{name,number,email,address,id},id],(err,result) => {
            if(err){
                res.status(404).json({message: "error"});
            }else{
                res.status(201).json({result : req.body});
            }
        })
    } catch (error) {
        console.log(error)
    }
})

//_-------------------------------------facility table api------------------------------//
// hotel facility add api
router.post('/add_facility',(req,res) => {
    let {facility,cost} = req.body;
    
    try {
        conn.query("select * from room_facility where facility = ? ",facility,(err,result) => {
            if(err)throw err;
            if(result.length == 0 ){
                conn.query("insert into room_facility(facility,cost) values (?)",[[facility,cost]],(err,result) => {
                    if(err){
                        res.status(222).json({message: "error"});
                    }else{
                        res.status(201).json({result : req.body});
                    }
                })
            }else{
                res.status(222).json({message :"facility already exists."});
            }
        })     
    } catch (error) {
        console.log('error', error)
    }
})

// get all data facility
router.get('/get_facility',(req,res) => {
    try {
        conn.query("select * from room_facility",(err,result) => {
            if(err){
                res.status(404).json({message: "error"});
            }else{
                res.status(201).json({result});
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// get single data facility table
router.get('/get_single_facility/:id',(req,res) => {
    const {id} = req.params;
    try {
        conn.query("select * from room_facility where id=?",id,(err,result) => {
            if(err){
                res.status(404).json({message: "error"});
            }else{
                res.status(201).json({result: result[0]});
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// update facility data 
router.put('/update_facility/:id',(req,res) => {
    let {facility,cost} = req.body;
    let {id} = req.params
    
    try {
        conn.query("update room_facility set ? where id=? ",[{facility,cost},id],(err,result) => {
            if(err){
                res.status(404).json({message: "error"});
            }else{
                res.status(201).json({result : req.body});
            }
        })
    } catch (error) {
        
    }
})

//_-------------------------------------room type table api------------------------------//
// get all data type
router.get('/get_type',(req,res) => {
    try {
        conn.query("select * from room_type",(err,result) => {
            if(err){
                res.status(404).json({message: "error"});
            }else{
                res.status(201).json({result});
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// get single data room type table
router.get('/get_single_type/:id',(req,res) => {
    const {id} = req.params;
    try {
        conn.query("select * from room_type where id=?",id,(err,result) => {
            if(err){
                res.status(404).json({message: "error"});
            }else{
                res.status(201).json({result: result[0]});
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// update room type  data 
router.put('/update_type/:id',(req,res) => {
    let {type,cost} = req.body;
    let {id} = req.params
    
    try {
        conn.query("update room_type set ? where id=? ",[{type,cost},id],(err,result) => {
            if(err){
                res.status(404).json({message: "error"});
            }else{
                res.status(201).json({result : req.body});
            }
        })
    } catch (error) {
        
    }
})

//_-------------------------------------add new room table api------------------------------//

// 
const image_storage = multer.diskStorage({
    destination : './upload',
    filename : (req,file,cb) => {
        return cb(null,`image_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer ({
    storage: image_storage
})

// add room api 

router.post('/add_room',upload.single('photo'),(req,res) => {
    let {filename} = req.file;
    let { type ,facilities,subTotal} = req.body;


    try {
        conn.query("insert into room(photo,room_facilities,room_type,subtotal) values (?)",
        [[filename,facilities,type,subTotal]],(err,result) => {
            if(err) {
                console.log(err)
                res.status(404).json({message:"error"})
            }else{
                res.status(201).json({message: "add room successfully!!"})
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// get all data
router.get('/get_room',(req,res) => {
    try {
         conn.query("select room.id,photo,room_facilities,room_type,type,cost,subtotal from room INNER JOIN room_type ON room.room_type = room_type.id ",(err,result) => {
             if(err){
                res.status(404).json({message:"error"})
            }else{
                 res.status(201).json({result})

             }
         })
    } catch (error) {
        console.log(error)
    }
})

// single data get
router.get('/get_single_room/:id',(req,res) => {
    let {id} = req.params;
    try {
         conn.query("select room.id,photo,room_facilities,room_type,type,cost,subtotal from room INNER JOIN room_type ON room.room_type = room_type.id and room.id = ?  ",id,(err,result) => {
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

// ----------------------------------booking data get all ----------------//

// //  all data get but condtion 
router.get('/get_all_reservation',(req,res) => {
    try {
        conn.query("select * from temp_room INNER JOIN reservation ON temp_room.id = reservation.temp_room_id ",(err,result) => {
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
module.exports = router