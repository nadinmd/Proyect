let carrito = [];
let carritoCount = 0;

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
    numeroCarrito.textContent = carrito.length; 
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

document
  .getElementById("vaciar-carrito")
  .addEventListener("click", vaciarCarrito);
document
  .getElementById("realizar-compra")
  .addEventListener("click", realizarCompra);


  document.getElementById("realizar-compra").addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "No puedes realizar una compra sin productos en el carrito.",
      confirmButtonText: "Ok",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "¡Compra realizada!",
      text: "Tu compra se ha completado exitosamente.",
      confirmButtonText: "Cerrar",
    }).then(() => {
     
      carrito = [];
      carritoCount = 0;

      renderCarrito();
      actualizarContadorCarrito();


      document.getElementById("modal-carrito").style.display = "none";
    });
  }
});


document.getElementById("realizar-compra").addEventListener("click", () => {
  
  document.getElementById("productos-carrito").innerHTML =
    "<p>No hay productos en el carrito.</p>";
  document.getElementById("total-carrito").textContent = "Total: $0.00";

  document.getElementById("modal-carrito").style.display = "none";
});
