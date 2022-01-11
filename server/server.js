// Validation and registration:
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//  MIDDLEWARE:
// Cookies:
const cookieParser = require('cookie-parser');

require('./config/mongoose.config');
app.use(cookieParser());

// blocking cors errors:
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: ["GET", "POST"],
//     allowedHeaders: ["*"],
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// }
// app.use(cors(corsOptions)) // Use this after the variable declaration


//  MIDDLEWARE:
app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000',
        // headers: { "Access-Control-Allow-Origin": ["*"] },
        methods: ["GET", "POST"]
    }));

//required for post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes:
require('./routes/user.routes')(app);
require('./routes/spot.routes')(app);


// Middleware CORS-Manual API CALLS: 
// app.use((req, res, next) => {
//     if (req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET", true);
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//         return res.status(200).end();
//         // return res.status(200).json({});
//     }
//     next();
// });

//listen on port:
app.listen(9000, () => {
    console.log("Listening at Port 9000")
})




