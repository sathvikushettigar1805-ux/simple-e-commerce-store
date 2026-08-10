// ========================================
// SHOP EASY - MAIN JAVASCRIPT
// ========================================

const productContainer =
    document.getElementById("product-container");


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

    try {

        const response =
            await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products =
            await response.json();

        displayProducts(products);

    } catch (error) {

        console.error("Error loading products:", error);

        productContainer.innerHTML = `
            <p class="loading">
                Unable to load products.
                Please try again later.
            </p>
        `;
    }
}


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(products) {

    productContainer.innerHTML = "";

    if (products.length === 0) {

        productContainer.innerHTML = `
            <p class="loading">
                No products available.
            </p>
        `;

        return;
    }


    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-price">
                    ₹${product.price}
                </div>

                <div class="product-buttons">

                    <button
                        class="view-btn"
                        onclick="viewProduct('${product._id}')"
                    >
                        View Details
                    </button>

                    <button
                        class="cart-btn"
                        onclick="addToCart('${product._id}')"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;


        productContainer.appendChild(card);

    });
}


// ========================================
// VIEW PRODUCT
// ========================================

function viewProduct(productId) {

    window.location.href =
        `product.html?id=${productId}`;
}


// ========================================
// ADD TO CART
// ========================================

function addToCart(productId) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(
            item => item.productId === productId
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            productId: productId,
            quantity: 1
        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

    showSuccessMessage();
}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent =
            totalItems;
    }
}


// ========================================
// START
// ========================================

loadProducts();

updateCartCount();

function showSuccessMessage() {
    const modal = document.getElementById("success-modal");
    const okButton = document.getElementById("success-ok-btn");

    modal.style.display = "flex";

    okButton.onclick = function () {
        modal.style.display = "none";
    };
}