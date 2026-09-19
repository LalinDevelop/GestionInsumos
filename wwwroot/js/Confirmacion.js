// ============================================================
// DATOS DE EJEMPLO - SOLICITUDES
// ============================================================

var solicitudesDespacho = [

    {
        solicitud: "SOL-000125",
        fecha: "31/08/2026",
        area: "Sistemas",
        usuario: "Eduardo Reyna",
        estado: "Pendiente",
        comentarios: "Solicitud de material para actividades administrativas.",
        observaciones: "Favor de entregar el material al área de Sistemas.",
        articulos: [
            {
                codigo: "ART-001",
                insumo: "Hojas blancas tamaño carta",
                solicitado: 5,
                entregado: 0
            },
            {
                codigo: "ART-002",
                insumo: "Pluma tinta azul",
                solicitado: 10,
                entregado: 0
            },
            {
                codigo: "ART-003",
                insumo: "Carpeta tamaño carta",
                solicitado: 3,
                entregado: 0
            }
        ]
    },

    {
        solicitud: "SOL-000124",
        fecha: "30/08/2026",
        area: "Recursos Humanos",
        usuario: "María González",
        estado: "Aprobada",
        comentarios: "Solicitud autorizada.",
        observaciones: "Entregar durante el horario laboral.",
        articulos: [
            {
                codigo: "ART-001",
                insumo: "Hojas blancas tamaño carta",
                solicitado: 10,
                entregado: 5
            },
            {
                codigo: "ART-005",
                insumo: "Marcador permanente negro",
                solicitado: 2,
                entregado: 0
            }
        ]
    },

    {
        solicitud: "SOL-000123",
        fecha: "29/08/2026",
        area: "Contabilidad",
        usuario: "Carlos Martínez",
        estado: "Pendiente",
        comentarios: "Material requerido para cierre mensual.",
        observaciones: "Material requerido antes del cierre de mes.",
        articulos: [
            {
                codigo: "ART-002",
                insumo: "Pluma tinta azul",
                solicitado: 20,
                entregado: 0
            },
            {
                codigo: "ART-006",
                insumo: "Post-it amarillo",
                solicitado: 5,
                entregado: 0
            }
        ]
    },

    {
        solicitud: "SOL-000122",
        fecha: "28/08/2026",
        area: "Compras",
        usuario: "Ana López",
        estado: "Aprobada",
        comentarios: "Solicitud aprobada por administración.",
        observaciones: "Entregar al departamento de Compras.",
        articulos: [
            {
                codigo: "ART-003",
                insumo: "Carpeta tamaño carta",
                solicitado: 10,
                entregado: 10
            },
            {
                codigo: "ART-007",
                insumo: "Engrapadora mediana",
                solicitado: 2,
                entregado: 1
            }
        ]
    },

    {
        solicitud: "SOL-000121",
        fecha: "26/08/2026",
        area: "Administración",
        usuario: "Luis Hernández",
        estado: "Completada",
        comentarios: "Solicitud entregada completamente.",
        observaciones: "Entrega realizada sin incidencias.",
        articulos: [
            {
                codigo: "ART-001",
                insumo: "Hojas blancas tamaño carta",
                solicitado: 5,
                entregado: 5
            },
            {
                codigo: "ART-002",
                insumo: "Pluma tinta azul",
                solicitado: 10,
                entregado: 10
            }
        ]
    },

    {
        solicitud: "SOL-000120",
        fecha: "25/08/2026",
        area: "Ventas",
        usuario: "Pedro Ramírez",
        estado: "Rechazada",
        comentarios: "No existe disponibilidad suficiente.",
        observaciones: "El material solicitado no se encuentra disponible.",
        articulos: [
            {
                codigo: "ART-004",
                insumo: "Tóner para impresora HP",
                solicitado: 5,
                entregado: 0
            }
        ]
    },

    {
        solicitud: "SOL-000119",
        fecha: "24/08/2026",
        area: "Sistemas",
        usuario: "Eduardo Reyna",
        estado: "Completada",
        comentarios: "Solicitud entregada.",
        observaciones: "Todo el material fue entregado.",
        articulos: [
            {
                codigo: "ART-004",
                insumo: "Tóner para impresora HP",
                solicitado: 1,
                entregado: 1
            },
            {
                codigo: "ART-005",
                insumo: "Marcador permanente negro",
                solicitado: 2,
                entregado: 2
            }
        ]
    }

];


