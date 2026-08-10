// ========================================
// SHOP EASY - CHECKOUT
// ========================================

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ========================================
// ELEMENTS
// ========================================

const orderSummary = document.getElementById("orderSummary");
const checkoutForm = document.getElementById("checkoutForm");
const message = document.getElementById("message");


// ========================================
// LOAD CHECKOUT
// ========================================

async function loadCheckout() {

    try {

        // Check if cart is empty
        if (cart.length === 0) {

            orderSummary.innerHTML = `
                <p>Your cart is empty.</p>

                <a href="index.html">
                    Continue Shopping
                </a>
            `;

            checkoutForm.style.display = "none";

            return;
        }


        // Get products from backend
        const response = await fetch("/api/products");

        if (!response.ok) {

            throw new Error(
                "Failed to load products"
            );

        }

        const products = await response.json();

        displayOrderSummary(products);

    } catch (error) {

        console.error("Checkout loading error:", error);

        orderSummary.innerHTML = `
            <p>
                Unable to load your order.
                Please try again.
            </p>
        `;

    }
}


// ========================================
// DISPLAY ORDER SUMMARY
// ========================================

function displayOrderSummary(products) {

    let total = 0;

    let html = `
        <h3>Order Summary</h3>
    `;


    cart.forEach(item => {

        // Find product using productId
        const product = products.find(
            p => p._id === item.productId
        );


        // Product doesn't exist
        if (!product) {
            return;
        }


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        html += `

            <div class="checkout-item">

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <p>
                        ${product.category}
                    </p>

                </div>


                <div>

                    <p>
                        ₹${product.price} ×
                        ${item.quantity}
                    </p>

                    <strong>
                        Subtotal: ₹${itemTotal}
                    </strong>

                </div>

            </div>

        `;

    });


    html += `

        <hr>

        <h3>
            Total: ₹${total}
        </h3>

    `;


    orderSummary.innerHTML = html;

}


// ========================================
// PLACE ORDER
// ========================================

checkoutForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // Get address
        const address = document
            .getElementById("address")
            .value
            .trim();


        if (!address) {

            message.textContent =
                "Please enter your delivery address.";

            return;

        }


        try {

            // ========================================
            // CHECK LOGIN
            // ========================================

            const userResponse =
                await fetch("/api/auth/me");


            const userData =
                await userResponse.json();


            // auth.js returns the user directly:
            //
            // {
            //     _id: "...",
            //     name: "...",
            //     email: "..."
            // }

            if (
                !userResponse.ok ||
                !userData._id
            ) {

                message.textContent =
                    "Please login before placing an order.";


                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 1500);


                return;

            }


            // ========================================
            // GET PRODUCTS
            // ========================================

            const productsResponse =
                await fetch("/api/products");


            if (!productsResponse.ok) {

                throw new Error(
                    "Unable to load products"
                );

            }


            const products =
                await productsResponse.json();


            // ========================================
            // CREATE ORDER ITEMS
            // ========================================

            let totalAmount = 0;

            const orderItems = [];


            cart.forEach(item => {

                const product =
                    products.find(
                        p => p._id === item.productId
                    );


                // Skip invalid product
                if (!product) {
                    return;
                }


                const itemTotal =
                    product.price * item.quantity;


                totalAmount += itemTotal;


                orderItems.push({

                    product: product._id,

                    name: product.name,

                    price: product.price,

                    quantity: item.quantity

                });

            });


            // ========================================
            // CHECK VALID ORDER
            // ========================================

            if (orderItems.length === 0) {

                message.textContent =
                    "Your cart contains no valid products.";

                return;

            }


            // ========================================
            // SEND ORDER TO SERVER
            // ========================================

            const orderResponse =
                await fetch("/api/orders", {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        user:
                            userData._id,

                        items:
                            orderItems,

                        totalAmount:
                            totalAmount,

                        shippingAddress:
                            address

                    })

                });


            const orderData =
                await orderResponse.json();


            // ========================================
            // HANDLE ORDER ERROR
            // ========================================

            if (!orderResponse.ok) {

                message.textContent =
                    orderData.message ||
                    "Failed to place order.";

                return;

            }


            // ========================================
            // ORDER SUCCESS
            // ========================================

            localStorage.removeItem("cart");


            message.textContent =
                "Order placed successfully!";


            checkoutForm.style.display =
                "none";


            // Return to homepage
            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 2000);


        } catch (error) {

            console.error(
                "Checkout error:",
                error
            );


            message.textContent =
                "Something went wrong. Please try again.";

        }

    }
);


// ========================================
// START CHECKOUT
// ========================================

loadCheckout();