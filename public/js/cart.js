// ========================================
// SHOP EASY - SHOPPING CART
// ========================================


// Get cart from localStorage

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// ========================================
// LOAD CART
// ========================================

async function loadCart() {

    const cartItems =
        document.getElementById("cart-items");

    try {

        if (cart.length === 0) {

            showEmptyCart();

            return;
        }


        // Get all products

        const response =
            await fetch("/api/products");


        if (!response.ok) {

            throw new Error(
                "Failed to load products"
            );
        }


        const products =
            await response.json();


        displayCart(products);


    } catch (error) {

        console.error(error);

        cartItems.innerHTML = `
            <p class="loading">
                Unable to load cart.
            </p>
        `;

    }

}


// ========================================
// DISPLAY CART
// ========================================

function displayCart(products) {

    const cartItems =
        document.getElementById("cart-items");


    cartItems.innerHTML = "";


    let total = 0;

    let totalItems = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    p._id === item.productId
            );


        // Skip if product doesn't exist

        if (!product) {
            return;
        }


        const itemTotal =
            product.price *
            item.quantity;


        total += itemTotal;

        totalItems += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.category}
                </p>


                <div class="cart-item-price">

                    ₹${product.price}

                </div>


                <div class="quantity-controls">

                    <button
                        class="quantity-btn"
                        onclick="decreaseQuantity('${product._id}')"
                    >
                        −
                    </button>


                    <span class="quantity">

                        ${item.quantity}

                    </span>


                    <button
                        class="quantity-btn"
                        onclick="increaseQuantity('${product._id}')"
                    >
                        +
                    </button>

                </div>

            </div>


            <div>

                <strong>
                    ₹${itemTotal}
                </strong>

                <br><br>


                <button
                    class="remove-btn"
                    onclick="removeFromCart('${product._id}')"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    // Update summary

    document.getElementById(
        "summary-items"
    ).textContent = totalItems;


    document.getElementById(
        "cart-total"
    ).textContent = `₹${total}`;


    document.getElementById(
        "cart-count"
    ).textContent = totalItems;


    // Disable checkout if empty

    document.getElementById(
        "checkout-btn"
    ).disabled = totalItems === 0;

}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(productId) {

    const item =
        cart.find(
            item =>
                item.productId === productId
        );


    if (item) {

        item.quantity++;

        saveCart();

        loadCart();

    }

}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(productId) {

    const item =
        cart.find(
            item =>
                item.productId === productId
        );


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    item.productId !== productId
            );

    }


    saveCart();

    loadCart();

}


// ========================================
// REMOVE PRODUCT
// ========================================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.productId !== productId
        );


    saveCart();

    loadCart();

}


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ========================================
// EMPTY CART
// ========================================

function showEmptyCart() {

    document.getElementById(
        "cart-items"
    ).innerHTML = `

        <div class="empty-cart">

            <h2>
                Your cart is empty
            </h2>

            <p>
                Add some products to your cart.
            </p>


            <a
                href="index.html"
                class="continue-shopping"
            >
                Continue Shopping
            </a>

        </div>

    `;


    document.getElementById(
        "summary-items"
    ).textContent = "0";


    document.getElementById(
        "cart-total"
    ).textContent = "₹0";


    document.getElementById(
        "cart-count"
    ).textContent = "0";


    document.getElementById(
        "checkout-btn"
    ).disabled = true;

}


// ========================================
// PROCEED TO CHECKOUT
// ========================================

function proceedToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    window.location.href =
        "checkout.html";

}


// ========================================
// START
// ========================================

loadCart();