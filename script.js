// ================= PRODUCT DATA =================

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
        description: "Powerful laptop suitable for work, study, programming and entertainment."
    },
    {
        id: 2,
        name: "Smartphone",
        price: 25000,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        description: "Modern smartphone with a beautiful display, powerful performance and excellent camera."
    },
    {
        id: 3,
        name: "Headphones",
        price: 2500,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable wireless headphones with high-quality sound."
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 4000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        description: "Stylish smart watch for tracking activities, notifications and daily fitness."
    },
    {
        id: 5,
        name: "Keyboard",
        price: 1500,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable and responsive keyboard for work, study and gaming."
    },
    {
        id: 6,
        name: "Wireless Mouse",
        price: 900,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
        description: "Ergonomic wireless mouse with smooth and accurate tracking."
    }
];


// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= ORDERS =================

let orders = JSON.parse(localStorage.getItem("orders")) || [];


// ================= USERS =================

let users = JSON.parse(localStorage.getItem("users")) || [];


// ================= CURRENT USER =================

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;


// ================= LOAD PRODUCTS =================

function loadProducts() {

    const productList = document.getElementById("product-list");

    if (!productList) {
        return;
    }

    productList.innerHTML = "";

    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <div class="product-buttons">

                    <button
                        class="view-btn"
                        onclick="showProductDetails(${product.id})"
                    >
                        View Details
                    </button>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productList.appendChild(productCard);
    });
}


// ================= PRODUCT DETAILS =================

function showProductDetails(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    document.getElementById("detail-image").src =
        product.image;

    document.getElementById("detail-name").textContent =
        product.name;

    document.getElementById("detail-description").textContent =
        product.description;

    document.getElementById("detail-price").textContent =
        `₹${product.price.toLocaleString("en-IN")}`;

    document.getElementById("detail-cart-btn").onclick =
        function () {
            addToCart(product.id);
            closeProductDetails();
        };

    document.getElementById("product-modal").style.display =
        "block";
}


function closeProductDetails() {

    document.getElementById("product-modal").style.display =
        "none";
}


// ================= ADD TO CART =================

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();

    updateCartCount();

    alert(`${product.name} added to cart!`);
}


// ================= SAVE CART =================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// ================= CART COUNT =================

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
}


// ================= OPEN CART =================

function openCart() {

    displayCart();

    document.getElementById("cart-modal").style.display =
        "block";
}


// ================= CLOSE CART =================

function closeCart() {

    document.getElementById("cart-modal").style.display =
        "none";
}


// ================= DISPLAY CART =================

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center; color:#777;">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <span class="cart-item-price">
                    ₹${item.price.toLocaleString("en-IN")}
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

            </div>


            <strong>
                ₹${itemTotal.toLocaleString("en-IN")}
            </strong>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


// ================= INCREASE QUANTITY =================

function increaseQuantity(productId) {

    const item = cart.find(
        item => item.id === productId
    );

    if (item) {

        item.quantity++;

        saveCart();

        displayCart();

        updateCartCount();
    }
}


// ================= DECREASE QUANTITY =================

function decreaseQuantity(productId) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) {
        return;
    }

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart = cart.filter(
            item => item.id !== productId
        );
    }

    saveCart();

    displayCart();

    updateCartCount();
}


// ================= REMOVE PRODUCT =================

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    displayCart();

    updateCartCount();
}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    if (!currentUser) {

        alert(
            "Please login before placing an order."
        );

        document.getElementById("cart-modal").style.display =
            "none";

        document.getElementById("login").scrollIntoView({
            behavior: "smooth"
        });

        return;
    }

    closeCart();

    document.getElementById(
        "checkout-modal"
    ).style.display = "block";
}


// ================= CLOSE CHECKOUT =================

function closeCheckout() {

    document.getElementById(
        "checkout-modal"
    ).style.display = "none";
}


// ================= CHECKOUT FORM =================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const checkoutForm =
            document.getElementById("checkout-form");

        if (checkoutForm) {

            checkoutForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    placeOrder();
                }
            );
        }
    }
);


// ================= PLACE ORDER =================

