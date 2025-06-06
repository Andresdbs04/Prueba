import { cursoModel } from "../model/cursoModel.js";

const URL_API = 'https://paginas-web-cr.com/Api/apis/'

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

document.addEventListener('DOMContentLoaded', () => {

    obtenerCursos();

    document.getElementById('formularioCrear').addEventListener('submit', (evento)=>{
        evento.preventDefault();
        crearCurso();
    })

    document.getElementById('formularioEditar').addEventListener('submit', (evento)=>{
        evento.preventDefault();
        actualizarCurso();
    })
    
    document.getElementById('formularioEliminar').addEventListener('submit', (evento)=>{
        evento.preventDefault();
        eliminarCurso();
    })
});

//CRUD
export function obtenerCursos() {
    //Funcion nativa que consume APIs
    fetch(`${URL_API}ListaCurso.php`, { method: 'POST' })
        .then(response => response.json())
        .then(
            data => cargarDatos(data.data)
        )
        .catch(error => console.error(error));
}

function cargarDatos(lista) {
    //console.info(lista);
    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = '';

    lista.forEach(element => {
        let fila = `
            <tr class="">
                <td scope="row">${element.id}</td>
                <td>${element.nombre}</td>
                <td>${element.descripcion}</td>
                <td>${element.tiempo}</td>
                <td>${element.usuario}</td>
                <td>
                        <a
                            name=""
                            id=""
                            class="btn btn-primary"
                            onclick="editarCurso(${element.id}, '${element.nombre}', '${element.descripcion}', '${element.tiempo}','${element.usuario}')"
                            role="button"
                            >Editar</a
                        >
                            ||
                        <a
                            name=""
                            id=""
                            class="btn btn-danger"
                            onclick="eliminarCurso(${element.id})"
                            role="button"
                            >Eliminar</a
                        >
                </td>
            </tr>
        `;
        tablaBody.innerHTML += fila;

    });
}

function crearCurso(){
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const tiempo = document.getElementById('tiempo').value;
    const usuario = 'Prof Mario';

    const nuevoCurso = new cursoModel(null, nombre,descripcion, tiempo, usuario);

    fetch(`${URL_API}InsertarCursos.php`, 
        { 
            method: 'POST', 
            body: JSON.stringify(nuevoCurso)
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

    obtenerCursos();
}

window.editarCurso = (id, nombre, descripcion, tiempo, usuario) =>{

    document.getElementById('ideditar').value = id;
    document.getElementById('nombreeditar').value = nombre;
    document.getElementById('descripcioneditar').value = descripcion;
    document.getElementById('tiempoeditar').value = tiempo;
    document.getElementById('usuarioeditar').value = usuario;
    const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
    modalEditar.show();
    
 }

  function actualizarCurso(){
     const nombre = document.getElementById('nombreeditar').value;
     const descripcion = document.getElementById('descripcioneditar').value;
     const tiempo = document.getElementById('tiempoeditar').value;
     const usuario =  document.getElementById('usuarioeditar').value;
     const id =  document.getElementById('ideditar').value;
 
 
     const editarCurso = new cursoModel(id, nombre, descripcion, tiempo, usuario);
 
     //console.log(nuevoCurso);
     fetch (`${URL_API}ActualizarCursos.php`, 
         { 
             method: 'POST',
             body: JSON.stringify(editarCurso)
         })
         .then(response => response.json())
         .then(
             data => {
                 finalizarEdicion(data);
             }
         )
         .catch(error => console.error(error));
  }

  function finalizarEdicion(data){
      const mensajePersonalizado = document.getElementById('mensajePersonalizado');
  
      mensajePersonalizado.innerHTML = mensajeSuccess;
  
      document.getElementById('formularioEditar').reset();
  
      const modalEditar = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
      modalEditar.hide();
  
      obtenerCursos();
  }

  
window.eliminarCurso=(id)=>{
    document.getElementById('ideliminar').value = id;

    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    modalEliminar.show();
    
}

function eliminarCurso(){
    const id =  document.getElementById('ideliminar').value;
    //console.log(nuevoCurso);
    fetch (`${URL_API}BorrarCursos.php`, 
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

    obtenerCursos();
    
}
  