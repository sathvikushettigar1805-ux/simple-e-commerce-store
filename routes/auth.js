const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");


// ========================================
// REGISTER
// ========================================

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body || {};


        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = new User({

            name: name,

            email: email,

            password: hashedPassword

        });


        await user.save();


        res.status(201).json({

            message: "Registration successful"

        });


    } catch (error) {

        console.error("Registration error:", error);

        res.status(500).json({

            message: "Registration failed",

            error: error.message

        });

    }

});


// ========================================
// LOGIN
// ========================================

router.post("/login", async (req, res) => {

    try {

        console.log("Login request received");
        console.log("Request body:", req.body);


        const {
            email,
            password
        } = req.body || {};


        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and password are required"

            });

        }


        const user =
            await User.findOne({ email });


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid email or password"

            });

        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Invalid email or password"

            });

        }


        // ========================================
        // CREATE SESSION
        // ========================================

        req.session.userId =
            user._id.toString();

        req.session.userName =
            user.name;


        res.json({

            message:
                "Login successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });


    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({

            message:
                "Login failed",

            error:
                error.message

        });

    }

});


// ========================================
// LOGOUT
// ========================================

router.post("/logout", (req, res) => {

    req.session.destroy(error => {

        if (error) {

            return res.status(500).json({

                message:
                    "Logout failed"

            });

        }


        res.json({

            message:
                "Logout successful"

        });

    });

});


// ========================================
// CHECK CURRENT USER
// ========================================

router.get("/me", async (req, res) => {

    try {

        if (!req.session.userId) {

            return res.status(401).json({

                message:
                    "Not logged in"

            });

        }


        const user =
            await User.findById(
                req.session.userId
            ).select("-password");


        if (!user) {

            return res.status(401).json({

                message:
                    "User not found"

            });

        }


        res.json(user);


    } catch (error) {

        console.error(
            "Get current user error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to get user"

        });

    }

});


module.exports = router;