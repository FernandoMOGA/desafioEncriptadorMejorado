// Variables
var body = document.querySelector('body');
var input = document.querySelector('.inputMensaje');
var buttonCodificar = document.querySelector('.codificar');
var buttonDecofidicar = document.querySelector('.decodificar');
var contenedorMensajes = document.querySelector('.contenedorMensajes');
var historial = document.querySelector('.icon-historial');
var contenidoHistorial = document.querySelector('.historial-contenido');
var consolaHistorial = document.querySelector('.historial');
var error = document.querySelector('.error');
var array = [];
var mensajeUp;
var continuar = false;
var presentacionIcon = document.querySelector('.presentacionIcon');
var presentacion = document.querySelector('.presentacion');
var redesIcon = document.querySelector('.redesIcon');
var redes = document.querySelector('.redes');
var closeHistorial = document.querySelector('.closeHistorial');


// Evento para agregar elementos a la consola del historial con el buttonCodificar
buttonCodificar.addEventListener('click', addMensaje);
// Evento para agregar elementos a la consola del historial con el buttonDecodificar
buttonDecofidicar.addEventListener('click', addMensaje);

function consolaError(e){
    error.classList.remove('display');
    setTimeout(function(){
        error.classList.add('display');
    }, e)
}

body.addEventListener('click', eliminarPestañas);
// Funcion para eliminar pestañas
function eliminarPestañas(e) {
    if (e.target.classList == "inputMensaje") {
        redes.classList.add('display');
        consolaHistorial.classList.add('display');
        presentacion.classList.add('display');
    }
}

// Funcion para agregar mensaje a historia
function addMensaje(e) {
    redes.classList.add('display');
    consolaHistorial.classList.add('display');
    presentacion.classList.add('display');
    validarTextoVacio(input)


    if (continuar) {
        if (e.target.classList.contains('codificar')) {
            mensajeUp = (codificarCadena(input));
            addElementos(mensajeUp)
        } else if (e.target.classList.contains('decodificar')) {
            mensajeUp = (decodificarCadena(input));
            addElementos(mensajeUp)
        }
    }
}

// Funcion para codificar el texto
function codificarCadena(inputString) {
    let nuevoString = inputString.value.replace(/e/g, 'enter');
    nuevoString = nuevoString.replace(/i/g, 'imes');
    nuevoString = nuevoString.replace(/a/g, 'ai');
    nuevoString = nuevoString.replace(/o/g, 'ober');
    nuevoString = nuevoString.replace(/u/g, 'ufat');
    return nuevoString;
}
// Funcion para decodificar el texto
function decodificarCadena(inputString) {
    let nuevoString = inputString.value.replace(/ufat/g, 'u');
    nuevoString = nuevoString.replace(/ober/g, 'o');
    nuevoString = nuevoString.replace(/ai/g, 'a');
    nuevoString = nuevoString.replace(/imes/g, 'i');
    nuevoString = nuevoString.replace(/enter/g, 'e');
    return nuevoString;
}

// Funcion que valida que el texto no este vacio
function validarTextoVacio(valor) {
    if (valor.value.trim() === '') {
        consolaError(3000);
        continuar = false;
        return;
    }

    validarCaracteresEspeciales(input);
}

// Funcion que valida si tiene caracteres especiales
function validarCaracteresEspeciales(valor) {
    var expresionRegular = /^[a-z\s]+$/;
    if (!expresionRegular.test(valor.value)) {
        consolaError(3000);
        continuar = false;
        return
    } else {
        continuar = true;
    }
}


// Funcion para agregar elementos a la consola de historial
function addElementos(valor) {
    addElementosConsola(valor);

    contenidoHistorial.innerHTML = ''; // Limpiar la consola del historial
    var objetoMensaje = {}
    objetoMensaje.mensaje = valor;
    objetoMensaje.id = Date.now();
    array.push(objetoMensaje);



    array.forEach(function (elemento) {
        var historia = document.createElement('div');
        historia.classList.add('historial-historia');
        historia.classList.add(elemento.id);
        historia.innerHTML = `
                <img id="${elemento.id}" class="delet" src="./img/close-ellipse-svgrepo-com.svg" alt="">
                <p>${elemento.mensaje}</p>
                <img class="imgCopi" src="./img/copy-svgrepo-com.svg" alt="">
        `
        contenidoHistorial.appendChild(historia); // Se agrega al contenidoHistoria
    })
    input.value = '';
}


// Borrar elementos con el buttonEliminar
body.addEventListener('click', borrarMensaje);

function borrarMensaje(e) {
    if (e.target.classList.contains('delet')) {
        var idBorrar = parseInt(e.target.id);

        // Filtrar el array para obtener los elementos que no coincidan con el idBorrar
        array = array.filter(function (elemento) {
            return elemento.id !== idBorrar;
        });

        // Eliminar el elemento del DOM
        var elementoAEliminar = document.getElementById(idBorrar);
        if (elementoAEliminar) {
            elementoAEliminar.parentNode.remove();
        }
    }
}

// Funcion para agregar valores a la consola principal
function addElementosConsola(valor) {
    var mensajeConsolaMain = document.createElement('div');
    mensajeConsolaMain.classList.add('mensaje');
    mensajeConsolaMain.innerHTML = `
            <p>${valor}</p>
            <img class="imgCopy imgCopi" src="./img/copy-svgrepo-com.svg" alt="img-copy">
    `
    contenedorMensajes.appendChild(mensajeConsolaMain);
}

// Funcion para obtener el valor al momento de querer copiar el texto
body.addEventListener('click', copiar);
function copiar(e) {
    if (e.target.classList.contains('imgCopi')) {
        var papalote = e.target.previousElementSibling;
        var consonante = papalote.innerText;
        navigator.clipboard.writeText(consonante); // API usada para copiar el valor de consonate
    }
}

// Funcion para la consola de presentacion

presentacionIcon.addEventListener('click', consolaPresentacion);
function consolaPresentacion() {
    presentacion.classList.toggle('display')
    redes.classList.add('display');
    consolaHistorial.classList.add('display');
}






// Funcion para la consola de redes


redesIcon.addEventListener('click', consolaSocial);

function consolaSocial() {
    redes.classList.toggle('display');
    consolaHistorial.classList.add('display');
    presentacion.classList.add('display');
}




// Funcion para la consola del Historial


historial.addEventListener('click', consolaHis);
closeHistorial.addEventListener('click', removeHis);
function consolaHis() {
    redes.classList.add('display');
    consolaHistorial.classList.remove('display');
    presentacion.classList.add('display');
}
function removeHis() {
    consolaHistorial.classList.add('display');
}