// ============================================================
// INICIALIZAR
// ============================================================

$(document).ready(function () {

    cargarSolicitudesPendientes();
    cargarTodasLasSolicitudes();

});


// ============================================================
// TAB - SOLICITUDES PENDIENTES
// ============================================================

function cargarSolicitudesPendientes() {

    var tbody = $('#tbodyDetalleSolicitud');

    tbody.empty();

    // Solo solicitudes pendientes o aprobadas
    var pendientes = solicitudesDespacho.filter(function (solicitud) {

        return solicitud.estado === "Pendiente" ||
            solicitud.estado === "Aprobada";

    });


    if (pendientes.length === 0) {

        tbody.html(`
            <tr id="filaSinPartidas">
                <td colspan="5" class="text-center text-muted">
                    No hay solicitudes pendientes de aprobación o entrega
                </td>
            </tr>
        `);

        return;
    }


    pendientes.forEach(function (solicitud) {

        var claseEstado = obtenerClaseEstado(solicitud.estado);

        var botonAccion = '';


        // ==============================================
        // PENDIENTE
        // ==============================================

        if (solicitud.estado === "Pendiente") {

            botonAccion = `
                <button type="button"
                        class="btn btn-success btn-sm btnAprobarSolicitud"
                        data-solicitud="${solicitud.solicitud}"
                        title="Aprobar solicitud">

                    <i class="ft-arrow-right"></i>
                    Aprobar

                </button>
            `;

        }


        // ==============================================
        // APROBADA
        // ==============================================

        if (solicitud.estado === "Aprobada") {

            botonAccion = `
                <button type="button"
                        class="btn btn-primary btn-sm btnDespacharSolicitud"
                        data-solicitud="${solicitud.solicitud}"
                        title="Despachar solicitud">

                    <i class="ft-check"></i>
                    Marcar completada

                </button>
            `;

        }


        var fila = `
            <tr>

                <td>
                    <strong>${solicitud.solicitud}</strong>
                </td>

                <td>
                    ${solicitud.area}
                </td>

                <td>
                    ${solicitud.usuario}
                </td>

                <td class="text-center">

                    <span >
                        ${solicitud.estado}
                    </span>

                </td>

                <td class="text-center">

                    <button type="button"
                            class="btn btn-info btn-sm btnVerDetalle"
                            data-solicitud="${solicitud.solicitud}"
                            title="Ver detalle">

                        <i class="ft-eye"></i>

                    </button>

                    ${botonAccion}

                </td>

            </tr>
        `;

        tbody.append(fila);

    });

}


// ============================================================
// TAB - TODAS LAS SOLICITUDES
// ============================================================

function cargarTodasLasSolicitudes() {

    var tbody = $('#tablaSolicitudes tbody');

    tbody.empty();


    solicitudesDespacho.forEach(function (solicitud) {

        var claseEstado = obtenerClaseEstado(solicitud.estado);


        var fila = `
            <tr>

                <td>
                    <strong>${solicitud.solicitud}</strong>
                </td>

                <td>
                    ${solicitud.fecha}
                </td>

                <td class="text-center">

                    <span >
                        ${solicitud.estado}
                    </span>

                </td>

                <td>
                    ${solicitud.comentarios}
                </td>

                <td>
                    ${solicitud.observaciones}
                </td>

                <td class="text-center">

                    <button type="button"
                            class="btn btn-info btn-sm btnVerDetalle"
                            data-solicitud="${solicitud.solicitud}"
                            title="Ver detalle">

                        <i class="ft-eye"></i>
                        Ver detalle

                    </button>

                </td>

            </tr>
        `;

        tbody.append(fila);

    });

}


