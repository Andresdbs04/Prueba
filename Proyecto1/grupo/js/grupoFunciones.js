import { GrupoModel } from "../model/GrupoModel.js";

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
                    <strong>Grupo</strong> Creacion Finalizada
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
                    <strong>Grupo</strong> Accion Finalizada
                </div>`; 

document.addEventListener('DOMContentLoaded', () => {

    obtenerGrupo();

    document.getElementById('formularioCrear').addEventListener('submit', (evento)=>{
        evento.preventDefault();
        crearGrupo();
    })

    document.getElementById('formularioEditar').addEventListener('submit', (evento)=>{
        evento.preventDefault();
        actualizarGrupo();
    })
    
    document.getElementById('formularioEliminar').addEventListener('submit', (evento)=>{
        evento.preventDefault();
        eliminarGrupo();
    })
});

//CRUD
export function obtenerGrupo() {
    //Funcion nativa que consume APIs
    fetch(`${URL_API}ListaGrupo.php`, { method: 'POST' })
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
                <td>
                        <a
                            name=""
                            id=""
                            class="btn btn-primary"
                            onclick="editarGrupo(${element.id}, '${element.nombre}')"
                            role="button"
                            >Editar</a
                        >
                            ||
                        <a
                            name=""
                            id=""
                            class="btn btn-danger"
                            onclick="eliminarGrupo(${element.id})"
                            role="button"
                            >Eliminar</a
                        >
                </td>
            </tr>
        `;
        tablaBody.innerHTML += fila;

    });
}

function crearGrupo(){
    const nombre = document.getElementById('nombre').value;

    const nuevoGrupo = new GrupoModel(null, nombre);

    fetch(`${URL_API}InsertarGrupo.php`, 
        { 
            method: 'POST', 
            body: JSON.stringify(nuevoGrupo)
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

    obtenerGrupo();
}

window.editarGrupo = (id, nombre) =>{

    document.getElementById('ideditar').value = id;
    document.getElementById('nombreeditar').value = nombre;
    const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
    modalEditar.show();
    
 }

  function actualizarGrupo(){
     const id = document.getElementById('ideditar').value;
     const nombre = document.getElementById('nombreeditar').value;
 
 
     const editarGrupo = new GrupoModel(id, nombre);
 
     //console.log(nuevoGrupo);
     fetch (`${URL_API}ActualizarGrupo.php`, 
         { 
             method: 'POST',
             body: JSON.stringify(editarGrupo)
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
  
      obtenerGrupo();
  }

  
window.eliminarGrupo=(id)=>{
    document.getElementById('ideliminar').value = id;

    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    modalEliminar.show();
    
}

function eliminarGrupo(){
    const id =  document.getElementById('ideliminar').value;
    //console.log(nuevoGrupo);
    fetch (`${URL_API}BorrarGrupo.php`, 
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

    obtenerGrupo();
    
}
  