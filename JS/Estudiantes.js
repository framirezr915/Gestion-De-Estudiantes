const dropdownBtns = document.querySelectorAll(".dropdown-btn");

dropdownBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const container = this.nextElementSibling;
    container.classList.toggle("active");
  });
});