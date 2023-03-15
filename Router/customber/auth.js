const express = require('express');
const conn = require('../../DB/connection');
const customber_route = express.Router();
const bcrypt = require('bcrypt')

const saltRounds = 10;
// password check
const passcheck = async (password, dbpassword) => {
    return await bcrypt.compare(password, dbpassword)
}

// customber register
customber_route.post('/register', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let id = req.body.id;
    let hash = bcrypt.hashSync(password, saltRounds)
    try {
        conn.query("select * from customber where email =  ?", email, (err, value) => {
            if (err) throw err;
            if (value.length > 0) {
                res.status(203).json({
                    status: 203,
                    message: "User Already Exists! Login or choose another user email id"
                })
            } else {
                conn.query("insert into customber(id,name,email,password) values (?)", [[id, name, email, hash]], (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).json({ status: 404, message: err })
                    } else {
                        res.status(201).json({ status: 201, result: req.body })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// customber login
customber_route.post('/login', (req, res) => {
    let { email, password } = req.body;

    try {
        conn.query("select * from customber where email =  ?", [email], async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                const user = result[0];
                console.log(user, 'user')
                const passwordMatch = await passcheck(password, user.password);
                if (!passwordMatch) {
                    console.log('username Invalid  or password');
                    res.status(203).json({ status: 203, message: "Invalid email or password." })
                    return;
                }
                res.status(201).json({ status: 201, message: user })
            } else {
                res.status(203).json({ status: 203, message: "Invalid email or password." })
            }
        })

    } catch (error) {
        console.log(error)
    }
})

// get login data
customber_route.get('/get-data/:id', (req, res) => {
    let { id } = req.params
    try {
        conn.query("select * from customber where id = ? ", id, (err, result) => {
            if (err) {
                res.status(404).json({ message: "error" })
            } else {
                res.status(201).json({ result: result[0] })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

// hotel detail data get api
customber_route.get('/hoteldetail', (req, res) => {
    try {
        conn.query("select * from hotel_detail", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result, "det-res")
                res.status(201).json({ status: 201, result: result[0] })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

//password update
customber_route.put('/update-user', (req, res) => {
    let { email, password } = req.body;
    let hash = bcrypt.hashSync(password, saltRounds)

    try {
        conn.query("select * from customber where email = ? ", email, (err, result) => {
            if (err) throw err;

            let user = result[0]
            if (user) {
                let {id} = user;

                conn.query("update customber set password = ? where id = ?" ,[hash,id], (err,result) => {
                    if(err){
                        res.status(404).json({message : err})
                    }else{
                        res.status(201).json({message : "password update sucessfully!!"})
                    }
                })
            } else {
                console.log(user, "det-res")
                res.status(225).json({status  :225 , message : "Email id is not register"})
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = customber_route