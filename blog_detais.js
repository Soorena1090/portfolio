document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    const blogContentDiv = document.getElementById("blog-content");

    if (blogId) {
        fetch(`https://nextjs-boilerplate-five-psi-45.vercel.app/api/blogs/${blogId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    blogContentDiv.innerHTML = `
                        <h1>${data.blog.title}</h1>
                        <img src="${data.blog.featured_image}" alt="${data.blog.title}" style="max-width:100%;height:auto;">
                        <p><strong>Subtitle:</strong> ${data.blog.subtitle}</p>
                        <p>${data.blog.main_content}</p>
                        <p><strong>Category:</strong> ${data.blog.category}</p>
                        <p><em>Created at:</em> ${new Date(data.blog.created_at).toLocaleString()}</p>
                    `;
                } else {
                    blogContentDiv.innerHTML = `<p>Blog not found.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching blog:", error);
                blogContentDiv.innerHTML = '<p style="color:red;">Loading Failed.</p>';
            });
    } else {
        blogContentDiv.innerHTML = `<p>Invalid blog ID.</p>`;
    }
});
// document.addEventListener("DOMContentLoaded", async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const blogId = urlParams.get("id");
//     const blogContentDiv = document.getElementById("blog-content");
//     console.log(blogId)
//     if (blogId) {
//         try {
//             const response = await fetch(`https://nextjs-boilerplate-five-psi-45.vercel.app/api/blogs?id=${blogId}`);
//             const data = await response.json();

//             console.log("API Response:", data); // ✅ بررسی مقدار دریافتی از API

//             if (!data || Object.keys(data).length === 0) {
//                 throw new Error("Blog data not found");
//             }

//             // بررسی ساختار داده دریافتی
//             const blog = data.blog || data; // ممکن است داده داخل `data.blog` باشد

//             if (!blog || typeof blog !== "object") {
//                 throw new Error("Invalid blog data");
//             }

//             blogContentDiv.innerHTML = `
//                 <h1>${blog.title || "No title available"}</h1>
//                 <img src="${blog.featured_image || ""}" alt="${blog.title || "Image"}" style="max-width:100%;height:auto;">
//                 <p><strong>Subtitle:</strong> ${blog.subtitle || "No subtitle available"}</p>
//                 <p>${blog.main_content || "No content available"}</p>
//                 <p><strong>Category:</strong> ${blog.category || "No category"}</p>
//                 <p><em>Created at:</em> ${blog.created_at ? new Date(blog.created_at).toLocaleString() : "Unknown"}</p>
//             `;
//         } catch (error) {
//             console.error("Error fetching blog:", error);
//             blogContentDiv.innerHTML = `<p style="color:red;">Failed to load blog details.</p>`;
//         }
//     } else {
//         blogContentDiv.innerHTML = `<p>Invalid blog ID.</p>`;
//     }
// });
