const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

require('./config/mongoose.config');
app.use(cookieParser());

//  MIDDLEWARE:
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
require('./routes/user.routes')(app);
require('./routes/spot.routes')(app);



// Validation and registration:
require('dotenv').config();

app.listen(9000, () => {
    console.log("Listening at Port 9000")
})