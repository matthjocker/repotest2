//Gestión de Usuario para el Aplicativo de Servicios Eventuales

function obtenerDatos() {
const url = window.location.href;

//INFORMACION DEL USUARIO
    
    function getValueTR(texto) {
let trElements = document.querySelectorAll('tr');
    
// Buscar el <tr> que contiene el span con el texto a buscar
let targetTr = Array.from(trElements).find(tr => {
let span = tr.querySelector('span');
return span && span.innerText.includes(texto);
    });
    
    if (targetTr) {
// Obtener el primer hijo del <tr> 
let inputElement = targetTr.querySelector('input');
return inputElement ? inputElement.value : null;
    }
return null; // Devuelve null si no se encuentra el <tr>
}

// Variables de obtención de valores


let trApellido = Array.from(document.querySelectorAll('tr')).find(tr => tr.querySelector('span')?.textContent.includes('Apellido'));
let trNombres = Array.from(document.querySelectorAll('tr')).find(tr => tr.querySelector('span')?.textContent.includes('Nombres'));

let Apellido, Nombres;

if (trApellido) {
// Obtener el siguiente <tr> y los valores de los <input> dentro de él
let nextTr = trApellido.nextElementSibling;
let inputs = nextTr.querySelectorAll('input[type="text"]');
Apellido = inputs[0]?.value || ""; // Primer input corresponde a Apellido
Nombres = inputs[1]?.value || ""; // Segundo input corresponde a Nombres
}
    
    

//----------------- selectElements
    const preCuit = [];
    const postCuit = [];
const selectElements = document.querySelectorAll('select');

selectElements.forEach(select => {
const selectedOptions = select.querySelectorAll('option[selected]');
selectedOptions.forEach(option => {
const value = parseInt(option.value);
if (value >= 0 && value <= 9) {
postCuit.push(value);
} else if (value >= 20 && value <= 30) {
preCuit.push(value);
            }
        });
    });

//----------------- DNI
    

const trElements = document.querySelectorAll('tr');
    let documento = null;
    
const targetTr = Array.from(trElements).find(tr => {
const span = tr.querySelector('span');
return span && span.innerText.includes("Tipo y Número de Documento");
    });
    
    if (targetTr) {
// Encuentra el siguiente <tr> después del <tr> que contiene "Tipo y Número de Documento"
const nextTr = targetTr.nextElementSibling;
        
        if (nextTr) {
// Encuentra el primer <input> dentro del siguiente <tr>
const inputElement = nextTr.querySelector('input[type="text"]');
documento = inputElement ? inputElement.value : null;
        }
    }

//----------------- radioButtons

const radioButtons = document.querySelectorAll('input[type="radio"]');
   
    let radioOptions = [];
    let ABMRadio = []

radioButtons.forEach((radioButton) => {
if (radioButton.checked) {
const parentTd = radioButton.closest('td');
const nextTd = parentTd.nextElementSibling;
const span = nextTd.querySelector('span');
const text = span.textContent.trim()

            if (text === "Alta" || text === "Baja" || text === "Modificacion" || text === "Empadronamiento") {
ABMRadio.push(text);
                }else{

radioOptions.push(text);
                }

           



        }
    });


//-----------------------------------------------------------------------------------//
// ABM //-----------------------------------------------------------------------------------//
// PERFILES CheckBox

const checkboxButtons = document.querySelectorAll('input[type="checkbox"]');
let ABM = []; // Variable para almacenar los valores específicos
        Perfiles = []

checkboxButtons.forEach((checkButton) => {
if (checkButton.checked) {
const parentTd = checkButton.closest('td');
const nextTd = parentTd.nextElementSibling;
const span = nextTd.querySelector('span');
const text = span.textContent.trim();

// Verifica si el texto es uno de los valores especificados
                if (text === "Alta" || text === "Baja" || text === "Modificacion" || text === "Empadronamiento" || text === "Modificación") {
ABM.push(text);
                }else{

Perfiles.push(text)
                }
            }
        });


//-----------------------------------------------------------------------------------//

//Firmas 

const firmas = document.querySelectorAll('input[type="text"]');

// Expresión regular para verificar formatos de fecha comunes
const dateRegex = /^(?:\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/;

// Array para almacenar los valores defaultValue que no son fechas y no están vacíos
        let validValues = [];

// Recorrer los campos de texto para obtener el defaultValue
firmas.forEach((input) => {
// Obtener el defaultValue del campo de texto
const value = input.defaultValue.trim();

// Verificar si el valor no coincide con el formato de fecha y no está vacío
if (value && !dateRegex.test(value)) {
// Agregar el valor al array si cumple con las condiciones
validValues.push(value);
          }
        });

// Obtener el último valor que cumple con las condiciones
const firmante = validValues.length > 0 ? validValues[validValues.length - 1] : null;




    


    return {

Apellido: Apellido,
Nombres: Nombres,
preCuitOp: preCuit, 
Documento: documento,
postCuitOp: postCuit,
radio: radioOptions,
Perfiles: Perfiles,
ABM: ABM ,
ABMRadio: ABMRadio,
firma: firmante, 
        
      };
}
obtenerDatos()