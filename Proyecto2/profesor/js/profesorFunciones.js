const URL_API = "https://paginas-web-cr.com/Api/apis/";

const mensajeSuccess = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>Profesor</strong> Acción completada con éxito.
    </div>`;

const mensajeDelete = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>Profesor</strong> Eliminado correctamente.
    </div>`;

$(document).ready(function () {
    obtenerProfesor();

    $('#formularioCrear').submit(function (evento) {
        evento.preventDefault();
        crearProfesor();
    });

    $('#formularioEditar').submit(function (evento) {
        evento.preventDefault();
        actualizarProfesor();
    });

    $('#formularioEliminar').submit(function (evento) {
        evento.preventDefault();
        eliminarProfesor();
    });
});

// CRUD
function obtenerProfesor() {
    $.ajax({
        url: URL_API + 'ListaProfesores.php',
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
    const tabla = $('#tablaBodyProfesor');
    tabla.empty();

    lista.forEach(element => {
        const fila = `
            <tr>
                <td>${element.id}</td>
                <td>${element.nombre}</td>
                <td>${element.apellidopaterno}</td>
                <td>${element.apellidomaterno}</td>
                <td>${element.cedula}</td>
                <td>${element.correoelectronico}</td>
                <td>
                    <button class="btn btn-primary"
                        onclick="editarProfesor(${element.id}, '${element.cedula}', '${element.correoelectronico}','${element.telefono}','${element.telefonocelular}','${element.fechanacimiento}','${element.sexo}','${element.direccion}','${element.nombre}','${element.apellidopaterno}','${element.apellidomaterno}','${element.idCarreras}','${element.usuario}','${element.nacionalidad}')">
                        Editar
                    </button>
                    ||
                    <button class="btn btn-danger btn-sm" onclick="eliminarProfesorModal(${element.id})">
                        Eliminar
                    </button>
                </td>
            </tr>`;
        tabla.append(fila);
    });
}

function crearProfesor() {
    const profesor = {
        id: null,
        cedula: $('#cedula').val(),
        correoelectronico: $('#correoElectronico').val(),
        telefono: $('#telefono').val(),
        telefonocelular: $('#telefonoCelular').val(),
        fechanacimiento: $('#fechaNacimiento').val(),
        sexo: $('#sexo').val(),
        direccion: $('#direccion').val(),
        nombre: $('#nombre').val(),
        apellidopaterno: $('#apellidoPaterno').val(),
        apellidomaterno: $('#apellidoMaterno').val(),
        idCarreras: $('#idCarreras').val(),
        usuario: 'Prof Mario',
        nacionalidad: $('#nacionalidad').val()
    };

    $.ajax({
        url: URL_API + 'InsertarProfesores.php',
        method: 'POST',
        data: JSON.stringify(profesor),
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
    obtenerProfesor();
}

window.editarProfesor = function (
    id, cedula, correoelectronico, telefono, telefonocelular,
    fechanacimiento, sexo, direccion, nombre, apellidopaterno,
    apellidomaterno, idCarreras, usuario, nacionalidad
) {
    $('#ideditar').val(id);
    $('#cedulaeditar').val(cedula);
    $('#correoElectronicoeditar').val(correoelectronico);
    $('#telefonoeditar').val(telefono);
    $('#telefonoCelulareditar').val(telefonocelular);
    $('#fechaNacimientoeditar').val(fechanacimiento);
    $('#sexoeditar').val(sexo);
    $('#direccioneditar').val(direccion);
    $('#nombreeditar').val(nombre);
    $('#apellidoPaternoeditar').val(apellidopaterno);
    $('#apellidoMaternoeditar').val(apellidomaterno);
    $('#idCarreraseditar').val(idCarreras);
    $('#usuarioeditar').val(usuario);
    $('#nacionalidadeditar').val(nacionalidad);

    new bootstrap.Modal($('#modalEditar')[0]).show();
};

function actualizarProfesor() {
    const profesor = {
        id: $('#ideditar').val(),
        cedula: $('#cedulaeditar').val(),
        correoelectronico: $('#correoElectronicoeditar').val(),
        telefono: $('#telefonoeditar').val(),
        telefonocelular: $('#telefonoCelulareditar').val(),
        fechanacimiento: $('#fechaNacimientoeditar').val(),
        sexo: $('#sexoeditar').val(),
        direccion: $('#direccioneditar').val(),
        nombre: $('#nombreeditar').val(),
        apellidopaterno: $('#apellidoPaternoeditar').val(),
        apellidomaterno: $('#apellidoMaternoeditar').val(),
        idCarreras: $('#idCarreraseditar').val(),
        usuario: $('#usuarioeditar').val(),
        nacionalidad: $('#nacionalidadeditar').val()
    };

    $.ajax({
        url: URL_API + 'ActualizarProfesores.php',
        method: 'POST',
        data: JSON.stringify(profesor),
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
    obtenerProfesor();
}

window.eliminarProfesorModal = function (id) {
    $('#ideliminar').val(id);
    new bootstrap.Modal($('#modalEliminar')[0]).show();
};

function eliminarProfesor() {
    const id = $('#ideliminar').val();

    $.ajax({
        url: URL_API + 'BorrarProfesores.php',
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
    obtenerProfesor();
}
