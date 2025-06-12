const products = [];
const sales = [];

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);

    if (name && price > 0) {
        products.push({ name, price });
        updateProductTable();
        updateProductDropdown();
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
    } else {
        alert('Ingrese un nombre válido y un precio mayor a 0.');
    }
}

function updateProductTable() {
    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = `<tr><td>${product.name}</td><td>$${product.price.toFixed(2)}</td></tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function updateProductDropdown() {
    const dropdown = document.getElementById('sale-product');
    dropdown.innerHTML = '<option value="">Seleccione un producto</option>';

    products.forEach((product, index) => {
        const option = `<option value="${index}">${product.name} - $${product.price.toFixed(2)}</option>`;
        dropdown.insertAdjacentHTML('beforeend', option);
    });
}

function processSale() {
    const productIndex = document.getElementById('sale-product').value;
    const quantity = parseInt(document.getElementById('sale-quantity').value);

    if (productIndex !== '' && quantity > 0) {
        const product = products[productIndex];
        const total = product.price * quantity;

        sales.push({ name: product.name, quantity, total });
        updateSalesTable();
        document.getElementById('sale-product').value = '';
        document.getElementById('sale-quantity').value = '';
    } else {
        alert('Seleccione un producto y una cantidad válida.');
    }
}

function updateSalesTable() {
    const tableBody = document.querySelector('#sales-table tbody');
    tableBody.innerHTML = '';

    sales.forEach(sale => {
        const row = `<tr><td>${sale.name}</td><td>${sale.quantity}</td><td>$${sale.total.toFixed(2)}</td></tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}
