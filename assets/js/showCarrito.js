document.getElementById("carrito-icono").addEventListener("click", () => {
  document.getElementById("modal-carrito").style.display = "flex";
});

document.getElementById("cerrar-carrito").addEventListener("click", () => {
  document.getElementById("modal-carrito").style.display = "none";
});

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

      document.getElementById("productos-carrito").innerHTML =
        "<p>No hay productos en el carrito.</p>";
      document.getElementById("total-carrito").textContent = "Total: $0.00";

      document.getElementById("modal-carrito").style.display = "none";

      const paypalLink = "https://www.paypal.me/tuUsuarioPayPal";
      const mensaje =
        "Por favor ingresa el nombre de la persona a quien le enviarás el dinero.";

      Swal.fire({
        title: mensaje,
        text: "Serás redirigido a PayPal para completar la compra.",
        confirmButtonText: "Ir a PayPal",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(paypalLink, "_blank");
        }
      });
    });
  }
});

function redirigirAPayPal() {
  const paypalLink = "https://www.paypal.me/User";

  Swal.fire({
    title: "¿Estás listo para pagar?",
    text: "Serás redirigido a PayPal para completar la compra.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ir a PayPal",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(paypalLink, "_blank");
    }
  });
}

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
      vaciarCarrito();
      document.getElementById("modal-carrito").style.display = "none";

      redirigirAPayPal();
    });
  }
});
