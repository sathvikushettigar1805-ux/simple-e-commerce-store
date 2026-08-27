# 🛒 ShopEasy — Simple E-Commerce Store

ShopEasy is a full-stack e-commerce web application where users can browse products, create an account, log in, add products to a shopping cart, and place orders.

The project is built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

## 🌐 Live Demo

👉 https://simple-e-commerce-store-8opt.onrender.com

## 📂 GitHub Repository

👉 https://github.com/sathvikushettigar1805-ux/simple-e-commerce-store

---

## ✨ Features

- 🛍️ Browse products
- 🔎 View product details
- 🛒 Add products to cart
- ➕ Increase or decrease product quantity
- ❌ Remove products from cart
- 👤 User registration
- 🔐 Secure user login
- 🔑 Password hashing using bcrypt
- 🧾 Checkout system
- 📦 Place orders
- 🗄️ MongoDB database
- 🔒 Session-based authentication
- 📱 Responsive user interface
- 🚀 Deployed online using Render

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Fetch API

### Backend

- Node.js
- Express.js
- Express Session

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication & Security

- bcryptjs
- Express Session
- Environment Variables

### Deployment & Version Control

- Git
- GitHub
- Render

---

## 📁 Project Structure

```text
Simple E-commerce Store/
│
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
│
├── routes/
│   ├── auth.js
│   ├── orders.js
│   └── products.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── main.js
│   │   └── product.js
│   │
│   ├── cart.html
│   ├── checkout.html
│   ├── index.html
│   ├── login.html
│   ├── product.html
│   └── register.html
│
├── .gitignore
├── package.json
├── package-lock.json
├── seed.js
└── server.js
