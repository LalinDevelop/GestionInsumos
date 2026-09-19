$(document).on('click', '.btnAgregarArticulo', function () {

    let boton = $(this);

    let codigo = boton.data('codigo');
    let articulo = boton.data('articulo');
    let existencia = parseInt(boton.data('existencia'));
    let unidad = boton.data('unidad');

    let input = $('.input-unidades[data-codigo="' + codigo + '"]');

    let unidades = parseInt(input.val());

    if (isNaN(unidades) || unidades <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Cantidad inválida',
            text: 'Ingresa una cantidad mayor a 0.'
        });

        return;
    }

    if (unidades > existencia) {
        Swal.fire({
            icon: 'warning',
            title: 'Existencia insuficiente',
            text: 'No puedes solicitar más de ' + existencia + ' unidades.'
        });

        return;
    }

    // Verificar si ya existe
    let filaExistente = $('#tbodyDetalleSolicitud')
        .find('tr[data-codigo="' + codigo + '"]');

    if (filaExistente.length > 0) {

        let inputDetalle = filaExistente.find('.input-cantidad-detalle');

        let cantidadActual = parseInt(inputDetalle.val());

        let nuevaCantidad = cantidadActual + unidades;

        if (nuevaCantidad > existencia) {
            Swal.fire({
                icon: 'warning',
                title: 'Existencia insuficiente',
                text: 'La cantidad solicitada no puede superar la existencia disponible.'
            });

            return;
        }

        inputDetalle.val(nuevaCantidad);

        return;
    }

    // Quitar mensaje de "sin partidas"
    $('#filaSinPartidas').remove();

    let fila = `
        <tr data-codigo="${codigo}"
            data-existencia="${existencia}">

            <td>${codigo}</td>

            <td>${articulo}</td>

            <td>${unidades}</td>

            <td>${unidad}</td>

            <td class="text-center">

                <button type="button"
                        class="btn btn-danger btn-sm btnEliminarArticulo"
                        title="Eliminar">
                    <i class="ft-trash-2"></i>
                </button>

            </td>

        </tr>
    `;

    $('#tbodyDetalleSolicitud').append(fila);
});

$(document).on('click', '.btnMas', function () {

    let fila = $(this).closest('tr');

    let input = fila.find('.input-cantidad-detalle');

    let existencia = parseInt(fila.data('existencia'));

    let cantidad = parseInt(input.val());

    if (cantidad < existencia) {
        input.val(cantidad + 1);
    }
});
$(document).on('click', '.btnMenos', function () {

    let fila = $(this).closest('tr');

    let input = fila.find('.input-cantidad-detalle');

    let cantidad = parseInt(input.val());

    if (cantidad > 1) {
        input.val(cantidad - 1);
    }
});
$(document).on('change', '.input-cantidad-detalle', function () {

    let input = $(this);

    let fila = input.closest('tr');

    let existencia = parseInt(fila.data('existencia'));

    let cantidad = parseInt(input.val());

    if (isNaN(cantidad) || cantidad < 1) {
        input.val(1);
        return;
    }

    if (cantidad > existencia) {

        Swal.fire({
            icon: 'warning',
            title: 'Cantidad excedida',
            text: 'La existencia disponible es de ' + existencia + ' unidades.'
        });

        input.val(existencia);
    }
});

$(document).on('click', '.btnEliminarArticulo', function () {

    let fila = $(this).closest('tr');

    fila.remove();

    if ($('#tbodyDetalleSolicitud tr').length === 0) {

        $('#tbodyDetalleSolicitud').html(`
            <tr id="filaSinPartidas">
                <td colspan="5" class="text-center text-muted">
                    Aún no hay artículos en esta solicitud
                </td>
            </tr>
        `);
    }
});

