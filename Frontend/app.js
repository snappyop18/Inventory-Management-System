const API_URL = "http://localhost:5107/api/products"; // Adjust port if your .NET app runs on a different port

// GET: Fetch all products and display them in the table
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        const tbody = document.getElementById('product-list');
        tbody.innerHTML = "";

        products.forEach(product => {
            tbody.innerHTML += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button class="btn btn-edit" onclick="editRedirect('${product.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Redirect with ID parameter for editing
function editRedirect(id) {
    window.location.href = `manage.html?id=${id}`;
}

// GET (Single): Fetch product details to pre-populate the form
async function prepareEditForm(id) {
    document.getElementById('form-title').innerText = "Edit Product";
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if(response.ok) {
            const product = await response.json();
            document.getElementById('product-id').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('category').value = product.category;
            document.getElementById('price').value = product.price;
            document.getElementById('stock').value = product.stock;
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

// Form Validation and submission handling (POST / PUT)
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous validation errors
    document.querySelectorAll('.error-msg').forEach(el => el.innerText = "");

    const id = document.getElementById('product-id').value;
    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);

    let isValid = true;

    // Custom UI Validations
    if (!name) { document.getElementById('name-error').innerText = "Product name is required."; isValid = false; }
    if (!category) { document.getElementById('category-error').innerText = "Category is required."; isValid = false; }
    if (isNaN(price) || price <= 0) { document.getElementById('price-error').innerText = "Price must be greater than 0."; isValid = false; }
    if (isNaN(stock) || stock < 0) { document.getElementById('stock-error').innerText = "Stock cannot be negative."; isValid = false; }

    if (!isValid) return;

    const productData = { name, category, price, stock };
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });

        if (response.ok) {
            window.location.href = "index.html"; // Redirect back to list view
        } else {
            alert("Failed to save record.");
        }
    } catch (error) {
        console.error("Error updating/creating record:", error);
    }
}

// DELETE: Delete a product record
async function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (response.ok) {
                fetchProducts(); // Refresh list
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
}