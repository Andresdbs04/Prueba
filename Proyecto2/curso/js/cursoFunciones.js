const URL_API = 'https://paginas-web-cr.com/Api/apis/';

const mensajeSuccess = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>Curso</strong> Acción completada con éxito.
    </div>`;

const mensajeDelete = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>Curso</strong> Eliminado correctamente.
    </div>`;

$(document).ready(function () {
    obtenerCursos();

    $('#formularioCrear').submit(function (evento) {
        evento.preventDefault();
        crearCurso();
    });

    $('#formularioEditar').submit(function (evento) {
        evento.preventDefault();
        actualizarCurso();
    });

    $('#formularioEliminar').submit(function (evento) {
        evento.preventDefault();
        eliminarCurso();
    });
});

// CRUD
function obtenerCursos() {
    $.ajax({
        url: URL_API + 'ListaCurso.php',
        method: 'POST',
        success: function (response) {
            cargarDatos(response.data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function cargarDatos(lista) {
    const tablaBody = $('#tablaBody');
    tablaBody.empty();

    lista.forEach(element => {
        const fila = `
            <tr>
                <td>${element.id}</td>
                <td>${element.nombre}</td>
                <td>${element.descripcion}</td>
                <td>${element.tiempo}</td>
                <td>${element.usuario}</td>
                <td>
                    <button class="btn btn-primary" onclick="editarCurso(${element.id}, '${element.nombre}', '${element.descripcion}', '${element.tiempo}', '${element.usuario}')">Editar</button>
                    ||
                    <button class="btn btn-danger" onclick="eliminarCursoModal(${element.id})">Eliminar</button>
                </td>
            </tr>`;
        tablaBody.append(fila);
    });
}

function crearCurso() {
    const curso = {
        id: null,
        nombre: $('#nombre').val(),
        descripcion: $('#descripcion').val(),
        tiempo: $('#tiempo').val(),
        usuario: 'Prof Mario'
    };

    $.ajax({
        url: URL_API + 'InsertarCursos.php',
        method: 'POST',
        data: JSON.stringify(curso),
        success: function (data) {
            finalizarCreacion(data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function finalizarCreacion(data) {
    $('#mensajePersonalizado').html(mensajeSuccess);
    $('#formularioCrear')[0].reset();
    bootstrap.Modal.getInstance($('#modalCrear')[0]).hide();
    obtenerCursos();
}

window.editarCurso = function (id, nombre, descripcion, tiempo, usuario) {
    $('#ideditar').val(id);
    $('#nombreeditar').val(nombre);
    $('#descripcioneditar').val(descripcion);
    $('#tiempoeditar').val(tiempo);
    $('#usuarioeditar').val(usuario);
    new bootstrap.Modal($('#modalEditar')[0]).show();
};

function actualizarCurso() {
    const curso = {
        id: $('#ideditar').val(),
        nombre: $('#nombreeditar').val(),
        descripcion: $('#descripcioneditar').val(),
        tiempo: $('#tiempoeditar').val(),
        usuario: $('#usuarioeditar').val()
    };

    $.ajax({
        url: URL_API + 'ActualizarCursos.php',
        method: 'POST',
        data: JSON.stringify(curso),
        success: function (data) {
            finalizarEdicion(data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function finalizarEdicion(data) {
    $('#mensajePersonalizado').html(mensajeSuccess);
    $('#formularioEditar')[0].reset();
    bootstrap.Modal.getInstance($('#modalEditar')[0]).hide();
    obtenerCursos();
}

window.eliminarCursoModal = function (id) {
    $('#ideliminar').val(id);
    new bootstrap.Modal($('#modalEliminar')[0]).show();
};

function eliminarCurso() {
    const id = $('#ideliminar').val();

    $.ajax({
        url: URL_API + 'BorrarCursos.php',
        method: 'POST',
        data: JSON.stringify({ id: id }),
        success: function (data) {
            finalizarEliminar(data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function finalizarEliminar(data) {
    $('#mensajePersonalizado').html(mensajeDelete);
    $('#formularioEliminar')[0].reset();
    bootstrap.Modal.getInstance($('#modalEliminar')[0]).hide();
    obtenerCursos();
}
