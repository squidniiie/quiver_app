const { User } = require('../models/user.models');
const jwt = require("jsonwebtoken");



// REGISTER METHOD---------------------------------------
module.exports.register = (request, response) => {
    User.create(request.body)
        .then(user => {
            const userToken = jwt.sign(
                { id: user._id },
                process.env.FIRST_SECRET_KEY
            );
            response.cookie("userToken",
                userToken,
                { httpOnly: true })
                .json({ msg: "Success, this response has a cookie", user: user });
        })
        .catch(err => {
            response.status(400).json(err)
        });
}
// LOGIN METHOD------------------------------------------
module.exports.login = async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (user === null) {
        // email not found in users collection
        return response.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        // password wasn't a match!
        return response.sendStatus(400);
    }
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);
    // note that the response object allows chained calls to cookie and json
    response
        .cookie("userToken", userToken, {
            httpOnly: true
        })
        .json({ msg: "Success!" });
}

module.exports.logout = (request, response) => {
    response.clearCookie("userToken");
    response.sendStatus(200);
}
// -----------------------------------------------------
module.exports.getAllUsers = (request, response) => {
    User.find({}).sort({ userName: 1 })
        .then(users => response.json(users))
        .catch(err => response.json(err))
}
// Update method:
module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.id }, request.body, { runValidators: true, new: true })
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.status(400).json(err))
}
// Delete method:
module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

