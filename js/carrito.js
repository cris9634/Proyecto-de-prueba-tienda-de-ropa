let productoEnCarrito = localStorage.getItem("productos-en-carrito");
productoEnCarrito = JSON.parse(productoEnCarrito) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")

function cargarProductosCarrito() {
    if (productoEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productoEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        });
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminardelcarrito);
    });
}

function eliminardelcarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productoEnCarrito.findIndex(producto => producto.id === idBoton);

    if (index !== -1) {
        productoEnCarrito.splice(index, 1);
        localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
        cargarProductosCarrito();
    }
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    productoEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
    cargarProductosCarrito();

}


function actualizarTotal() {
    const totalCalculado=  productoEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}



botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productoEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

