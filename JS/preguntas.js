emailjs.init("_0gz9ldVqTOWe49Rn"); 



function limpiarBackdrop() {
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(b => b.parentNode.removeChild(b));
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';  // Quitar overflow oculto si quedó
}

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('click', function (event) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const isClickInside = navbarCollapse.contains(event.target);
    const isNavbarToggler = event.target.closest('.navbar-toggler');

    // Si el menú está abierto, el clic NO es en el menú ni en el toggler → cerrarlo
    if (navbarCollapse.classList.contains('show') && !isClickInside && !isNavbarToggler) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });
  const formPregunta = document.getElementById("formPregunta");
  const modalPreguntaElement = document.getElementById("modalPregunta");
  const modalConfirmacionElement = document.getElementById("modalConfirmacionPregunta");

  const modalPregunta = new bootstrap.Modal(modalPreguntaElement);
  const modalConfirmacion = new bootstrap.Modal(modalConfirmacionElement);

  formPregunta.addEventListener("submit", function(e) {
    e.preventDefault();

    const btn = formPregunta.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.textContent = "Enviando...";

    // Capturar valores del formulario
    const nombre = document.getElementById("nombrePregunta").value;
    const email = document.getElementById("emailPregunta").value;
    const mensaje = document.getElementById("mensajePregunta").value;

    emailjs.send("service_3d6nycz", "template_2m8gfa4", {
      nombre: nombre,
      email: email,
      mensaje: mensaje
    })
    .then(() => {
      formPregunta.reset();

      // Escuchar cierre del modal para abrir confirmación
      modalPreguntaElement.addEventListener('hidden.bs.modal', function handler() {
        modalConfirmacion.show();
           limpiarBackdrop();  
        modalPreguntaElement.removeEventListener('hidden.bs.modal', handler);
      });

      modalPregunta.hide();

    })
    .catch(() => {
      alert("Hubo un error al enviar tu pregunta. Intenta de nuevo más tarde.");
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = "Enviar";
    });
  });
   modalConfirmacionElement.addEventListener('hidden.bs.modal', limpiarBackdrop);
});

