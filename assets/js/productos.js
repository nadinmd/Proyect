let carrito = [];
let carritoCount = 0;

let productos = [
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
    imagen: "base-polvo.png",
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

  if (productosFiltrados.length === 0) {
    contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
  } else {
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
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find((producto) => producto.id === idProducto);
  if (producto) {
    carrito.push(producto);
    carritoCount++;
    actualizarCarrito();
    actualizarContadorCarrito();
    actualizarTotal();
    showAlert("Producto agregado al carrito!");
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

function actualizarTotal() {
  const totalCarrito = document.getElementById("total-carrito");
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

function vaciarCarrito() {
  carrito = [];
  carritoCount = 0;
  actualizarCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
  showAlert("Carrito vaciado!");
}

function realizarCompra() {
  carrito = [];
  carritoCount = 0;
  actualizarCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "¡Compra realizada con éxito!",
    showConfirmButton: false,
    timer: 2000,
    toast: true,
    background: "#4CAF50",
    color: "#fff",
    timerProgressBar: true,
  });
}

function showAlert(message) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 2000,
    toast: true,
    background: "#4CAF50",
    color: "#fff",
    timerProgressBar: true,
  });
}

document.getElementById("categoria-bases").addEventListener("click", () => {
  const textoBusqueda = document.getElementById("buscador").value;
  mostrarProductos("Bases", textoBusqueda);
});

document.getElementById("categoria-labiales").addEventListener("click", () => {
  const textoBusqueda = document.getElementById("buscador").value;
  mostrarProductos("Labiales", textoBusqueda);
});

document.getElementById("categoria-sombras").addEventListener("click", () => {
  const textoBusqueda = document.getElementById("buscador").value;
  mostrarProductos("Sombras", textoBusqueda);
});

document.getElementById("buscador").addEventListener("input", (event) => {
  const textoBusqueda = event.target.value;
  const categoriaSeleccionada = document.querySelector(
    ".categoria-seleccionada"
  );
  const categoria = categoriaSeleccionada
    ? categoriaSeleccionada.textContent
    : null;
  mostrarProductos(categoria, textoBusqueda);
});

mostrarProductos();
