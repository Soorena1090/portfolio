document.addEventListener("DOMContentLoaded", async function () {
    const token = sessionStorage.getItem("authToken");
    const productList = document.getElementById("product-list");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("https://nextjs-boilerplate-five-psi-45.vercel.app/api/products", {
            method: "GET",
            headers: { "Authorization": `${token}` },
        });

        if (response.ok) {
            const data = await response.json();
            data.products.forEach(product => {
                const li = document.createElement("li");
                // li.textContent = `${product.name} - $${product.price}`;
                li.classList.add("product-item");

                li.innerHTML = `
                      <img src="${product.image}" alt="${product.name}" class="product-image">
                      <h3 class="product-name">${product.name}</h3>
                      <p class="product-category">${product.product_category.name}</p>
                      <p class="product-price">$${product.price}</p>
                      <p class="product-description">${product.description}</p>
                      <p class="manufacturer">Manufacturer: ${product.manufacturer}</p>
                      <a href="#" class="buy-button">Buy Now</a>
                `;
                productList.appendChild(li);

            });
        } else {
            alert("Failed to load products.");
            localStorage.removeItem("authToken");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
        window.location.href = "login.html"
    }

});


