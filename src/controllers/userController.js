const User = require("../models/userModal");

class userController {
    // update user info
    updateUserInfo = async (req, res) => {
        const _id = req.user.id;
        const findUser = await User.findOne({ _id });
        const { name, email, phone, address } = req.body;
        if (findUser) {
            findUser.name = name;
            findUser.email = email;
            findUser.phone = phone;
            findUser.address = address;
            findUser.save();
            res.status(200).json({
                userInfo: {
                    _id,
                    name,
                    email,
                    phone,
                    address,
                    isAdmin: findUser.isAdmin,
                },
                accessToken: req.headers.authorization.split(" ")[1],
                message: "Update info successfull!",
            });
        } else {
            res.status(403).json({
                message: "Update info failure!",
            });
        }
    };

    // get all user by admin account
    getAllUser = async (req, res) => {
        try {
            const allUser = await User.find(
                {},
                "name email phone address isAdmin"
            );
            res.status(200).json({
                allUser,
            });
        } catch (error) {
            res.status(403).json({
                message: "Can't get all user",
            });
        }
    };

    // delete user
    deleteUser = async (req, res) => {
        try {
            const userID = req.body.userID;
            const userDeleted = await User.findByIdAndDelete(userID);
            res.status(200).json({
                message: "Delete successfull",
                email: userDeleted.email,
            });
        } catch (error) {
            res.status(403).json({
                message: "Delete failure",
            });
        }
    };
}

module.exports = new userController();
