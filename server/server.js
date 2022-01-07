// Validation and registration:
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// Middleware CORS API CALLS: 
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET", true);
        return res.status(200).json({});
    }
    next();
});

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

const cookieParser = require('cookie-parser');

require('./config/mongoose.config');
app.use(cookieParser());

//  MIDDLEWARE:
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
require('./routes/user.routes')(app);
require('./routes/spot.routes')(app);

app.listen(9000, () => {
    console.log("Listening at Port 9000")
})