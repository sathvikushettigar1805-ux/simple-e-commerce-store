const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// ========================================
// MIDDLEWARE
// ========================================

// Parse JSON request bodies
app.use(express.json());

// Parse form data
app.use(
    express.urlencoded({
        extended: true
    })
);


// ========================================
// SESSION
// ========================================

app.use(
    session({
        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);


// ========================================
// API ROUTES
// ========================================

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);


// ========================================
// SERVE FRONTEND
// ========================================

app.use(
    express.static("public")
);


// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
    .connect(process.env.MONGO_URI)

    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

    })

    .catch((error) => {

        console.error(
            "MongoDB connection failed:"
        );

        console.error(
            error.message
        );

    });


// ========================================
// TEST ROUTE
// ========================================

app.get(
    "/api/test",
    (req, res) => {

        res.json({

            message:
                "ShopEasy backend is working!"

        });

    }
);


// ========================================
// START SERVER
// ========================================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});