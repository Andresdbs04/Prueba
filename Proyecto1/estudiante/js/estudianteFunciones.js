import { EstudianteModel } from "../model/estudianteModel.js";

const URL_API = "https://paginas-web-cr.com/Api/apis/";

const mensajeSuccess = `
                <div
                    class="alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                    <strong>Curso</strong> Creacion Finalizada
                </div>`;

const mensajeDelete = `
                <div
                    class="alert alert-danger alert-dismissible fade show"
                    role="alert"
                >
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                    <strong>Curso</strong> Accion Finalizada
                </div>`; 

document.addEventListener("DOMContentLoaded", () => {

    obtenerEstudiantes();

    document.getElementById("formularioCrear").addEventListener("submit", (evento) => {
        evento.preventDefault();
        crearEstudiante();
    });

    document.getElementById("formularioEditar").addEventListener("submit", (evento) => {
        evento.preventDefault();
        actualizarEstudiante();
    });

    document.getElementById("formularioEliminar").addEventListener("submit", (evento) => {
        evento.preventDefault();
        eliminarEstudiante();
    });
});


//CRUD
export function obtenerEstudiantes() {
    fetch(`${URL_API}ListaEstudiantes.php`, { method: "POST" })
    .then(response => response.json())
    .then(
        data => cargarDatos(data.data)
    )
    .catch(error => console.error(error));
}

function cargarDatos(listaEstudiantes) {
    const tabla = document.getElementById("tablaBodyEstudiante");
    tabla.innerHTML = "";

    listaEstudiantes.forEach(element => {
        let fila = `
            <tr class="">
                <td scope = "row">${element.id}</td>
                <td>${element.nombre}</td>
                <td>${element.apellidopaterno}</td>
                <td>${element.apellidomaterno}</td>
                <td>${element.cedula}</td>
                <td>${element.correoelectronico}</td>
                <td>
                    <a 
                        name=""
                        id=""
                        class="btn btn-primary"
                        onclick="editarEstudiante(${element.id}, '${element.cedula}', '${element.correoelectronico}','${element.telefono}','${element.telefonocelular}','${element.fechanacimiento}','${element.sexo}','${element.direccion}','${element.nombre}','${element.apellidopaterno}','${element.apellidomaterno}','${element.nacionalidad}','${element.idCarreras}','${element.usuario}')"
                        role="button"
                        >Editar</a
                    >
                        ||
                    <a 
                        name=""
                        id=""
                        class="btn btn-danger btn-sm"
                        onclick="eliminarEstudiante(${element.id})"
                        >Eliminar</a
                    >
                </td>
            </tr>`;
        tabla.innerHTML += fila;
    });
}

function crearEstudiante() {
    const cedula = document.getElementById("cedula").value;
    const correoelectronico = document.getElementById("correoElectronico").value;
    const telefono = document.getElementById("telefono").value;
    const telefonocelular = document.getElementById("telefonoCelular").value;
    const fechanacimiento = document.getElementById("fechaNacimiento").value;
    const sexo = document.getElementById("sexo").value;
    const direccion = document.getElementById("direccion").value;
    const nombre = document.getElementById("nombre").value;
    const apellidopaterno = document.getElementById("apellidoPaterno").value;
    const apellidomaterno = document.getElementById("apellidoMaterno").value;
    const nacionalidad = document.getElementById("nacionalidad").value;
    const idCarreras = document.getElementById("idCarreras").value;
    const usuario = 'Prof Mario'

    const nuevoEstudiante = new EstudianteModel(null, cedula, correoelectronico, telefono, telefonocelular, fechanacimiento, sexo, direccion, nombre, apellidopaterno, apellidomaterno, nacionalidad, idCarreras, usuario);

    fetch(`${URL_API}InsertarEstudiantes.php`, {
        method: "POST",
        body: JSON.stringify(nuevoEstudiante)
    })
        .then(response => response.json())
        .then(
            data => {
                finalizarCreacion(data);
            } 
        )
        .catch(error => console.error(error));
}

function finalizarCreacion(data){
    const mensajePersonalizado = document.getElementById('mensajePersonalizado');
    mensajePersonalizado.innerHTML = mensajeSuccess;

    document.getElementById('formularioCrear').reset();

    const modalCrear = bootstrap.Modal.getInstance(document.getElementById('modalCrear'));
    modalCrear.hide()

    obtenerEstudiantes();
}


