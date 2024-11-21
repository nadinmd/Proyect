fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
  });

document.getElementById("menu-toggle").addEventListener("click", function () {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
});
