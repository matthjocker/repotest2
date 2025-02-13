
//function name(params) {
	
const url = window.location.href;
	

	
    // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;
	
let datos = { Nombres: null, Apellido: null };
let trElements = document.querySelectorAll('tr');
        let targetTr = Array.from(trElements).find(tr => {
            let span = tr.querySelector('span');
            return span && span.innerText.includes("Apellido");
        });

        if (targetTr && targetTr.nextElementSibling) {
            // Buscar inputs en el siguiente <tr>
            let inputElements = targetTr.nextElementSibling.querySelectorAll('input');
            if (inputElements.length >= 2) {
                datos.Apellido = inputElements[0].value; // Primer input para Apellido
                datos.Nombres = inputElements[1].value;  // Segundo input para Nombres
            }
        }


//DNI

    const inputElements = document.querySelectorAll('input[type="text"]');
    const documentoRegex = /^(\d{2}\.\d{3}\.\d{3}|\d{8})$/;
    
    let Documento = null; // Declarar variable fuera del bucle
    
    for (const dni of inputElements) {
        if (documentoRegex.test(dni.value)) {
            Documento = dni.value; // Asignar el valor a la variable externa
            break; // Sale del bucle al encontrar el primer valor válido
        } else {
            console.log(`El valor no es un documento válido.`);
        }
    }

// Select elements
let preCuit = null;
let postCuit = null; // Inicializar como null para almacenar solo un valor
const selectElements = document.querySelectorAll('select');

for (const select of selectElements) {
    const selectedOptions = select.querySelectorAll('option[selected]');
    for (const option of selectedOptions) {
        const value = parseInt(option.value);
        if (value >= 0 && value <= 9 && postCuit === null) {
            postCuit = value; // Almacena solo el primer valor válido
        } else if (value >= 20 && value <= 30  && preCuit === null) {
            preCuit = value;
        }

        if (postCuit !== null) break; // Sale del bucle si ya encontró un valor
    }

    if (postCuit !== null) break; // Sale del bucle principal si ya encontró un valor
}

const divs = document.querySelectorAll("div[description]");
const regexDominio = /^[A-Za-z0-9]+\\[A-Za-z0-9]+$/; // Expresión regular para validar usuario\dominio
const redUser = [];

divs.forEach(div => {
    const description = div.getAttribute("description");
    if (description && regexDominio.test(description)) {
        redUser.push(description);
    }
})// Obtener el valor de "description"

//numero de pc
const span = Array.from(document.querySelectorAll('span')).find(el => 
    el.textContent.trim() === "Ingrese la cuenta para la que se requieren privilegios avanzados:"
);

// Encontrar el <tbody> más cercano
const closestTbody = span.closest('tbody');

// Obtener el primer input que cumpla con las condiciones
const inputWithSpecificValue = closestTbody 
    ? Array.from(closestTbody.querySelectorAll('input')).find(input => 
        /^\d{4,6}$|^[A-Za-z]{2}\d{4,6}$|^[A-Za-z]{3}\d{4,6}$/.test(input.value) // Dos letras seguidas de 4-6 dígitos
      )
    : null;

// Obtener el valor del input si se encuentra
const equipo = inputWithSpecificValue?.value || null;

console.log(equipo);




//fechas

function textFechas(texto) {
    const span = Array.from(document.querySelectorAll('span')).find(el => 
    el.textContent.trim() === texto
)
 const input = span.querySelectorAll('input')

    return input[0].value

    }
	
	
	let fechaInicio = textFechas("Fecha de Inicio:")
let fechaFin = textFechas("Fecha de Fin:")
console.log(fechaInicio)
console.log(fechaFin)




