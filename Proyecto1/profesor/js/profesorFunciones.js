import { ProfesorModel } from "../model/profesorModel.js";

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
                    <strong>Profesor</strong> Creacion Finalizada
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
                    <strong>Profesor</strong> Accion Finalizada
                </div>`; 

document.addEventListener("DOMContentLoaded", () => {

    obtenerProfesor();

    document.getElementById("formularioCrear").addEventListener("submit", (evento) => {
        evento.preventDefault();
        crearProfesor();
    });

    document.getElementById("formularioEditar").addEventListener("submit", (evento) => {
        evento.preventDefault();
        actualizarProfesor();
    });

    document.getElementById("formularioEliminar").addEventListener("submit", (evento) => {
        evento.preventDefault();
        eliminarProfesor();
    });
});


//CRUD
export function obtenerProfesor() {
    fetch(`${URL_API}ListaProfesores.php`, { method: "POST" })
    .then(response => response.json())
    .then(
        data => cargarDatos(data.data)
    )
    .catch(error => console.error(error));
}

function cargarDatos(ListaProfesores) {
    const tabla = document.getElementById("tablaBodyProfesor");
    tabla.innerHTML = "";

    ListaProfesores.forEach(element => {
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
                        onclick="editarProfesor(${element.id}, '${element.cedula}', '${element.correoelectronico}','${element.telefono}','${element.telefonocelular}','${element.fechanacimiento}','${element.sexo}','${element.direccion}','${element.nombre}','${element.apellidopaterno}','${element.apellidomaterno}','${element.idCarreras}','${element.usuario}','${element.nacionalidad}')"
                        role="button"
                        >Editar</a
                    >
                        ||
                    <a 
                        name=""
                        id=""
                        class="btn btn-danger btn-sm"
                        onclick="eliminarProfesor(${element.id})"
                        >Eliminar</a
                    >
                </td>
            </tr>`;
        tabla.innerHTML += fila;
    });
}

function crearProfesor() {
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
    const idCarreras = document.getElementById("idCarreras").value;
    const usuario = 'Prof Mario'
    const nacionalidad = document.getElementById("nacionalidad").value;

    const nuevoProfesor = new ProfesorModel(null, cedula, correoelectronico, telefono, telefonocelular, fechanacimiento, sexo, direccion, nombre, apellidopaterno, apellidomaterno, idCarreras, usuario, nacionalidad);

    fetch(`${URL_API}InsertarProfesores.php`, {
        method: "POST",
        body: JSON.stringify(nuevoProfesor)
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

    obtenerProfesor();
}


window.editarProfesor = (id, cedula, correoelectronico, telefono, telefonocelular, fechanacimiento, sexo, direccion, nombre, apellidopaterno, apellidomaterno, idCarreras, usuario, nacionalidad) => {
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
    document.getElementById("idCarreraseditar").value = idCarreras;
    document.getElementById("usuarioeditar").value = usuario;
    document.getElementById("nacionalidadeditar").value = nacionalidad;

    const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    modalEditar.show();
};

function actualizarProfesor() {
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
    const idCarreras = document.getElementById('idCarreraseditar').value;
    const usuario = document.getElementById('usuarioeditar').value;
    const id = document.getElementById('ideditar').value;
    const nacionalidad = document.getElementById('nacionalidadeditar').value;

    const editarProfesor = new ProfesorModel(id, cedula, correoelectronico, telefono, telefonocelular, fechanacimiento, sexo, direccion, nombre, apellidopaterno, apellidomaterno, idCarreras, usuario, nacionalidad);

    fetch(`${URL_API}ActualizarProfesores.php`, {
        method: "POST",
        body: JSON.stringify(editarProfesor)
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
  
      obtenerProfesor();
  }

  window.eliminarProfesor=(id)=>{
      document.getElementById('ideliminar').value = id;
  
      const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
      modalEliminar.show();
      
  }
  
  function eliminarProfesor(){
      const id =  document.getElementById('ideliminar').value;
      //console.log(nuevoProfesor);
      fetch (`${URL_API}BorrarProfesores.php`, 
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
  
      obtenerProfesor();
      
  }



