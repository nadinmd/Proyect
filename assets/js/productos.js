
let carritoCount = 0;

const productos = [
  {
    id: 1,
    nombre: "Base Líquida",
    precio: 10.99,
    imagen: "base-liquida.jpg",
    categoria: "Bases",
  },
  {
    id: 2,
    nombre: "Labial Mate",
    precio: 5.99,
    imagen: "labial-mate.jpg",
    categoria: "Labiales",
  },
  {
    id: 3,
    nombre: "Sombra en Polvo",
    precio: 7.99,
    imagen: "sombra-polvo.jpg",
    categoria: "Sombras",
  },
  {
    id: 4,
    nombre: "Base en Polvo",
    precio: 12.99,
    imagen: "base-polvo.jpg",
    categoria: "Bases",
  },
  {
    id: 5,
    nombre: "Labial Brillante",
    precio: 6.99,
    imagen: "labial-brillante.jpg",
    categoria: "Labiales",
  },
  {
    id: 6,
    nombre: "Sombra Glitter",
    precio: 8.99,
    imagen: "sombra-glitter.jpg",
    categoria: "Sombras",
  },
];

let carrito = [];

function mostrarProductos(categoria = null, busqueda = "") {
  const contenedorProductos = document.getElementById("productos-lista");
  contenedorProductos.innerHTML = ""; 

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = categoria
      ? producto.categoria === categoria
      : true;
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  productosFiltrados.forEach((producto) => {
    const productoElemento = document.createElement("div");
    productoElemento.classList.add("producto");

    productoElemento.innerHTML = `
          <img src="../assets/img/${producto.imagen}" alt="${producto.nombre}" />
          <h4>${producto.nombre}</h4>
          <p class="precio">$${producto.precio}</p>
          <p class="descripcion">¡Una excelente opción para tu maquillaje diario!</p>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;

    contenedorProductos.appendChild(productoElemento);
  });
}


mostrarProductos();


document
  .getElementById("categoria-bases")
  .addEventListener("click", (event) => {
    event.preventDefault(); 
    const busqueda = document.getElementById("buscador").value;
    mostrarProductos("Bases", busqueda);
  });

document
  .getElementById("categoria-labiales")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const busqueda = document.getElementById("buscador").value;
    mostrarProductos("Labiales", busqueda);
  });

document
  .getElementById("categoria-sombras")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const busqueda = document.getElementById("buscador").value;
    mostrarProductos("Sombras", busqueda);
  });


document.getElementById("buscador").addEventListener("input", (event) => {
  const busqueda = event.target.value;
  mostrarProductos(null, busqueda);
});


function agregarAlCarrito(idProducto) {
  const producto = productos.find((producto) => producto.id === idProducto);
  if (producto) {
    carrito.push(producto); 
    carritoCount++; 
    actualizarCarrito(); 
    actualizarContadorCarrito(); 
    showAlert(); 
  }
}


function actualizarCarrito() {
  const carritoContenedor = document.getElementById("productos-carrito");
  carritoContenedor.innerHTML = ""; 

  if (carrito.length === 0) {
    carritoContenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
  } else {
    carrito.forEach((producto) => {
      const productoElemento = document.createElement("div");
      productoElemento.classList.add("producto-carrito");
      productoElemento.innerHTML = `
          <img src="../assets/img/${producto.imagen}" alt="${producto.nombre}" />
          <p>${producto.nombre} - $${producto.precio}</p>
        `;
      carritoContenedor.appendChild(productoElemento);
    });
  }
}

function actualizarContadorCarrito() {
  const numeroCarrito = document.getElementById("numero-carrito");
  numeroCarrito.textContent = carritoCount; 
}


function showAlert() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Producto agregado al carrito!",
    showConfirmButton: false,
    timer: 2000,
    toast: true,
    background: "#4CAF50",
    color: "#fff",
    timerProgressBar: true,
  });
}
