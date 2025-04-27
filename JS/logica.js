function mostrarServicios(tipo) {
    const contenedor = document.getElementById('tarjetas-servicio');
    
    // Importante: aseguramos que el contenedor sea una row
    contenedor.innerHTML = '<div class="row" id="fila-tarjetas"></div>';
  
    let servicios = [];
  
    if (tipo === 'carro') {
      servicios = [
        { titulo: 'Enjuague Rápido', descripcion: 'Lavado exterior ligero y secado rápido.', precio: '$10', imagen: 'img/enjuague-carro.jpg' },
        { titulo: 'Lavado Normal', descripcion: 'Exterior completo, llantas, vidrios y aspirado básico.', precio: '$20', imagen: 'img/lavado-carro.jpg' },
        { titulo: 'Lavado Full y Brillado', descripcion: 'Exterior completo, encerado, motor superficial y aspirado profundo.', precio: '$35', imagen: 'img/brillado-carro.jpg' }
      ];
    } else if (tipo === 'moto') {
      servicios = [
        { titulo: 'Enjuague Básico', descripcion: 'Lavado exterior rápido y llantas.', precio: '$5', imagen: 'img/enjuague-moto.jpg' },
        { titulo: 'Lavado Normal', descripcion: 'Exterior completo + limpieza de cadena.', precio: '$10', imagen: 'img/lavado-moto.jpg' },
        { titulo: 'Brillado y Detallado', descripcion: 'Pulido de partes metálicas y limpieza profunda.', precio: '$15', imagen: 'img/brillado-moto.jpg' }
      ];
    } else if (tipo === 'camion') {
      servicios = [
        { titulo: 'Enjuague Exterior', descripcion: 'Lavado de cabina y trailer exterior.', precio: '$30', imagen: 'img/enjuague-camion.jpg' },
        { titulo: 'Lavado Completo', descripcion: 'Exterior completo y limpieza interior de cabina.', precio: '$50', imagen: 'img/lavado-camion.jpg' },
        { titulo: 'Lavado Especial', descripcion: 'Chasis, motor, ejes y desinfección completa.', precio: '$70', imagen: 'img/brillado-camion.jpg' }
      ];
    }
  
    const fila = document.getElementById('fila-tarjetas');
  
    servicios.forEach(servicio => {
      fila.innerHTML += `
        <div class="col-md-4 mb-4 d-flex justify-content-center">
          <div class="card h-100" style="width: 18rem;">
            <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${servicio.titulo}</h5>
              <p class="card-text">${servicio.descripcion}</p>
              <p class="card-text"><strong>Precio: ${servicio.precio}</strong></p>
              <a href="#" class="btn btn-primary mt-auto">Seleccionar</a>
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
  