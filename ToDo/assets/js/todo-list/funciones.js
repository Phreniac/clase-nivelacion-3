let lista_tareas = [];
let ultimo_id_tarea = 0;
//elementos del DOM
const cuerpo_tabla = document.getElementById('cuerpo_tabla');
const agregar_tarea = document.getElementById('agregar_tarea');

//ecuchador de evento para el formulario
agregar_tarea.addEventListener('click', function(evento){
    evento.preventDefault();
});

//escuchador de evento para los checkbox
function escuchadorCheckbox(){
    document.addEventListener('DOMContentLoaded', function(){
        let lista_elementos = document.getElementsByClassName('check-box');
       
        for (let i = 0; i < lista_elementos.length; i++) {
            lista_elementos[i].addEventListener('change', function(){
                let fila = document.getElementById('fila_'+i);
                console.log('for ', fila);
                const tarea_ = lista_tareas.find(tarea => tarea.id_tarea == 'tarea_'+i);
                if(fila.classList.contains('check')){
                    fila.classList.remove('check');
                    if(tarea_ != undefined){
                        tarea_.check = false;
                    }
                }else{
                    fila.classList.add('check');
                    if(tarea_ != undefined){
                        tarea_.check = true;
                    }
                }
                localStorage.setItem('lista_tareas', JSON.stringify(lista_tareas));
                console.log(tarea_);
           });
        }
    });
}

//funcion que obtiene los valores de los inputs, agrega las tareas a un array 
//y genera un html a partir del array
function obtenerValores(){
  const nombre_tarea = document.getElementById('nombre_tarea');
  const descripcion_tarea = document.getElementById('descripcion_tarea');
  const fecha_tarea = document.getElementById('fecha_tarea');

  if(nombre_tarea.value != "" &&  fecha_tarea.value != ""){
    agregarTareas(nombre_tarea.value,descripcion_tarea.value,fecha_tarea.value);
    nombre_tarea.value = "";
    descripcion_tarea.value = "";
    fecha_tarea.value = "";
    generarHtml();
    escuchadorCheckbox();
  }else{
    alert('Por favor ingresa los datos de una tarea.');
  }
  
  console.log('lista tareas: ', lista_tareas);  
//   console.log('nombre: ', nombre_tarea.value);
//   console.log('descripcion: ', descripcion_tarea.value);
//   console.log('fecha: ', fecha_tarea.value);

}

//funcion para agregar las tareas al array, generando un objeto
function agregarTareas(nombre_tarea,descripcion_tarea,fecha_tarea){
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
    const nueva_fecha = new Date(fecha_tarea);
    const fecha_anio = nueva_fecha.getFullYear();
    const fecha_mes = meses[nueva_fecha.getMonth()];
    const fecha_dia = nueva_fecha.getDate() + 1;

    // console.log(fecha_anio, fecha_mes, fecha_dia);
    let tarea = {
        id_tarea: 'tarea_'+ultimo_id_tarea,
        nombre:nombre_tarea,
        descripcion:descripcion_tarea,
        fecha:fecha_dia+'-'+fecha_mes+'-'+fecha_anio,
        check: false
    }

    console.log('lista_tareas',lista_tareas);
    lista_tareas.push(tarea);
    ultimo_id_tarea = ultimo_id_tarea + 1;
    //se convierte la lista de tareas a un string y se guarda en el localstorage
    localStorage.setItem('lista_tareas', JSON.stringify(lista_tareas));
    localStorage.setItem('ultimo_id_tarea', ultimo_id_tarea);
}

function generarHtml(){
    // console.log('entro a generar html');
    let tb_cuerpo_contenido = '';
   for (let i = 0; i < lista_tareas.length; i++) {
    console.log(i);
    tb_cuerpo_contenido += `<tr id="fila_${i}" class="${lista_tareas[i].check ? 'check':''}"><td>${i + 1}</td>
        <td>${lista_tareas[i].nombre}</td>
        <td>${lista_tareas[i].descripcion}</td>
        <td>${lista_tareas[i].fecha}</td>
        <td><input class="check-box" id="check_${i}" type="checkbox"/></td>
        </tr>`;
   }
   cuerpo_tabla.innerHTML = tb_cuerpo_contenido;
   tacharTareas();
}
//validación de lista de tareas, si existe dentro del localstorage
function validacionLocalStorage(){
    console.log('validacion local storage');
    if(localStorage.getItem('lista_tareas') != "" && localStorage.getItem('lista_tareas') != null){
        lista_tareas = JSON.parse(localStorage.getItem('lista_tareas'));
        //console.log('encuentra la lista', lista_tareas);
    }else{
        lista_tareas = [];
    }
    if(localStorage.getItem('ultimo_id_tarea') != "" && localStorage.getItem('ultimo_id_tarea') != null){
        ultimo_id_tarea = JSON.parse(localStorage.getItem('ultimo_id_tarea'));
        //console.log('encuentra la lista', lista_tareas);
    }else{
        ultimo_id_tarea = 0;
    }
}

function tacharTareas (){
    let checkboxes = document.getElementsByClassName('check-box');
    for (let i = 0; i < lista_tareas.length; i++) {
       if(lista_tareas[i].check){
        checkboxes[i].checked = lista_tareas[i].check;
       }
    }
}

validacionLocalStorage();
generarHtml();
escuchadorCheckbox();

function validateInput(){
    const input_name = document.getElementById('nombre_tarea');
    let patron = /^\d+$/;
    // let texto = "1 hola mundo!, hola a todos";
    // let match = texto.match(patron);
    // let reemplazo = texto.replace(patron, 'Hi');

    let validacion = patron.test(input_name.value);
    // console.log('MATCH (match):', match);
    // console.log('VALIDACION (test):', validacion);
    console.log('Validación input: ', validacion);
}


