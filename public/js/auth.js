// ========================================
// SHOP EASY - AUTHENTICATION
// ========================================


// ========================================
// REGISTER
// ========================================

const registerForm =
    document.getElementById(
        "register-form"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

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


            const message =
                document.getElementById(
                    "register-message"
                );


            try {

                const response =
                    await fetch(
                        "/api/auth/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name,

                                email,

                                password

                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    message.textContent =
                        data.message;

                    return;
                }


                message.textContent =
                    "Registration successful! Redirecting to login...";


                registerForm.reset();


                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 1500);


            } catch (error) {

                console.error(error);

                message.textContent =
                    "Something went wrong. Please try again.";

            }

        }
    );

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById(
        "login-form"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "login-email"
                ).value.trim();


            const password =
                document.getElementById(
                    "login-password"
                ).value;


            const message =
                document.getElementById(
                    "login-message"
                );


            try {

                const response =
                    await fetch(
                        "/api/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            credentials: "include",

                            body: JSON.stringify({

                                email,

                                password

                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    message.textContent =
                        data.message;

                    return;
                }


                message.textContent =
                    "Login successful!";


                // Store basic user information

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 1000);


            } catch (error) {

                console.error(error);

                message.textContent =
                    "Something went wrong. Please try again.";

            }

        }
    );

}