// ============================================================
// OBTENER CLASE DEL ESTADO
// ============================================================

function obtenerClaseEstado(estado) {

    switch (estado) {

        case "Pendiente":
            return "badge-warning";

        case "Aprobada":
            return "badge-success";

        case "Rechazada":
            return "badge-danger";

        case "Completada":
            return "badge-primary";

        case "Cancelada":
            return "badge-secondary";

        default:
            return "badge-secondary";
    }

}


// ============================================================
// VER DETALLE
// ============================================================

$(document).on('click', '.btnVerDetalle', function () {

    var numeroSolicitud = $(this).data('solicitud');


    var solicitud = solicitudesDespacho.find(function (item) {

        return item.solicitud === numeroSolicitud;

    });


    if (!solicitud) {

        return;

    }


    // Folio
    $('#lblFolioModal').text(solicitud.solicitud);


    // Limpiar tabla
    var tbody = $('#tablaDetalleModal tbody');

    tbody.empty();


    // ============================================
    // ARTICULOS
    // ============================================

    solicitud.articulos.forEach(function (articulo) {

        var pendiente = articulo.solicitado - articulo.entregado;

        var estadoArticulo = '';

        var claseEstado = '';


        if (pendiente === 0) {

            estadoArticulo = 'Entregado';
            claseEstado = 'badge-success';

        }
        else if (articulo.entregado > 0) {

            estadoArticulo = 'Parcial';
            claseEstado = 'badge-warning';

        }
        else {

            estadoArticulo = 'Pendiente';
            claseEstado = 'badge-secondary';

        }


        var fila = `
            <tr>

                <td>
                    ${articulo.insumo}
                </td>

                <td class="text-center font-weight-bold">
                    ${articulo.solicitado}
                </td>

                <td class="text-center">
                    ${articulo.entregado}
                </td>

                <td class="text-center font-weight-bold">
                    ${pendiente}
                </td>

                <td class="text-center">

                    <span >
                        ${estadoArticulo}
                    </span>

                </td>

            </tr>
        `;

        tbody.append(fila);

    });


    // Mostrar estado en encabezado
    var estadoHtml = `
        <span>
            ${solicitud.estado}
        </span>
    `;


    // Si quieres mostrar el estado junto al folio
    $('#lblFolioModal').html(
        solicitud.solicitud + ' ' + estadoHtml
    );


    $('#modalDetalleSolicitud').modal('show');

});


// ============================================================
// APROBAR SOLICITUD
// ============================================================

$(document).on('click', '.btnAprobarSolicitud', function () {

    var numeroSolicitud = $(this).data('solicitud');

    var solicitud = solicitudesDespacho.find(function (item) {

        return item.solicitud === numeroSolicitud;

    });


    if (!solicitud) {
        return;
    }


    // ==========================================
    // GUARDAR SOLICITUD ACTUAL
    // ==========================================

    $('#modalAprobarSolicitud').data(
        'solicitud',
        numeroSolicitud
    );


    // ==========================================
    // MOSTRAR FOLIO
    // ==========================================

    $('#lblFolioAprobacion').text(
        solicitud.solicitud
    );


    // ==========================================
    // LIMPIAR TABLA
    // ==========================================

    var tbody = $('#tbodyAprobacionSolicitud');

    tbody.empty();


    // ==========================================
    // CARGAR ARTICULOS
    // ==========================================

    solicitud.articulos.forEach(function (articulo, index) {

        var fila = `
            <tr>

                <td>
                    ${articulo.insumo}
                </td>

                <td class="text-center">

                    <strong>
                        ${articulo.solicitado}
                    </strong>

                </td>

                <td>

                    <input type="number"
                           class="form-control text-center inputUnidadesAutorizadas"
                           data-index="${index}"
                           value="${articulo.solicitado}"
                           min="0"
                           max="${articulo.solicitado}">

                </td>

            </tr>
        `;

        tbody.append(fila);

    });


    // ==========================================
    // LIMPIAR OBSERVACIONES
    // ==========================================

    $('#txtObservacionesAprobacion').val('');


    // ==========================================
    // ABRIR MODAL
    // ==========================================

    $('#modalAprobarSolicitud').modal('show');

});


