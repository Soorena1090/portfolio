
document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1;
    const limit = 6; 
    const maxButtons = 3; 

    async function sendReq(page) {
        const url = `https://nextjs-boilerplate-five-psi-45.vercel.app/api/blogs?page=${page}&limit=${limit}`;
        const loadingElement = document.getElementById('loading');
        const blogSection = document.getElementById('blog-section');

        loadingElement.style.display = 'flex';
        blogSection.innerHTML = ''; 

        try {
            const response = await fetch(url);
            if (response.ok) {
                const apiResult = await response.json();
                console.log("API Response:", apiResult); 
                if (!apiResult.blogs || apiResult.blogs.length === 0) {
                    console.log("No blogs found!");
                    return;
                }

                displayBlogs(apiResult.blogs);
                
                const totalPages = apiResult.totalPages || Math.ceil(apiResult.total / limit);
                console.log("Total Pages:", totalPages);

                updatePagination(totalPages); 
            } else {
                console.log("API error");
            }
        } catch (error) {
            console.log("Fetch Error:", error);
        } finally {
            loadingElement.style.display = 'none';
        }
    }

    function displayBlogs(blogs) {
        const blogSection = document.getElementById('blog-section');
        blogs.forEach(blog => {
            const blogPreview = document.createElement('div');
            blogPreview.className = 'blog-preview';
            blogPreview.innerHTML = `
                <img src="${blog.featured_image}" alt="${blog.title}">
                <h2>${blog.title}</h2>
                <p>${blog.subtitle}</p>
                <p>${blog.summary}</p>
            `;
            blogPreview.addEventListener('click', () => {
                window.location.href = `blog_details.html?id=${blog.id}`;
            });
            blogSection.appendChild(blogPreview);
        });
    }

    function updatePagination(totalPages) {
        const paginationContainer = document.getElementById('pagination');
        
        if (!paginationContainer) {
            console.error("Pagination container not found!");
            return;
        }

        paginationContainer.innerHTML = '';

        let startPage = Math.max(1, currentPage - 1); 
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerText = '«';
            prevButton.onclick = () => {
                if (currentPage > 1) {
                    currentPage--;
                    sendReq(currentPage);
                }
            };
            paginationContainer.appendChild(prevButton);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.className = i === currentPage ? 'active' : '';
            pageButton.onclick = () => {
                currentPage = i;
                sendReq(currentPage);
            };
            paginationContainer.appendChild(pageButton);
        }

        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.innerText = '»';
            nextButton.onclick = () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    sendReq(currentPage);
                }
            };
            paginationContainer.appendChild(nextButton);
        }
    }

    sendReq(currentPage);
});

