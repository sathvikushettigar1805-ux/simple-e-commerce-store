// ========================================
// PRODUCT DETAILS PAGE
// ========================================


// Get product ID from URL

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const productId =
    urlParams.get("id");


const productDetails =
    document.getElementById(
        "product-details"
    );


// ========================================
// LOAD PRODUCT
// ========================================

async function loadProduct() {

    if (!productId) {

        productDetails.innerHTML = `
            <p class="loading">
                Product not found.
            </p>
        `;

        return;
    }


    try {

        const response =
            await fetch(
                `/api/products/${productId}`
            );


        if (!response.ok) {

            throw new Error(
                "Product not found"
            );

        }


        const product =
            await response.json();


        displayProduct(product);


    } catch (error) {

        console.error(error);


        productDetails.innerHTML = `
            <p class="loading">
                Unable to load product.
            </p>
        `;

    }

}


// ========================================
// DISPLAY PRODUCT
// ========================================

function displayProduct(product) {

    productDetails.innerHTML = `

        <div class="product-details">

            <div>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-details-image"
                >

            </div>


            <div class="product-details-info">

                <a
                    href="index.html"
                    class="back-btn"
                >
                    ← Back to Products
                </a>


                <div class="product-details-category">

                    ${product.category}

                </div>


                <h1>

                    ${product.name}

                </h1>


                <p class="product-details-description">

                    ${product.description}

                </p>


                <div class="product-details-price">

                    ₹${product.price}

                </div>


                <p class="product-stock">

                    ${
                        product.stock > 0
                        ? `In Stock (${product.stock} available)`
                        : "Out of Stock"
                    }

                </p>


                ${
                    product.stock > 0
                    ? `
                        <button
                            class="details-cart-btn"
                            onclick="addProductToCart('${product._id}')"
                        >
                            🛒 Add to Cart
                        </button>
                      `
                    : `
                        <button
                            class="details-cart-btn"
                            disabled
                        >
                            Out of Stock
                        </button>
                      `
                }

            </div>

        </div>

    `;
}


// ========================================
// ADD TO CART
// ========================================

function addProductToCart(productId) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(
            item =>
                item.productId === productId
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


    alert(
        "Product added to cart!"
    );

}


// ========================================
// CART COUNT
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
        document.getElementById(
            "cart-count"
        );


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }

}


// ========================================
// START
// ========================================

loadProduct();

updateCartCount();