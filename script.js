const products = JSON.parse(localStorage.getItem('products')) || [];
const sales = JSON.parse(localStorage.getItem('sales')) || [];

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value) || 0;

    if (name && price > 0) {
        products.push({ name, price, stock });
        saveToLocalStorage();
        updateProductTable();
        updateProductDropdown();
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-stock').value = '';
    } else {
        alert('Ingrese un nombre válido y un precio mayor a 0.');
    }
}

function deleteProduct(index) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        products.splice(index, 1);
        saveToLocalStorage();
        updateProductTable();
        updateProductDropdown();
    }
}

function editProduct(index) {
    const product = products[index];
    const newName = prompt('Nuevo nombre:', product.name);
    const newPrice = prompt('Nuevo precio:', product.price);
    const newStock = prompt('Nuevo stock:', product.stock);

    if (newName && newPrice > 0) {
        products[index] = {
            name: newName,
            price: parseFloat(newPrice),
            stock: parseInt(newStock) || 0
        };
        saveToLocalStorage();
        updateProductTable();
        updateProductDropdown();
    }
}

function updateProductTable() {
    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="editProduct(${index})" class="btn-edit">Editar</button>
                    <button onclick="deleteProduct(${index})" class="btn-delete">Eliminar</button>
                </td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function updateProductDropdown() {
    const dropdown = document.getElementById('sale-product');
    dropdown.innerHTML = '<option value="">Seleccione un producto</option>';

    products.forEach((product, index) => {
        if (product.stock > 0) {
            const option = `<option value="${index}">${product.name} - $${product.price.toFixed(2)} (Stock: ${product.stock})</option>`;
            dropdown.insertAdjacentHTML('beforeend', option);
        }
    });
}

function processSale() {
    const productIndex = document.getElementById('sale-product').value;
    const quantity = parseInt(document.getElementById('sale-quantity').value);

    if (productIndex !== '' && quantity > 0) {
        const product = products[productIndex];
        
        if (quantity > product.stock) {
            alert('No hay suficiente stock disponible.');
            return;
        }

        const total = product.price * quantity;
        product.stock -= quantity;

        sales.push({ 
            name: product.name, 
            quantity, 
            total,
            date: new Date().toLocaleString()
        });

        saveToLocalStorage();
        updateSalesTable();
        updateProductTable();
        updateProductDropdown();
        
        document.getElementById('sale-product').value = '';
        document.getElementById('sale-quantity').value = '';
    } else {
        alert('Seleccione un producto y una cantidad válida.');
    }
}

function updateSalesTable() {
    const tableBody = document.querySelector('#sales-table tbody');
    tableBody.innerHTML = '';
    let totalSales = 0;

    sales.forEach(sale => {
        totalSales += sale.total;
        const row = `
            <tr>
                <td>${sale.name}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.total.toFixed(2)}</td>
                <td>${sale.date}</td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    document.getElementById('total-sales').textContent = `$${totalSales.toFixed(2)}`;
}

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('sales', JSON.stringify(sales));
}

document.addEventListener('DOMContentLoaded', () => {
    updateProductTable();
    updateProductDropdown();
    updateSalesTable();
});
