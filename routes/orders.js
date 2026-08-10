const express = require("express");
const router = express.Router();

const Order = require("../models/order");


// =============================
// Create Order
// =============================

router.post("/", async (req, res) => {

    try {

        const {
            user,
            items,
            totalAmount,
            shippingAddress
        } = req.body;

        if (!user || !items || items.length === 0 || !shippingAddress) {
            return res.status(400).json({
                message: "Please provide all order details"
            });
        }

        const order = new Order({
            user,
            items,
            totalAmount,
            shippingAddress
        });

        await order.save();

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        console.error("Order error:", error);

        res.status(500).json({
            message: "Failed to place order"
        });

    }

});


module.exports = router;