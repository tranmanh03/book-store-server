const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

class authController {
    // regiter (post)
    register = async (req, res) => {
        try {
            const { name, email, password, phone } = req.body;
            const userEmail = await User.findOne({ email });
            if (userEmail) {
                return res.status(403).json({
                    message: "The email is exis!",
                });
            }
            const password_hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: password_hash,
                phone,
            });
            if (createdUser) {
                res.status(200).json({
                    message: "Register successfull!",
                });
            }
        } catch (error) {
            res.status(404).json({
                message: "Register failure!",
            });
        }
    };

    // login (post)
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    message: "User doesn't exist!",
                });
            }
            const validPassword = bcrypt.compareSync(password, user.password);

            if (user && validPassword) {
                const accessToken = this.generateAccessToken(user);
                const refreshToken = this.generateRefreshToken(user);
                const { password, ...others } = user._doc;
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                res.status(200).json({
                    message: "Login successfull!",
                    userInfo: { ...others },
                    accessToken,
                });
            }
        } catch (error) {
            res.status(401).json({ message: "Login failure" });
        }
    };

    refreshToken = async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            res.status(403).json({
                message: "You are not authenticated",
            });
        } else {
            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_KEY,
                (error, user) => {
                    if (error) {
                        console.log(err);
                    }

                    const newAccessToken = this.generateAccessToken(user);
                    const newRefreshToken = this.generateRefreshToken(user);

                    res.status(200)
                        .cookie("refreshToken", refreshToken, {
                            httpOnly: true,
                            secure: false,
                            sameSite: "strict",
                        })
                        .json({
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                        });
                }
            );
        }
    };

    generateAccessToken = (user) => {
        return jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: "2d",
            }
        );
    };

    generateRefreshToken = (user) => {
        return jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "30d",
            }
        );
    };

    // Logout
    logout = async (req, res) => {
        res.clearCookie("refreshToken");
        res.status(200).json({
            message: "Log Out successfull!",
        });
    };
}

module.exports = new authController();
