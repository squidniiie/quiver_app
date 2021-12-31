const jwt = require("jsonwebtoken");

module.exports.authenticate = (request, response, next) => {

    console.log(request.cookies);
    jwt.verify(request.cookies.userToken, process.env.FIRST_SECRET_KEY, (err, payload) => {
        if (err) {
            response.status(401).json({ verified: false });
        } else {
            next();
        }
        console.log("Cookies")
    });
}