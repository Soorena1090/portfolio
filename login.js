document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button-log").addEventListener("click", async function (event) {
        event.preventDefault();
  
        const email = document.getElementById("email-input").value;
        const password = document.getElementById("input-pass").value;
        try {
            const response = await fetch("https://nextjs-boilerplate-five-psi-45.vercel.app/api/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();
            console.log(data);
  
            if (response.ok) {
                sessionStorage.setItem("authToken", data.token);
                setTimeout(() => {
                    window.location.href = "products.html";
                }, 1000);
                alert(data.message);
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    });
    const signUp = document.getElementById("button-signup");

        signUp.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "sign-up.html";
    });
  });
