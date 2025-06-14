document.addEventListener("DOMContentLoaded", () => {
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
    // Inicializar los sliders de antes/después
    const sliders = document.querySelectorAll(".slider-handle")
  
    sliders.forEach((slider) => {
      const container = slider.closest(".img-container")
      const imgDespues = container.querySelector(".img-despues")
  
      // Función para actualizar la posición del slider
      function updateSliderPosition(x) {
        const containerWidth = container.offsetWidth
        let position = (x / containerWidth) * 100
  
        // Limitar la posición entre 10% y 90%
        position = Math.max(10, Math.min(90, position))
  
        // Actualizar la posición del slider
        slider.style.left = `${position}%`
  
        // Actualizar el clip-path de la imagen "después"
        imgDespues.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`
      }
  
      // Evento para mover el slider con el mouse
      let isDragging = false
  
      slider.addEventListener("mousedown", () => {
        isDragging = true
      })
  
      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return
  
        const rect = container.getBoundingClientRect()
        const x = e.clientX - rect.left
  
        updateSliderPosition(x)
      })
  
      document.addEventListener("mouseup", () => {
        isDragging = false
      })
  
      // Eventos para dispositivos táctiles
      slider.addEventListener("touchstart", (e) => {
        isDragging = true
        e.preventDefault()
      })
  
      document.addEventListener("touchmove", (e) => {
        if (!isDragging) return
  
        const touch = e.touches[0]
        const rect = container.getBoundingClientRect()
        const x = touch.clientX - rect.left
  
        updateSliderPosition(x)
      })
  
      document.addEventListener("touchend", () => {
        isDragging = false
      })
  
      // Inicializar la posición del slider al 50%
      updateSliderPosition(container.offsetWidth / 2)
    })
  
    // Filtrado de elementos de la galería
    const btnFiltros = document.querySelectorAll(".btn-filtro")
    const elementosGaleria = document.querySelectorAll(".elemento-galeria")
  
    btnFiltros.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Quitar la clase active de todos los botones
        btnFiltros.forEach((b) => b.classList.remove("active"))
  
        // Añadir la clase active al botón clickeado
        btn.classList.add("active")
  
        // Obtener el filtro seleccionado
        const filtro = btn.getAttribute("data-filter")
  
        // Mostrar u ocultar elementos según el filtro
        elementosGaleria.forEach((elemento) => {
          if (filtro === "todos") {
            elemento.style.display = "block"
          } else {
            if (elemento.getAttribute("data-categoria") === filtro) {
              elemento.style.display = "block"
            } else {
              elemento.style.display = "none"
            }
          }
        })
      })
    })
  })
  