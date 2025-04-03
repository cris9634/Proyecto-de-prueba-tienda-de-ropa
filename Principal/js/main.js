//PRODUCTOS
const productos = [
    // Chaquetas
    {
        id: "chaqueta-01",
        titulo: "Chaqueta 01",
        imagen: "./img/Chaquetas/CH01.jpeg",
        categoria: {
            nombre: "big",
            id: "chaqueta"
        },
        precio: 100000
    },
    {
        id: "chaqueta-02",
        titulo: "Chaqueta 02",
        imagen: "./img/Chaquetas/CH02.jpeg",
        categoria: {
            nombre: "chaquetas",
            id: "chaquetas"
        },
        precio: 100000
    },

    //Pantalones
    {
        id: "pantalonH-01",
        titulo: "pantalonH 01",
        imagen: "./img/Caballero/P01.jpeg",
        categoria: {
            nombre: "caballero",
            id: "caballero"
        },
        precio: 100000
    },
    {
        id: "pantalonH-02",
        titulo: "pantalonH 02",
        imagen: "./img/Caballero/P02.jpeg",
        categoria: {
            nombre: "caballero",
            id: "caballero"
        },
        precio: 100000
    },

    //Gorras
    {
        id: "gorras-01",
        titulo: "gorras 01",
        imagen: "./img/Gorras/G01.jpeg",
        categoria: {
            nombre: "gorras",
            id: "gorras"
        },
        precio: 100000
    },
    {
        id: "gorras-02",
        titulo: "gorras 02",
        imagen: "./img/Gorras/G02.jpeg",
        categoria: {
            nombre: "gorras",
            id: "gorras"
        },
        precio: 100000
    },
    
];
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productoEnCarrito;

let productoEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productoEnCarritoLS) {
    productoEnCarrito = JSON.parse(productoEnCarritoLS);
    actualizarNumerito();
} else {
    productoEnCarrito = [];
}



function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productoEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productoEnCarrito.findIndex(producto => producto.id === idBoton);
        productoEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productoEnCarrito.push(productoAgregado);
    }   

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}