// ============================================================
// DESPACHAR SOLICITUD
// ============================================================

$(document).on('click', '.btnDespacharSolicitud', function () {

    var numeroSolicitud = $(this).data('solicitud');


    var solicitud = solicitudesDespacho.find(function (item) {

        return item.solicitud === numeroSolicitud;

    });


    if (!solicitud) {

        return;

    }


    // Aquí puedes posteriormente abrir
    // un modal específico para registrar
    // las cantidades entregadas.


    Swal.fire({

        title: '¿Despachar solicitud?',

        text: 'Se iniciará el despacho de ' + numeroSolicitud + '.',

        icon: 'question',

        showCancelButton: true,

        confirmButtonText: 'Sí, despachar',

        cancelButtonText: 'Cancelar'

    }).then(function (result) {

        if (result.isConfirmed) {

            // ==========================================
            // SIMULACIÓN
            // ==========================================

            solicitud.articulos.forEach(function (articulo) {

                articulo.entregado = articulo.solicitado;

            });


            solicitud.estado = "Completada";


            Swal.fire({

                icon: 'success',

                title: 'Solicitud completada',

                text: numeroSolicitud + ' fue despachada correctamente.',

                timer: 1800,

                showConfirmButton: false

            });


            cargarSolicitudesPendientes();

            cargarTodasLasSolicitudes();

        }

    });

});
$(document).on('change', '.inputUnidadesAutorizadas', function () {

    var input = $(this);

    var maximo = parseInt(input.attr('max'));

    var valor = parseInt(input.val());


    if (isNaN(valor) || valor < 0) {

        input.val(0);

        return;
    }


    if (valor > maximo) {

        Swal.fire({

            icon: 'warning',

            title: 'Cantidad no válida',

            text: 'No puedes autorizar más unidades de las solicitadas.'

        });

        input.val(maximo);

    }

});
$(document).on('input', '.inputUnidadesAutorizadas', function () {

    var valor = parseInt($(this).val());

    if (isNaN(valor)) {
        $(this).val('');
        return;
    }

    $(this).val(valor);

});
$(document).on('click', '#btnConfirmarAprobacion', function () {

    var boton = $(this);

    var numeroSolicitud =
        $('#modalAprobarSolicitud').data('solicitud');


    var solicitud = solicitudesDespacho.find(function (item) {

        return item.solicitud === numeroSolicitud;

    });


    if (!solicitud) {
        return;
    }


    // ==========================================
    // OBTENER CANTIDADES AUTORIZADAS
    // ==========================================

    var cantidadesValidas = true;

    var unidadesAutorizadas = [];


    $('#tbodyAprobacionSolicitud .inputUnidadesAutorizadas')
        .each(function () {

            var input = $(this);

            var index = parseInt(input.data('index'));

            var cantidad = parseInt(input.val());

            var maximo = parseInt(input.attr('max'));


            if (isNaN(cantidad) ||
                cantidad < 0 ||
                cantidad > maximo) {

                cantidadesValidas = false;

                return false;
            }


            unidadesAutorizadas.push({

                index: index,

                cantidad: cantidad

            });

        });


    if (!cantidadesValidas) {

        Swal.fire({

            icon: 'warning',

            title: 'Cantidades inválidas',

            text: 'Revisa las unidades autorizadas.'

        });

        return;
    }


    // ==========================================
    // CONFIRMAR QUE AL MENOS UN ARTICULO
    // TENGA UNIDADES
    // ==========================================

    var totalAutorizado = unidadesAutorizadas.reduce(
        function (total, item) {

            return total + item.cantidad;

        },
        0
    );


    if (totalAutorizado === 0) {

        Swal.fire({

            icon: 'warning',

            title: 'Solicitud sin unidades',

            text: 'Debes autorizar al menos una unidad.'

        });

        return;
    }


    // ==========================================
    // OBSERVACIONES
    // ==========================================

    var observaciones =
        $('#txtObservacionesAprobacion').val().trim();


    // ==========================================
    // CONFIRMACION FINAL
    // ==========================================

    Swal.fire({

        title: '¿Confirmar aprobación?',

        text: 'La solicitud ' +
            numeroSolicitud +
            ' será aprobada con las cantidades indicadas.',

        icon: 'question',

        showCancelButton: true,

        confirmButtonText: 'Sí, confirmar aprobación',

        cancelButtonText: 'Regresar',

        reverseButtons: true

    }).then(function (result) {

        if (!result.isConfirmed) {
            return;
        }


        // ==========================================
        // ACTUALIZAR DATOS DE EJEMPLO
        // ==========================================

        unidadesAutorizadas.forEach(function (item) {

            solicitud.articulos[item.index].autorizado =
                item.cantidad;

        });


        solicitud.observaciones =
            observaciones;


        solicitud.estado = "Aprobada";


        // ==========================================
        // CERRAR MODAL
        // ==========================================

        $('#modalAprobarSolicitud').modal('hide');


        // ==========================================
        // ACTUALIZAR TABLAS
        // ==========================================

        cargarSolicitudesPendientes();

        cargarTodasLasSolicitudes();


        // ==========================================
        // MENSAJE
        // ==========================================

        Swal.fire({

            icon: 'success',

            title: 'Solicitud aprobada',

            text: 'La solicitud ' +
                numeroSolicitud +
                ' fue aprobada correctamente.',

            timer: 2000,

            showConfirmButton: false

        });

    });

});

