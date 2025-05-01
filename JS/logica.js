function mostrarServicios(tipo) {
    const contenedor = document.getElementById('tarjetas-servicio');
    
    // Importante: aseguramos que el contenedor sea una row
    contenedor.innerHTML = '<div class="row" id="fila-tarjetas"></div>';
  
    let servicios = [];
  
    if (tipo === 'carro') {
      servicios = [
        { titulo: 'Enjuague Rápido', descripcion: 'Lavado exterior ligero y secado rápido.', precio: '$15000', imagen: '../img/carrolavadob.jpeg' },
        { titulo: 'Lavado Normal', descripcion: 'Exterior completo, llantas, vidrios y aspirado básico.', precio: '$25000', imagen: '../img/carrolavado.jpg' },
        { titulo: 'Lavado Full y Brillado', descripcion: 'Exterior completo, encerado, motor superficial y aspirado profundo.', precio: '$40000', imagen: '../img/interiorauto.jpg' }
      ];
    } else if (tipo === 'moto') {
      servicios = [
        { titulo: 'Enjuague Básico', descripcion: 'Lavado exterior rápido y llantas.', precio: '$5000', imagen: '../img/enjuagar.webp' },
        { titulo: 'Lavado Normal', descripcion: 'Exterior completo + limpieza de cadena.', precio: '$6000', imagen: '../img/lavado normal.webp' },
        { titulo: 'Brillado y Detallado', descripcion: 'Pulido de partes metálicas y limpieza profunda.', precio: '$7000', imagen: '../img/brillado.jpg' }
      ];
    } else if (tipo === 'camion') {
      servicios = [
        { titulo: 'Enjuague Exterior', descripcion: 'Lavado de cabina y trailer exterior.', precio: '$40000', imagen: '../img/interiorcamion.jpeg' },
        { titulo: 'Lavado Completo', descripcion: 'Exterior completo y limpieza interior de cabina.', precio: '$50000', imagen: '../img/lavadocamion.jpg' },
        { titulo: 'Lavado Especial', descripcion: 'Chasis, motor, ejes y desinfección completa.', precio: '$60000', imagen: '../img/lavado-chasis.jpg' }
      ];
    }
  
    const fila = document.getElementById('fila-tarjetas');
  
    servicios.forEach(servicio => {
      fila.innerHTML += `
      <div class="col-md-4 mb-4 d-flex justify-content-center">
        <div class="card h-100 bg-secondary" style="width: 18rem;">
          <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${servicio.titulo}</h5>
            <p class="card-text">${servicio.descripcion}</p>
            <p class="card-text"><strong>Precio: ${servicio.precio}</strong></p>
            <button onclick="abrirModalConServicio('${servicio.titulo}', '${tipo}')" class="btn btn-primary mt-auto">Seleccionar</button>
          </div>
        </div>
      </div>
    `;
    
    });
  }
  
  // Mostrar servicios de carro por defecto al cargar la página
  document.addEventListener('DOMContentLoaded', function() {
    mostrarServicios('carro');
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
    mostrarServicios('carro');
  });

  function abrirModalConServicio(servicioTitulo, tipoVehiculo) {
    const servicioCompleto = `${servicioTitulo} - ${tipoVehiculo}`;
  
    document.getElementById('servicioSeleccionado').textContent = servicioCompleto;
    document.getElementById('campoServicioSeleccionado').value = servicioCompleto;
  
    // Resetear campos del formulario
    document.getElementById('nombreUsuario').value = '';
    document.getElementById('fechaDeseada').value = '';
    document.getElementById('detallesExtra').value = '';
  
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalServicio'));
    modal.show();
  }
  
  
  function actualizarLinkCorreo() {
    const nombre = document.getElementById('nombreUsuario').value;
    const fecha = document.getElementById('fechaDeseada').value;
    const servicio = window.servicioElegido || 'No especificado';
  
    const asunto = encodeURIComponent("Solicitud de servicio: " + servicio);
    const cuerpo = encodeURIComponent(`Hola, mi nombre es ${nombre}.\nDeseo solicitar el servicio de "${servicio}" para la fecha: ${fecha}.\nGracias.`);
  
    const mailtoLink = `mailto:juanse1124montes@gmail.com?subject=${asunto}&body=${cuerpo}`;
    document.getElementById('botonEnviarCorreo').href = mailtoLink;
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('botonEnviarCorreo').addEventListener('click', enviarCorreo);
  });
  
  