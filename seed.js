const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();

const products = [
    {
        name: "Wireless Headphones",
        description: "Comfortable wireless headphones with clear sound and long battery life.",
        price: 1999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "Electronics",
        stock: 20
    },
    {
        name: "Smart Watch",
        description: "Smart watch with fitness tracking and notifications.",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        category: "Electronics",
        stock: 15
    },
    {
        name: "Running Shoes",
        description: "Lightweight running shoes designed for everyday comfort.",
        price: 1799,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Fashion",
        stock: 25
    },
    {
        name: "Travel Backpack",
        description: "Durable backpack suitable for college, travel and everyday use.",
        price: 1299,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        category: "Accessories",
        stock: 30
    },
    {
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with powerful sound.",
        price: 1499,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
        category: "Electronics",
        stock: 18
    },
    {
        name: "Classic Backpack",
        description: "Simple and stylish backpack for school and college.",
        price: 999,
        image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
        category: "Accessories",
        stock: 22
    }
];

async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("Products added successfully");

        await mongoose.connection.close();

        console.log("Database connection closed");

    } catch (error) {

        console.error("Error:", error.message);

    }
}

seedDatabase();