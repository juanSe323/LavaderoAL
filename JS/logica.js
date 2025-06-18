
// Servicios definidos por tipo de vehículo para la calculadora
const serviciosPorVehiculo = {
  carro: [
    { nombre: "Enjuague Rápido", precio: 15000 },
    { nombre: "Lavado Normal", precio: 25000 },
    { nombre: "Lavado Full y Brillado", precio: 40000 },
  ],
  moto: [
    { nombre: "Enjuague Básico", precio: 5000 },
    { nombre: "Lavado Normal", precio: 6000 },
    { nombre: "Brillado y Detallado", precio: 7000 },
  ],
  camion: [
    { nombre: "Enjuague Exterior", precio: 40000 },
    { nombre: "Lavado Completo", precio: 50000 },
    { nombre: "Lavado Especial", precio: 60000 },
  ],
}

// FUNCIÓN ORIGINAL PARA MOSTRAR TARJETAS DE SERVICIOS
function mostrarServicios(tipo) {
  const contenedor = document.getElementById("tarjetas-servicio")

  // Importante: aseguramos que el contenedor sea una row
  contenedor.innerHTML = '<div class="row" id="fila-tarjetas"></div>'

  let servicios = []

  if (tipo === "carro") {
    servicios = [
      {
        titulo: "Enjuague Rápido",
        descripcion: "Lavado exterior ligero y secado rápido.",
        precio: "$15000",
        imagen: "../img/carrolavadob.jpeg",
      },
      {
        titulo: "Lavado Normal",
        descripcion: "Exterior completo, llantas, vidrios y aspirado básico.",
        precio: "$25000",
        imagen: "../img/carrolavado.jpg",
      },
      {
        titulo: "Lavado Full y Brillado",
        descripcion: "Exterior completo, encerado, motor superficial y aspirado profundo.",
        precio: "$40000",
        imagen: "../img/interiorauto.jpg",
      },
    ]
  } else if (tipo === "moto") {
    servicios = [
      {
        titulo: "Enjuague Básico",
        descripcion: "Lavado exterior rápido y llantas.",
        precio: "$5000",
        imagen: "../img/enjuagar.webp",
      },
      {
        titulo: "Lavado Normal",
        descripcion: "Exterior completo + limpieza de cadena.",
        precio: "$6000",
        imagen: "../img/lavado normal.webp",
      },
      {
        titulo: "Brillado y Detallado",
        descripcion: "Pulido de partes metálicas y limpieza profunda.",
        precio: "$7000",
        imagen: "../img/brillado.jpg",
      },
    ]
  } else if (tipo === "camion") {
    servicios = [
      {
        titulo: "Enjuague Exterior",
        descripcion: "Lavado de cabina y trailer exterior.",
        precio: "$40000",
        imagen: "../img/interiorcamion.jpeg",
      },
      {
        titulo: "Lavado Completo",
        descripcion: "Exterior completo y limpieza interior de cabina.",
        precio: "$50000",
        imagen: "../img/lavadocamion.jpg",
      },
      {
        titulo: "Lavado Especial",
        descripcion: "Chasis, motor, ejes y desinfección completa.",
        precio: "$60000",
        imagen: "../img/lavado-chasis.jpg",
      },
    ]
  }

  const fila = document.getElementById("fila-tarjetas")

  servicios.forEach((servicio) => {
    fila.innerHTML += `
    <div class="col-md-4 mb-4 d-flex justify-content-center">
      <div class="card h-100 bg-dark" style="width: 18rem; ">
        <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-warning fw-bold">${servicio.titulo}</h5>
          <p class="card-text text-light">${servicio.descripcion}</p>
          <p class="card-text text-light"><strong>Precio: ${servicio.precio}</strong></p>
          <button onclick="abrirModalConServicio('${servicio.titulo}', '${tipo}')" class="btn btn-warning mt-auto">Seleccionar</button>
        </div>
      </div>
    </div>
  `
  })
}

// Función para abrir el modal con el servicio seleccionado
function abrirModalConServicio(servicioTitulo, tipoVehiculo) {
  const servicioCompleto = `${servicioTitulo} - ${tipoVehiculo}`

  document.getElementById("servicioSeleccionado").textContent = servicioCompleto
  document.getElementById("campoServicioSeleccionado").value = servicioCompleto

  // Resetear campos del formulario
  document.getElementById("nombreUsuario").value = ""
  document.getElementById("fechaDeseada").value = ""
  document.getElementById("detallesExtra").value = ""

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById("modalServicio"))
  modal.show()
}

// Muestra la calculadora cuando se hace clic en "Más opciones"
function mostrarCalculadora() {
  const calculadora = document.getElementById("calculadora-servicio")
  calculadora.style.display = "block"

  // Inicializar la calculadora con el vehículo seleccionado actualmente
  const tipoVehiculoSelect = document.getElementById("tipoVehiculo")
  cargarOpcionesLavado(tipoVehiculoSelect.value)
}

// Función para cargar los tipos de lavado según el tipo de vehículo
function cargarOpcionesLavado(tipoVehiculo) {
  const tipoLavado = document.getElementById("tipoLavado")

  // Usar la estructura de datos existente en lugar de redefinir las opciones
  const opciones = serviciosPorVehiculo[tipoVehiculo] || []

  // Limpiar las opciones existentes
  tipoLavado.innerHTML = ""

  // Agregar nuevas opciones
  opciones.forEach((opcion) => {
    const optionElement = document.createElement("option")
    optionElement.value = opcion.precio
    optionElement.textContent = `${opcion.nombre} - $${opcion.precio}`
    tipoLavado.appendChild(optionElement)
  })

  // Habilitar el select de tipo de lavado si hay opciones
  tipoLavado.disabled = opciones.length === 0

  // Actualizar el precio después de cargar las opciones
  if (opciones.length > 0) {
    actualizarPrecio()
  }
}

// Función para actualizar el precio total
function actualizarPrecio() {
  const tipoLavado = document.getElementById("tipoLavado")
  const cantidad = document.getElementById("cantidad").value
  const precioTotal = document.getElementById("precio-total")

  const precioSeleccionado = Number.parseFloat(tipoLavado.value)
  if (!isNaN(precioSeleccionado) && cantidad > 0) {
    const total = precioSeleccionado * cantidad
    precioTotal.textContent = `$${total.toLocaleString()}`
  } else {
    precioTotal.textContent = "Seleccione un lavado y cantidad para calcular"
  }
}



// Inicializar los eventos cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar servicios de carro por defecto
  mostrarServicios("carro")

  // Asignar evento para cambio de tipo de vehículo en la calculadora
  document.getElementById("tipoVehiculo").addEventListener("change", function () {
    cargarOpcionesLavado(this.value)
  })

  // Asignar evento para cambio de tipo de lavado
  document.getElementById("tipoLavado").addEventListener("change", actualizarPrecio)

  // Asignar evento para cambio de cantidad
  document.getElementById("cantidad").addEventListener("input", actualizarPrecio)
})
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

  // Mostrar/ocultar botón de ir arriba
const btnArriba = document.getElementById('btnArriba');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnArriba.style.display = 'block';
  } else {
    btnArriba.style.display = 'none';
  }
});

// Funcionalidad del botón de ir arriba
btnArriba.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
