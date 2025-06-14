document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // Cerrar menú hamburguesa al hacer clic fuera
  // ===============================
  document.addEventListener('click', function (event) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const isClickInside = navbarCollapse.contains(event.target);
    const isNavbarToggler = event.target.closest('.navbar-toggler');

    if (navbarCollapse.classList.contains('show') && !isClickInside && !isNavbarToggler) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });

  // ===============================
  // Variables globales
  // ===============================
  let mapa = null;
  const negocioCoords = [8.9496718, -75.4521292]; // Coordenadas del lavadero

  const mostrarMapaBtn = document.getElementById('mostrarMapa');
  const ocultarMapaBtn = document.getElementById('ocultarMapa');
  const seccionMapa = document.getElementById('seccion-mapa');

  const mostrarFormBtn = document.getElementById('mostrarFormulario');
  const ocultarFormBtn = document.getElementById('ocultarFormulario');
  const seccionFormulario = document.getElementById('seccion-formulario');

  const bloqueCompromiso = document.getElementById('bloque-compromiso');

  // ===============================
  // Función para detectar si es tablet
  // ===============================
  function esTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 992;
  }

  // ===============================
  // Botones Mostrar/Ocultar Mapa
  // ===============================
  if (mostrarMapaBtn && seccionMapa) {
    mostrarMapaBtn.addEventListener('click', () => {
      seccionFormulario.style.display = 'none';
      seccionMapa.style.display = 'block';

      if (bloqueCompromiso && esTablet()) bloqueCompromiso.style.display = 'none';

      if (!mapa) initializeMap();
      seccionMapa.scrollIntoView({ behavior: 'smooth' });
    });

    ocultarMapaBtn.addEventListener('click', () => {
      seccionMapa.style.display = 'none';

      if (bloqueCompromiso && seccionFormulario.style.display === 'none' && esTablet()) {
        bloqueCompromiso.style.display = 'block';
      }
    });
  }

  // ===============================
  // Botones Mostrar/Ocultar Formulario
  // ===============================
  if (mostrarFormBtn && seccionFormulario) {
    mostrarFormBtn.addEventListener('click', () => {
      seccionMapa.style.display = 'none';
      seccionFormulario.style.display = 'block';

      if (bloqueCompromiso && esTablet()) bloqueCompromiso.style.display = 'none';

      seccionFormulario.scrollIntoView({ behavior: 'smooth' });
    });

    ocultarFormBtn.addEventListener('click', () => {
      seccionFormulario.style.display = 'none';

      if (bloqueCompromiso && seccionMapa.style.display === 'none' && esTablet()) {
        bloqueCompromiso.style.display = 'block';
      }
    });
  }

  // ===============================
  // Inicializar Mapa con Ruta
  // ===============================
  function initializeMap() {
    mapa = L.map('mapa').setView(negocioCoords, 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa);

    L.marker(negocioCoords).addTo(mapa)
      .bindPopup("<b>Lavadero AL</b><br>Diagonal a Bola 8, Sahagún")
      .openPopup();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.latitude, position.coords.longitude];

          L.marker(userCoords).addTo(mapa)
            .bindPopup("<b>Tu ubicación</b>").openPopup();

          L.Routing.control({
            waypoints: [
              L.latLng(userCoords),
              L.latLng(negocioCoords)
            ],
            lineOptions: {
              styles: [{ color: 'blue', weight: 4 }]
            },
            createMarker: () => null,
            show: false
          }).addTo(mapa);

          mapa.fitBounds([userCoords, negocioCoords], { padding: [50, 50] });
        },
        () => {
          alert("⚠️ No se pudo obtener tu ubicación. Activa los permisos de ubicación en tu navegador.");
        }
      );
    } else {
      alert("⚠️ Tu navegador no soporta geolocalización.");
    }
  }

  // ===============================
  // Validación del Formulario
  // ===============================
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

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // ===============================
  // Botón de llamada - Comportamiento según dispositivo
  // ===============================
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

});