$(document).on('click', '#btnRechazarSolicitud', function () {

    var numeroSolicitud =
        $('#modalAprobarSolicitud').data('solicitud');


    var solicitud = solicitudesDespacho.find(function (item) {

        return item.solicitud === numeroSolicitud;

    });


    if (!solicitud) {
        return;
    }


    // ==========================================
    // PEDIR MOTIVO DEL RECHAZO
    // ==========================================

    Swal.fire({

        title: 'Rechazar solicitud',

        html: `
            <p class="text-left">
                ¿Deseas rechazar la solicitud
                <strong>${numeroSolicitud}</strong>?
            </p>

            <textarea id="txtMotivoRechazo"
                      class="form-control"
                      rows="4"
                      placeholder="Indica el motivo del rechazo..."></textarea>
        `,

        icon: 'warning',

        showCancelButton: true,

        confirmButtonText: 'Rechazar solicitud',

        cancelButtonText: 'Cancelar',

        confirmButtonColor: '#dc3545',

        cancelButtonColor: '#6c757d',

        preConfirm: function () {

            var motivo =
                $('#txtMotivoRechazo').val().trim();


            if (motivo === '') {

                Swal.showValidationMessage(
                    'Debes indicar el motivo del rechazo.'
                );

                return false;
            }


            return motivo;

        }

    }).then(function (result) {

        if (!result.isConfirmed) {
            return;
        }


        var motivo = result.value;


        // ==========================================
        // ACTUALIZAR EJEMPLO
        // ==========================================

        solicitud.estado = "Rechazada";

        solicitud.observaciones = motivo;


        // ==========================================
        // CERRAR MODAL
        // ==========================================

        $('#modalAprobarSolicitud').modal('hide');


        // ==========================================
        // ACTUALIZAR TABLAS
        // ==========================================

        cargarSolicitudesPendientes();

        cargarTodasLasSolicitudes();


        // ==========================================
        // MENSAJE
        // ==========================================

        Swal.fire({

            icon: 'success',

            title: 'Solicitud rechazada',

            text: 'La solicitud ' +
                numeroSolicitud +
                ' fue rechazada.',

            timer: 2000,

            showConfirmButton: false

        });

    });

});