
const carritoIcono = document.getElementById("carrito-icono");
const carritoFlotante = document.getElementById("carrito-flotante");

carritoIcono.addEventListener("click", () => {

  carritoFlotante.style.display =
    carritoFlotante.style.display === "none" ||
    carritoFlotante.style.display === ""
      ? "block"
      : "none";
  actualizarCarrito(); 
});


document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = []; 
  carritoCount = 0; 
  actualizarCarrito(); 
  actualizarContadorCarrito(); 
  carritoFlotante.style.display = "none"; 
});
