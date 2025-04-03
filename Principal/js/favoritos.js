// Array para almacenar los productos favoritos
let productosFavoritos = [];

// Función para agregar o quitar productos de favoritos
function toggleFavorito(productoId) {
    const corazon = document.getElementById(productoId);
    
    if (corazon.classList.contains('fas')) {
        // Si ya está en favoritos, lo eliminamos
        corazon.classList.remove('fas');
        corazon.classList.add('far');
        productosFavoritos = productosFavoritos.filter(id => id !== productoId);
        alert('Producto eliminado de favoritos');
    } else {
        // Si no está en favoritos, lo agregamos
        corazon.classList.remove('far');
        corazon.classList.add('fas');
        productosFavoritos.push(productoId);
        alert('Producto agregado a favoritos');
    }

    // Actualizamos la sección de tendencias con los productos favoritos
    actualizarTendencias();
}

// Función para actualizar la sección de Tendencias con los productos favoritos
function actualizarTendencias() {
    const productosContenedor = document.getElementById('productos-favoritos');
    productosContenedor.innerHTML = ''; // Limpiar la lista actual

    // Recorrer los productos favoritos y agregarlos al contenedor
    productosFavoritos.forEach(productoId => {
        const nuevoProducto = document.createElement('div');
        nuevoProducto.classList.add('producto-item');
        
        // Aquí debes agregar la lógica para obtener el nombre, la imagen y el precio del producto
        // Por ejemplo:
        nuevoProducto.innerHTML = `
            <img src="./images/${productoId}.jpg" alt="Producto favorito">
            <p>Producto ${productoId}</p>
            <span>$100.000</span>
            <button class="favoritos" onclick="toggleFavorito('${productoId}')">
                <i class="fas fa-heart" id="${productoId}"></i>
            </button>
        `;

        productosContenedor.appendChild(nuevoProducto);
    });
}