var solicitudesEjemplo = [

    {
        solicitud: "SOL-000125",
        fecha: "28/08/2026",
        estado: "Pendiente",
        comentarios: "Solicitud de material para oficina.",
        empleado: "Eduardo Reyna",
        contacto: "ereyna@tiendasgrand.com.mx",
        observaciones: "Favor de entregar el material en el área de sistemas.",
        articulos: [
            {
                codigo: "ART-001",
                articulo: "Hojas blancas tamaño carta",
                solicitadas: 5,
                entregadas: 0,
                unidad: "Paquete"
            },
            {
                codigo: "ART-002",
                articulo: "Pluma tinta azul",
                solicitadas: 10,
                entregadas: 0,
                unidad: "Pieza"
            }
        ]
    },

    {
        solicitud: "SOL-000124",
        fecha: "27/08/2026",
        estado: "Aprobada",
        comentarios: "Solicitud autorizada por el jefe de área.",
        empleado: "Eduardo Reyna",
        contacto: "ereyna@tiendasgrand.com.mx",
        observaciones: "Entregar preferentemente durante el turno de la mañana.",
        articulos: [
            {
                codigo: "ART-003",
                articulo: "Carpeta tamaño carta",
                solicitadas: 10,
                entregadas: 0,
                unidad: "Pieza"
            },
            {
                codigo: "ART-005",
                articulo: "Marcador permanente negro",
                solicitadas: 3,
                entregadas: 0,
                unidad: "Caja"
            }
        ]
    },

    {
        solicitud: "SOL-000123",
        fecha: "25/08/2026",
        estado: "Rechazada",
        comentarios: "Solicitud rechazada por falta de disponibilidad.",
        empleado: "Eduardo Reyna",
        contacto: "ereyna@tiendasgrand.com.mx",
        observaciones: "No existe disponibilidad suficiente de los artículos solicitados.",
        articulos: [
            {
                codigo: "ART-004",
                articulo: "Tóner para impresora HP",
                solicitadas: 4,
                entregadas: 0,
                unidad: "Pieza"
            }
        ]
    },

    {
        solicitud: "SOL-000122",
        fecha: "20/08/2026",
        estado: "Completada",
        comentarios: "Solicitud entregada completamente.",
        empleado: "Eduardo Reyna",
        contacto: "ereyna@tiendasgrand.com.mx",
        observaciones: "Material entregado completo al solicitante.",
        articulos: [
            {
                codigo: "ART-001",
                articulo: "Hojas blancas tamaño carta",
                solicitadas: 5,
                entregadas: 5,
                unidad: "Paquete"
            },
            {
                codigo: "ART-002",
                articulo: "Pluma tinta azul",
                solicitadas: 10,
                entregadas: 10,
                unidad: "Pieza"
            },
            {
                codigo: "ART-003",
                articulo: "Carpeta tamaño carta",
                solicitadas: 3,
                entregadas: 3,
                unidad: "Pieza"
            }
        ]
    },

    {
        solicitud: "SOL-000121",
        fecha: "18/08/2026",
        estado: "Completada",
        comentarios: "Entrega parcial completada.",
        empleado: "Eduardo Reyna",
        contacto: "ereyna@tiendasgrand.com.mx",
        observaciones: "Algunos artículos fueron entregados en fechas diferentes.",
        articulos: [
            {
                codigo: "ART-002",
                articulo: "Pluma tinta azul",
                solicitadas: 20,
                entregadas: 20,
                unidad: "Pieza"
            },
            {
                codigo: "ART-005",
                articulo: "Marcador permanente negro",
                solicitadas: 5,
                entregadas: 5,
                unidad: "Caja"
            }
        ]
    }

];

