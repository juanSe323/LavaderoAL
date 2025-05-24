document.addEventListener("DOMContentLoaded", () => {
    // Manejar el botón "Ver" para mostrar el mapa
    const verMapaBtn = document.getElementById("verMapa")
    const mapaContainer = document.getElementById("mapa-container")
  
    verMapaBtn.addEventListener("click", () => {
      if (mapaContainer.style.display === "none") {
        // Mostrar el mapa
        mapaContainer.style.display = "block"
  
        // Cargar el mapa de Google Maps
        const mapa = document.getElementById("mapa")
        mapa.innerHTML = `
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.093724555115!2d-75.44999!3d8.94999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5f2c1c1b3b3b3b%3A0x8e5f2c1c1b3b3b3b!2sSahag%C3%BAn%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy">
          </iframe>
        `
  
        // Cambiar el texto del botón
        verMapaBtn.textContent = "Ocultar"
      } else {
        // Ocultar el mapa
        mapaContainer.style.display = "none"
  
        // Cambiar el texto del botón
        verMapaBtn.textContent = "Ver"
      }
    })
  
    // Manejar el botón "Enviar" para mostrar el formulario
    const mostrarFormularioBtn = document.getElementById("mostrarFormulario")
    const formularioContainer = document.getElementById("formulario-container")
  
    mostrarFormularioBtn.addEventListener("click", () => {
      if (formularioContainer.style.display === "none") {
        // Mostrar el formulario
        formularioContainer.style.display = "block"
  
        // Cambiar el texto del botón
        mostrarFormularioBtn.textContent = "Ocultar formulario"
      } else {
        // Ocultar el formulario
        formularioContainer.style.display = "none"
  
        // Cambiar el texto del botón
        mostrarFormularioBtn.textContent = "Enviar"
      }
    })
  
    // Detectar si es un dispositivo móvil para mostrar u ocultar el botón de llamada
    const llamarBtn = document.querySelector(".llamar-btn")
  
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Si no es un dispositivo móvil, cambiar el comportamiento del botón
      llamarBtn.textContent = "Contactar por teléfono"
      llamarBtn.addEventListener("click", (e) => {
        e.preventDefault()
        alert("Llámanos al +57 300 123 4567 o +57 310 987 6543")
      })
    }
  
    // Manejar el envío del formulario
    const formulario = document.getElementById("formularioContacto")
  
    formulario.addEventListener("submit", (e) => {
      // FormSubmit se encargará del envío, pero podemos agregar validación adicional aquí
      // Por ejemplo, validar el formato del correo electrónico
      const email = formulario.querySelector('input[name="email"]').value
      if (!validarEmail(email)) {
        e.preventDefault()
        alert("Por favor, ingresa un correo electrónico válido.")
      }
    })
  
    // Función para validar email
    function validarEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }
  })
  