const verifyToken = require("./verifyToken");

const verifyAdminAccount = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                message: "You're not allowed!!",
            });
        }
    });
};

module.exports = verifyAdminAccount;
