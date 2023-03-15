const express = require('express');
require('./DB/connection');
// require('multer');
const cors = require('cors');
const bodyparser = require('body-parser');
const  route  = require('./Router/admin/auth');
const router = require('./Router/admin/Hotel_route');
const customber_route = require('./Router/customber/auth');
const res_router = require('./Router/customber/ResrtionRoute');


const app = express();

const port = 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/upload',express.static('upload'));

app.use('/admin',route)
app.use('/hotel',router)
app.use('/customber',customber_route)
app.use('/room',res_router)

app.listen(port,() => {
    console.log(`server running is ${port}`)
})