function placeOrder() {

    const name =
        document.getElementById(
            "checkout-name"
        ).value.trim();

    const address =
        document.getElementById(
            "checkout-address"
        ).value.trim();

    const phone =
        document.getElementById(
            "checkout-phone"
        ).value.trim();

    const paymentMethod =
        document.getElementById(
            "payment-method"
        ).value;


    if (!name || !address || !phone) {

        alert(
            "Please fill all checkout details."
        );

        return;
    }


    let total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    const order = {

        id:
            "ORD" +
            Date.now(),

        customer:
            name,

        email:
            currentUser.email,

        address:
            address,

        phone:
            phone,

        payment:
            paymentMethod,

        items:
            [...cart],

        total:
            total,

        date:
            new Date().toLocaleString(),

        status:
            "Order Placed"
    };


    orders.push(order);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    cart = [];

    saveCart();

    updateCartCount();


    document.getElementById(
        "checkout-form"
    ).reset();


    closeCheckout();


    displayOrders();


    alert(
        `Order placed successfully!\nOrder ID: ${order.id}`
    );


    document.getElementById(
        "orders"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


// ================= DISPLAY ORDERS =================

function displayOrders() {

    const ordersList =
        document.getElementById(
            "orders-list"
        );

    if (!ordersList) {
        return;
    }

    const userOrders =
        currentUser
            ? orders.filter(
                order =>
                    order.email ===
                    currentUser.email
            )
            : [];


    if (userOrders.length === 0) {

        ordersList.innerHTML = `
            <p class="no-orders">
                No orders yet.
            </p>
        `;

        return;
    }


    ordersList.innerHTML = "";


    userOrders
        .slice()
        .reverse()
        .forEach(order => {

            const orderCard =
                document.createElement("div");

            orderCard.className =
                "order-card";


            let productsText =
                order.items
                    .map(
                        item =>
                            `${item.name} × ${item.quantity}`
                    )
                    .join(", ");


            orderCard.innerHTML = `

                <h3>
                    Order ID: ${order.id}
                </h3>

                <p>
                    <strong>Date:</strong>
                    ${order.date}
                </p>

                <p>
                    <strong>Products:</strong>
                    ${productsText}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₹${order.total.toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>Payment:</strong>
                    ${order.payment}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${order.status}
                </p>
            `;


            ordersList.appendChild(
                orderCard
            );
        });
}


// ================= REGISTER =================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const registerForm =
            document.getElementById(
                "register-form"
            );

        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document.getElementById(
                            "register-name"
                        ).value.trim();


                    const email =
                        document.getElementById(
                            "register-email"
                        ).value.trim();


                    const password =
                        document.getElementById(
                            "register-password"
                        ).value;


                    if (
                        users.some(
                            user =>
                                user.email === email
                        )
                    ) {

                        alert(
                            "An account with this email already exists."
                        );

                        return;
                    }


                    const newUser = {

                        name:
                            name,

                        email:
                            email,

                        password:
                            password
                    };


                    users.push(newUser);


                    localStorage.setItem(
                        "users",
                        JSON.stringify(users)
                    );


                    alert(
                        "Registration successful! Please login."
                    );


                    registerForm.reset();

                    showLogin();
                }
            );
        }
    }
);


// ================= LOGIN =================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginForm =
            document.getElementById(
                "login-form"
            );

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const email =
                        document.getElementById(
                            "login-email"
                        ).value.trim();


                    const password =
                        document.getElementById(
                            "login-password"
                        ).value;


                    const user =
                        users.find(
                            user =>
                                user.email === email &&
                                user.password === password
                        );


                    if (!user) {

                        alert(
                            "Invalid email or password."
                        );

                        return;
                    }


                    currentUser = {

                        name:
                            user.name,

                        email:
                            user.email
                    };


                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(
                            currentUser
                        )
                    );


                    alert(
                        `Welcome, ${user.name}!`
                    );


                    loginForm.reset();


                    displayOrders();
                }
            );
        }
    }
);


// ================= SHOW REGISTER =================

function showRegister() {

    document.getElementById(
        "register-box"
    ).style.display = "block";


    document.querySelector(
        ".auth-box:not(#register-box)"
    ).style.display = "none";
}


// ================= SHOW LOGIN =================

function showLogin() {

    document.getElementById(
        "register-box"
    ).style.display = "none";


    document.querySelector(
        ".auth-box:not(#register-box)"
    ).style.display = "block";
}


// ================= SCROLL TO PRODUCTS =================

function scrollToProducts() {

    document.getElementById(
        "products"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


// ================= CLOSE MODALS WHEN CLICKING OUTSIDE =================

window.addEventListener(
    "click",
    function (event) {

        const productModal =
            document.getElementById(
                "product-modal"
            );

        const cartModal =
            document.getElementById(
                "cart-modal"
            );

        const checkoutModal =
            document.getElementById(
                "checkout-modal"
            );


        if (event.target === productModal) {

            closeProductDetails();
        }


        if (event.target === cartModal) {

            closeCart();
        }


        if (event.target === checkoutModal) {

            closeCheckout();
        }
    }
);


// ================= INITIALIZE WEBSITE =================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProducts();

        updateCartCount();

        displayOrders();

    }
);