function cargarMisSolicitudes() {

    var tbody = $('#tbodyMisSolicitudes');

    tbody.empty();

    solicitudesEjemplo.forEach(function (solicitud) {

        var claseEstado = '';
        var botonCancelar = '';

        switch (solicitud.estado) {

            case 'Pendiente':
               // claseEstado = 'badge badge-warning';
                botonCancelar = `
                    <button type="button"
                            class="btn btn-danger btn-sm btnCancelarSolicitud"
                            data-solicitud="${solicitud.solicitud}"
                            title="Cancelar solicitud">
                        <i class="ft-x"></i>
                        Cancelar
                    </button>
                `;
                break;

            case 'Aprobada':
               // claseEstado = 'badge badge-success';
                break;

            case 'Rechazada':
              //  claseEstado = 'badge badge-danger';
                break;

            case 'Completada':
                //claseEstado = 'badge badge-primary';
                break;
        }


        var fila = `
            <tr>

                <td>
                    <strong>${solicitud.solicitud}</strong>
                </td>

                <td>
                    ${solicitud.fecha}
                </td>

                <td class="text-center">
                    <span class="${claseEstado}">
                        ${solicitud.estado}
                    </span>
                </td>

                <td>
                    ${solicitud.comentarios}
                </td>

                <td>
                    ${solicitud.empleado}
                </td>

                <td>
                    ${solicitud.contacto}
                </td>

                <td class="text-center">

                    <button type="button"
                            class="btn btn-info btn-sm btnVerDetalle"
                            data-solicitud="${solicitud.solicitud}"
                            title="Ver detalle">

                        <i class="ft-eye"></i>
                        Detalle

                    </button>

                    ${botonCancelar}

                </td>

            </tr>
        `;

        tbody.append(fila);
    });
}


$(document).ready(function () {

    cargarMisSolicitudes();

});

$(document).on('click', '.btnVerDetalle', function () {

    var numeroSolicitud = $(this).data('solicitud');

    var solicitud = solicitudesEjemplo.find(function (item) {
        return item.solicitud === numeroSolicitud;
    });

    if (!solicitud) {
        return;
    }

    // ==========================
    // ENCABEZADO
    // ==========================

    $('#lblFolioModal').text(solicitud.solicitud);

    var badgeEstado = '';

    switch (solicitud.estado) {

        case 'Pendiente':
            badgeEstado = '<span >Pendiente</span>';
            break;

        case 'Aprobada':
            badgeEstado = '<span >Aprobada</span>';
            break;

        case 'Rechazada':
            badgeEstado = '<span >Rechazada</span>';
            break;

        case 'Completada':
            badgeEstado = '<span >Completada</span>';
            break;
    }

    $('#lblEstadoModal').html(badgeEstado);


    // ==========================
    // ARTICULOS
    // ==========================

    var tbody = $('#tbodyDetalleModal');

    tbody.empty();

    solicitud.articulos.forEach(function (articulo) {

        var fila = `
            <tr>

                <td>
                    ${articulo.codigo}
                </td>

                <td>
                    ${articulo.articulo}
                </td>

                <td class="text-center font-weight-bold">
                    ${articulo.solicitadas}
                </td>

                <td class="text-center">
                    ${articulo.entregadas}
                </td>

                <td>
                    ${articulo.unidad}
                </td>

            </tr>
        `;

        tbody.append(fila);
    });


    // ==========================
    // OBSERVACIONES
    // ==========================
 
    $('#InputObservacionesModal').val(
        solicitud.observaciones || 'Sin observaciones.'
    );
  

    // ==========================
    // ABRIR MODAL
    // ==========================

    $('#modalDetalleSolicitud').modal('show');

});

$(document).on('click', '.btnCancelarSolicitud', function () {

    var numeroSolicitud = $(this).data('solicitud');

    var solicitud = solicitudesEjemplo.find(function (item) {
        return item.solicitud === numeroSolicitud;
    });

    if (!solicitud) {
        return;
    }

    Swal.fire({
        title: '¿Cancelar solicitud?',
        text: 'La solicitud ' + numeroSolicitud + ' será cancelada.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No'
    }).then(function (result) {

        if (result.isConfirmed) {

            // Aquí posteriormente irá tu AJAX
            // para cancelar la solicitud en la BD.

            solicitud.estado = 'Cancelada';

            Swal.fire({
                icon: 'success',
                title: 'Solicitud cancelada',
                text: 'La solicitud ' + numeroSolicitud + ' fue cancelada.',
                timer: 1800,
                showConfirmButton: false
            });

            cargarMisSolicitudes();
        }

    });

});
