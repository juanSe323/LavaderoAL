document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formResena');
  const estrellas = document.querySelectorAll('#estrellasCalificacion .estrella');
  const contenedor = document.getElementById('estrellasCalificacion');
  const inputValoracion = form.valoracion;
  const contenedorResenas = document.querySelector('.reseñas-destacadas .row');
  const btnMasResenas = document.getElementById('btnMasResenas');
  let mostrarTodas = false;



  const reseñasPorDefecto = [
  {
    nombre: "María Gímenes.",
    calificacion: 5,
    mensaje: "Excelente servicio, muy rápido y amable."
  },
  {
    nombre: "Carlos Pérez.",
    calificacion: 4,
    mensaje: "Todo bien, aunque podría mejorar el lavado interior."
  },
  {
    nombre: "Ana Lopez.",
    calificacion: 5,
    mensaje: "Mi carro quedó como nuevo, súper recomendados."
  }
];

  let estrellasSeleccionadas = 0;

  // Marcar estrellas seleccionadas
  estrellas.forEach((estrella, index) => {
    estrella.addEventListener('click', () => {
      estrellasSeleccionadas = index + 1;
      inputValoracion.value = estrellasSeleccionadas;
      actualizarEstrellas();
      contenedor.classList.add('active');
    });
  });

  function actualizarEstrellas() {
    estrellas.forEach((estrella, i) => {
      estrella.classList.toggle('bi-star-fill', i < estrellasSeleccionadas);
      estrella.classList.toggle('bi-star', i >= estrellasSeleccionadas);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();



    const nuevaResena = {
      nombre: form.nombre.value.trim(),
      apellido: form.apellido.value.trim(),
      estrellas: parseInt(inputValoracion.value),
      descripcion: form.descripcion.value.trim(),
      sugerencias: form.sugerencias.value.trim(),
      fecha: new Date().toLocaleDateString()
    };

    try {
      guardarResena(nuevaResena);
      enviarCorreoResena(nuevaResena);
      renderizarResenas(); // actualiza lista
      mostrarModalExito();
      form.reset();
      estrellasSeleccionadas = 0;
      actualizarEstrellas();
      contenedor.classList.remove('active');
      inputValoracion.value = 0;
    } catch (error) {
      console.error("Error al guardar reseña:", error);
      mostrarModalError();
    }
  });

  function enviarCorreoResena(resena) {
  emailjs.send("service_3d6nycz", "template_2yssudo", {
    nombre: resena.nombre,
    apellido: resena.apellido,
    estrellas: resena.estrellas,
    descripcion: resena.descripcion,
    sugerencias: resena.sugerencias || "Sin sugerencias",
    fecha: resena.fecha
  }).then(() => {
    console.log("Correo enviado con éxito.");
  }).catch(error => {
    console.error("Error al enviar correo:", error);
  });
}

  function guardarResena(resena) {
    let resenas = JSON.parse(localStorage.getItem('resenasAL')) || [];
    resenas.unshift(resena); // más reciente al principio
    localStorage.setItem('resenasAL', JSON.stringify(resenas));
  }

 function renderizarResenas() {
  let resenas = JSON.parse(localStorage.getItem('resenasAL'));

  // Si no hay reseñas, usar las por defecto y guardarlas
  if (!resenas || resenas.length === 0) {
    resenas = reseñasPorDefecto;
    localStorage.setItem('resenasAL', JSON.stringify(resenas));
  }

    contenedorResenas.innerHTML = '';

    const resenasAMostrar = mostrarTodas ? resenas : resenas.slice(0, 3);

    resenasAMostrar.forEach(resena => {
      const div = document.createElement('div');
      div.classList.add('col-md-4', 'mb-4');

      div.innerHTML = `
        <div class="card-resena">
          <div class="card-body">
            <h5 class="nombre-cliente">${resena.nombre} ${resena.apellido}</h5>
            <p class="mb-2">${mostrarEstrellas(resena.estrellas)}</p>
            <p class="card-text">"${resena.descripcion}"</p>
            ${resena.sugerencias ? `<small class="text-muted">Sugerencia: ${resena.sugerencias}</small><br>` : ''}
            <small class="text-muted">Fecha: ${resena.fecha}</small>
          </div>
        </div>
      `;
      contenedorResenas.appendChild(div);
    });
  }

  function mostrarEstrellas(n) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="${i <= n ? 'bi bi-star-fill text-warning' : 'bi bi-star text-secondary'}"></span>`;
    }
    return html;
  }

  function mostrarModalExito() {
    const modal = new bootstrap.Modal(document.getElementById('modalGracias'));
    modal.show();
  }

  function mostrarModalError() {
    const modal = new bootstrap.Modal(document.getElementById('modalError'));
    modal.show();
  }

  btnMasResenas.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarTodas = !mostrarTodas;
    btnMasResenas.textContent = mostrarTodas ? "Ocultar Reseñas" : "Ver Todas las Reseñas";
    renderizarResenas();
  });

  // Mostrar primeras reseñas al cargar
  renderizarResenas();
});