function getTextContent(texto) {
const tr = Array.from(document.querySelectorAll('tr')).find(elementos => 
    elementos.textContent.trim() === texto);

textContent = tr.nextElementSibling.textContent
 return textContent
}
let justificacion = getTextContent("Justificación del requerimiento: describa las tareas a realizar, que requieren privilegios avanzados para poder llevarlas a cabo:")
 
 let software = getTextContent("Indique el nombre del software que requiere privilegios avanzados para su correcto funcionamiento:")




	
    const radioButtons = document.querySelectorAll('input[type="radio"]');
     let ABM = [];
    let Perfiles = [];

    radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            const parentTd = radioButton.closest('td');
            const nextTd = parentTd.nextElementSibling;
            const span = nextTd.querySelector('span');
            const text = span.textContent.trim();

            if (["Alta", "Baja", "Modificacion","Modificación", "Empadronamiento"].includes(text)) {
                ABM.push(text);
            } else if (!["Masculino", "Femenino", "Si", "No","si", "no", "otro valor"].includes(text)) {
                Perfiles.push(text);
            }
        }
    });

// Perfiles CheckBox
const checkboxButtons = document.querySelectorAll('input[type="checkbox"]');

checkboxButtons.forEach((checkButton) => {
    if (checkButton.checked) {
        const parentTd = checkButton.closest('td'); // Encuentra el TD que contiene el checkbox
        const nextTd = parentTd.nextElementSibling; // Encuentra el siguiente TD

        // Obtén el texto completo del TD (incluye todos los nodos de texto dentro del TD)
        const text = nextTd.textContent.trim();

        if (["Alta", "Baja", "Modificacion", "Modificación", "Empadronamiento"].includes(text)) {
            ABM.push(text);
        } else if (text.includes("Caratulador DNAS")) { 
            Perfiles.push(text); // Agrega el texto al array Perfiles si incluye "Caratulador DNAS"
        } else {
            Perfiles.push(text);
        }
    }
});

	let SCSMtemplate = [];
	
const validABM = ["Alta", "Modificación", "Modificacion"];
if (validABM.includes(ABM[0])) {
    // Verificar si el título es específico para PeopleNet
    if (titulo === "Solicitud de Acceso para la Aplicación PeopleNet") {
        SCSMtemplate.push("Alta / Modificación usuario en aplicación SIN IDENTIDADES");
    } else {
        SCSMtemplate.push("Modificación cuenta de red para VPN o Administrador Local");
    }
} else if (ABM === "Baja") {
    SCSMtemplate.push("Deshabilitar acceso a aplicativos");
}
		
    // Firmas
    const firmas = document.querySelectorAll('input[type="text"]');
    const dateRegex = /^(?:\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/;
    let validValues = [];

    firmas.forEach((input) => {
        const value = input.defaultValue.trim();
        if (value && !dateRegex.test(value)) {
            validValues.push(value);
        }
    });

    const firmante = validValues.length > 0 ? validValues[validValues.length - 1] : null;

    return {
		scsmTemplate : SCSMtemplate,
        titulo: titulo,
        Apellido: datos.Apellido,
        Nombres: datos.Nombres,
        nombreCompleto: datos.Nombres + " " +datos.Apellido,
        preCuitOp: preCuit,
        Documento: Documento,
        postCuitOp: postCuit,
		justificacion :justificacion,
		software : software,
        ABM: ABM,
        firma: firmante,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        equipo: equipo,
        redUser: redUser,
    };
	
	
//};name()


/*
Para cursarse la solicitud se requiere:
1 - Juan Ignacio Pocovi
2 - JPOCOVI
3 - PC13118
Fecha de Inicio:
24/01/2025

Fecha de Fin:
24/01/2026

Con solicitud aprobada por hcalvi se solicita Desarrollo de aplicativos de escritorio, desarrollo de aplicativos web, desarrollo de soluciones APP para Android. Prueba de aplicativos, procesamiento, ejecución local de diferentes versiones de sistema SIRADE, EIL2, ENAPROSS, EIL Online, Sincronización de datos a través de WEB Services, transformación de datos mediante Integration Services. Diseño gráfico para web, formularios, publicaciones y presentaciones.
Visual Studio .NET 2022, Visual Studio .NET 2010, Visual Studio Code y sus complementos. Android Studio, SQL Server 2008/2012/2016, sistema SIRADE, sistema EIL2, sistema EILONLINE, controles de terceros (TELERIK y otros) Entorno QGis.
*/