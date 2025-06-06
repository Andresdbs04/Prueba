const URL_API = "https://paginas-web-cr.com/Api/apis/";

const mensajeSuccess = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>Estudiante</strong> Acción completada con éxito.
    </div>`;

const mensajeDelete = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>Estudiante</strong> Eliminado correctamente.
    </div>`;

$(document).ready(function () {
    obtenerEstudiantes();

    $("#formularioCrear").submit(function (evento) {
        evento.preventDefault();
        crearEstudiante();
    });

    $("#formularioEditar").submit(function (evento) {
        evento.preventDefault();
        actualizarEstudiante();
    });

    $("#formularioEliminar").submit(function (evento) {
        evento.preventDefault();
        eliminarEstudiante();
    });
});

function obtenerEstudiantes() {
    $.ajax({
        url: URL_API + "ListaEstudiantes.php",
        method: "POST",
        success: function (response) {
            cargarDatos(response.data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function cargarDatos(listaEstudiantes) {
    const tabla = $("#tablaBodyEstudiante");
    tabla.empty();

    listaEstudiantes.forEach(element => {
        const fila = `
            <tr>
                <td>${element.id}</td>
                <td>${element.nombre}</td>
                <td>${element.apellidopaterno}</td>
                <td>${element.apellidomaterno}</td>
                <td>${element.cedula}</td>
                <td>${element.correoelectronico}</td>
                <td>
                    <button class="btn btn-primary" onclick="editarEstudiante(${element.id}, '${element.cedula}', '${element.correoelectronico}','${element.telefono}','${element.telefonocelular}','${element.fechanacimiento}','${element.sexo}','${element.direccion}','${element.nombre}','${element.apellidopaterno}','${element.apellidomaterno}','${element.nacionalidad}','${element.idCarreras}','${element.usuario}')">Editar</button>
                    ||
                    <button class="btn btn-danger btn-sm" onclick="eliminarEstudianteModal(${element.id})">Eliminar</button>
                </td>
            </tr>`;
        tabla.append(fila);
    });
}

function crearEstudiante() {
    const estudiante = {
        id: null,
        cedula: $("#cedula").val(),
        correoelectronico: $("#correoElectronico").val(),
        telefono: $("#telefono").val(),
        telefonocelular: $("#telefonoCelular").val(),
        fechanacimiento: $("#fechaNacimiento").val(),
        sexo: $("#sexo").val(),
        direccion: $("#direccion").val(),
        nombre: $("#nombre").val(),
        apellidopaterno: $("#apellidoPaterno").val(),
        apellidomaterno: $("#apellidoMaterno").val(),
        nacionalidad: $("#nacionalidad").val(),
        idCarreras: $("#idCarreras").val(),
        usuario: "Prof Mario"
    };

    $.ajax({
        url: URL_API + "InsertarEstudiantes.php",
        method: "POST",
        data: JSON.stringify(estudiante),
        success: function (data) {
            finalizarCreacion(data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function finalizarCreacion(data) {
    $("#mensajePersonalizado").html(mensajeSuccess);
    $("#formularioCrear")[0].reset();
    bootstrap.Modal.getInstance($("#modalCrear")[0]).hide();
    obtenerEstudiantes();
}

window.editarEstudiante = function (
    id, cedula, correoelectronico, telefono, telefonocelular,
    fechanacimiento, sexo, direccion, nombre, apellidopaterno,
    apellidomaterno, nacionalidad, idCarreras, usuario
) {
    $("#ideditar").val(id);
    $("#cedulaeditar").val(cedula);
    $("#correoElectronicoeditar").val(correoelectronico);
    $("#telefonoeditar").val(telefono);
    $("#telefonoCelulareditar").val(telefonocelular);
    $("#fechaNacimientoeditar").val(fechanacimiento);
    $("#sexoeditar").val(sexo);
    $("#direccioneditar").val(direccion);
    $("#nombreeditar").val(nombre);
    $("#apellidoPaternoeditar").val(apellidopaterno);
    $("#apellidoMaternoeditar").val(apellidomaterno);
    $("#nacionalidadeditar").val(nacionalidad);
    $("#idCarreraseditar").val(idCarreras);
    $("#usuarioeditar").val(usuario);

    new bootstrap.Modal($("#modalEditar")[0]).show();
};

function actualizarEstudiante() {
    const estudiante = {
        id: $("#ideditar").val(),
        cedula: $("#cedulaeditar").val(),
        correoelectronico: $("#correoElectronicoeditar").val(),
        telefono: $("#telefonoeditar").val(),
        telefonocelular: $("#telefonoCelulareditar").val(),
        fechanacimiento: $("#fechaNacimientoeditar").val(),
        sexo: $("#sexoeditar").val(),
        direccion: $("#direccioneditar").val(),
        nombre: $("#nombreeditar").val(),
        apellidopaterno: $("#apellidoPaternoeditar").val(),
        apellidomaterno: $("#apellidoMaternoeditar").val(),
        nacionalidad: $("#nacionalidadeditar").val(),
        idCarreras: $("#idCarreraseditar").val(),
        usuario: $("#usuarioeditar").val()
    };

    $.ajax({
        url: URL_API + "ActualizarEstudiantes.php",
        method: "POST",
        data: JSON.stringify(estudiante),
        success: function (data) {
            finalizarEdicion(data);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function finalizarEdicion(data) {
    $("#mensajePersonalizado").html(mensajeSuccess);
    $("#formularioEditar")[0].reset();
    bootstrap.Modal.getInstance($("#modalEditar")[0]).hide();
    obtenerEstudiantes();
}

window.eliminarEstudianteModal = function (id) {
    $("#ideliminar").val(id);
    new bootstrap.Modal($("#modalEliminar")[0]).show();
};

function eliminarEstudiante() {
    const id = $("#ideliminar").val();

    $.ajax({
        url: URL_API + "BorrarEstudiantes.php",
        method: "POST",
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
    $("#mensajePersonalizado").html(mensajeDelete);
    $("#formularioEliminar")[0].reset();
    bootstrap.Modal.getInstance($("#modalEliminar")[0]).hide();
    obtenerEstudiantes();
}
