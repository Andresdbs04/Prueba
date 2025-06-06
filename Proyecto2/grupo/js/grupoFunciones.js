const URL_API = 'https://paginas-web-cr.com/Api/apis/';

const mensajeSuccess = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>Grupo</strong> Acción completada con éxito.
    </div>`;

const mensajeDelete = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>Grupo</strong> Eliminado correctamente.
    </div>`;

$(document).ready(function () {
    obtenerGrupo();

    $('#formularioCrear').submit(function (evento) {
        evento.preventDefault();
        crearGrupo();
    });

    $('#formularioEditar').submit(function (evento) {
        evento.preventDefault();
        actualizarGrupo();
    });

    $('#formularioEliminar').submit(function (evento) {
        evento.preventDefault();
        eliminarGrupo();
    });
});

// CRUD
function obtenerGrupo() {
    $.ajax({
        url: URL_API + 'ListaGrupo.php',
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
                <td>
                    <button class="btn btn-primary" onclick="editarGrupo(${element.id}, '${element.nombre}')">Editar</button>
                    ||
                    <button class="btn btn-danger" onclick="eliminarGrupoModal(${element.id})">Eliminar</button>
                </td>
            </tr>`;
        tablaBody.append(fila);
    });
}

function crearGrupo() {
    const grupo = {
        id: null,
        nombre: $('#nombre').val()
    };

    $.ajax({
        url: URL_API + 'InsertarGrupo.php',
        method: 'POST',
        data: JSON.stringify(grupo),
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
    obtenerGrupo();
}

window.editarGrupo = function (id, nombre) {
    $('#ideditar').val(id);
    $('#nombreeditar').val(nombre);
    new bootstrap.Modal($('#modalEditar')[0]).show();
};

function actualizarGrupo() {
    const grupo = {
        id: $('#ideditar').val(),
        nombre: $('#nombreeditar').val()
    };

    $.ajax({
        url: URL_API + 'ActualizarGrupo.php',
        method: 'POST',
        data: JSON.stringify(grupo),
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
    obtenerGrupo();
}

window.eliminarGrupoModal = function (id) {
    $('#ideliminar').val(id);
    new bootstrap.Modal($('#modalEliminar')[0]).show();
};

function eliminarGrupo() {
    const id = $('#ideliminar').val();

    $.ajax({
        url: URL_API + 'BorrarGrupo.php',
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
    obtenerGrupo();
}