window.editarEstudiante = (id, cedula, correoelectronico, telefono, telefonocelular, fechanacimiento, sexo, direccion, nombre, apellidopaterno, apellidomaterno, nacionalidad, idCarreras, usuario) => {
    document.getElementById("ideditar").value = id;
    document.getElementById("cedulaeditar").value = cedula;
    document.getElementById("correoElectronicoeditar").value = correoelectronico;
    document.getElementById("telefonoeditar").value = telefono;
    document.getElementById("telefonoCelulareditar").value = telefonocelular;
    document.getElementById("fechaNacimientoeditar").value = fechanacimiento;
    document.getElementById("sexoeditar").value = sexo;
    document.getElementById("direccioneditar").value = direccion;
    document.getElementById("nombreeditar").value = nombre;
    document.getElementById("apellidoPaternoeditar").value = apellidopaterno;
    document.getElementById("apellidoMaternoeditar").value = apellidomaterno;
    document.getElementById("nacionalidadeditar").value = nacionalidad;
    document.getElementById("idCarreraseditar").value = idCarreras;
    document.getElementById("usuarioeditar").value = usuario;

    const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    modalEditar.show();
};

function actualizarEstudiante() {
    const cedula = document.getElementById('cedulaeditar').value;
    const correoelectronico = document.getElementById("correoElectronicoeditar").value;
    const telefono = document.getElementById('telefonoeditar').value;
    const telefonocelular = document.getElementById('telefonoCelulareditar').value;
    const fechanacimiento = document.getElementById('fechaNacimientoeditar').value;
    const sexo = document.getElementById('sexoeditar').value;
    const direccion = document.getElementById('direccioneditar').value;
    const nombre = document.getElementById('nombreeditar').value;
    const apellidopaterno = document.getElementById('apellidoPaternoeditar').value;
    const apellidomaterno = document.getElementById('apellidoMaternoeditar').value;
    const nacionalidad = document.getElementById('nacionalidadeditar').value;
    const idCarreras = document.getElementById('idCarreraseditar').value;
    const usuario = document.getElementById('usuarioeditar').value;
    const id = document.getElementById('ideditar').value;

    const editarEstudiante = new EstudianteModel(id, cedula, correoelectronico, telefono, telefonocelular, fechanacimiento, sexo, direccion, nombre, apellidopaterno, apellidomaterno, nacionalidad, idCarreras, usuario);

    fetch(`${URL_API}ActualizarEstudiantes.php`, {
        method: "POST",
        body: JSON.stringify(editarEstudiante)
    })
        .then(response => response.json())
        .then(
            data => {
                finalizarEdicion(data);
            }
        )
        .catch((error) => console.error(error));
}

function finalizarEdicion(data){
      const mensajePersonalizado = document.getElementById('mensajePersonalizado');
  
      mensajePersonalizado.innerHTML = mensajeSuccess;
  
      document.getElementById('formularioEditar').reset();
  
      const modalEditar = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
      modalEditar.hide();
  
      obtenerEstudiantes();
  }

  window.eliminarEstudiante=(id)=>{
      document.getElementById('ideliminar').value = id;
  
      const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
      modalEliminar.show();
      
  }
  
  function eliminarEstudiante(){
      const id =  document.getElementById('ideliminar').value;
      //console.log(nuevoEstudiante);
      fetch (`${URL_API}BorrarEstudiantes.php`, 
          { 
              method: 'POST',
              body: JSON.stringify({id: id})
          })
          .then(response => response.json())
          .then(
              data => {
                  finalizarEliminar(data);
              }
          )
          .catch(error => console.error(error));
  }
  
  function finalizarEliminar(){
      const mensajePersonalizado = document.getElementById('mensajePersonalizado');
  
      mensajePersonalizado.innerHTML = mensajeDelete;
  
      document.getElementById('formularioEliminar').reset();
  
      const modalEliminar = bootstrap.Modal.getInstance(document.getElementById('modalEliminar'));
      modalEliminar.hide();
  
      obtenerEstudiantes();
      
  }



