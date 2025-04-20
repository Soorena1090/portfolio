document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("button-signup").addEventListener("click", async function (event) {
      event.preventDefault();

      const email = document.getElementById("input-email").value;
      const password = document.getElementById("input-pass").value;
      const confirmPassword = document.getElementById("confirm_pass").value;

      if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
      }
      try {
          const response = await fetch("https://nextjs-boilerplate-five-psi-45.vercel.app/api/sign-up", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  email: email,
                  password: password,
                  confirm_password: confirmPassword,
              }),
          });

          const data = await response.json();
          console.log(data);

          if (response.ok) {
              const sucssesApi = document.createElement("h3");
              sucssesApi.className = "sucssesApi";
              sucssesApi.innerHTML = data.message;
              sessionStorage.setItem("authToken", data.token);
              window.location.href="products.html"

          } else {
              alert("Error: " + data.message);
          }
      } catch (error) {
          console.error("Error:", error);
          alert("Something went wrong!");
      }
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const signUp = document.getElementsByClassName("button-log")[0];

    signUp.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "login.html";
    });
});
