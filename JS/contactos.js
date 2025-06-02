document.addEventListener("DOMContentLoaded", () => {
  // Variables globales
  let mapa = null;
  
  // Mostrar/Ocultar Mapa
  const mostrarMapaBtn = document.getElementById('mostrarMapa');
  const ocultarMapaBtn = document.getElementById('ocultarMapa');
  const seccionMapa = document.getElementById('seccion-mapa');
  
  if (mostrarMapaBtn && seccionMapa) {
    mostrarMapaBtn.addEventListener('click', () => {
      // Ocultar formulario si está visible
      document.getElementById('seccion-formulario').style.display = 'none';
      
      // Mostrar sección del mapa
      seccionMapa.style.display = 'block';
      
      // Inicializar mapa si no existe
      if (!mapa) {
        initializeMap();
      }
      
      // Desplazarse suavemente a la sección del mapa
      seccionMapa.scrollIntoView({ behavior: 'smooth' });
    });
    
    ocultarMapaBtn.addEventListener('click', () => {
      seccionMapa.style.display = 'none';
    });
  }
  
  // Mostrar/Ocultar Formulario
  const mostrarFormBtn = document.getElementById('mostrarFormulario');
  const ocultarFormBtn = document.getElementById('ocultarFormulario');
  const seccionFormulario = document.getElementById('seccion-formulario');
  
  if (mostrarFormBtn && seccionFormulario) {
    mostrarFormBtn.addEventListener('click', () => {
      // Ocultar mapa si está visible
      seccionMapa.style.display = 'none';
      
      // Mostrar sección del formulario
      seccionFormulario.style.display = 'block';
      
      // Desplazarse suavemente al formulario
      seccionFormulario.scrollIntoView({ behavior: 'smooth' });
    });
    
    ocultarFormBtn.addEventListener('click', () => {
      seccionFormulario.style.display = 'none';
    });
  }
  
  // Función para inicializar el mapa
  function initializeMap() {
    // Coordenadas del negocio
    const negocioCoords = [8.9496718,-75.4521292];
    
    // Crear mapa
    mapa = L.map('mapa').setView(negocioCoords, 18);
    
    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    
    // Marcador del negocio
    L.marker(negocioCoords).addTo(mapa)
      .bindPopup("<b>Lavadero AL</b><br>Diagonal a Bola 8, Sahagún")
      .openPopup();
    
    // Obtener ubicación del usuario si está disponible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.latitude, position.coords.longitude];
          
          // Marcador del usuario
          L.marker(userCoords).addTo(mapa)
            .bindPopup("<b>Tu ubicación</b>")
            .openPopup();
          
          // Ajustar vista para mostrar ambos marcadores
          mapa.fitBounds([negocioCoords, userCoords], { padding: [50, 50] });
        },
        (error) => {
          console.warn("No se pudo obtener la ubicación del usuario:", error.message);
        }
      );
    }
  }
  
  // Botón de llamada - Comportamiento según dispositivo
  const callButtons = document.querySelectorAll('.llamar-btn');
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  callButtons.forEach(button => {
    if (!isMobileDevice) {
      button.href = '#';
      button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Por favor, llama al +57 300 #### ### o +57 310 #### ### desde tu teléfono móvil');
      });
    }
  });

  // Validación del formulario
  const formulario = document.getElementById('formularioContacto');
  if (formulario) {
    formulario.addEventListener('submit', (e) => {
      const email = formulario.querySelector('input[name="email"]').value;
      if (!validarEmail(email)) {
        e.preventDefault();
        alert('Por favor, ingresa un correo electrónico válido.');
      }
    });
  }

  // Función para validar email
  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

  