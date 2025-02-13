//function name(params) {

//uso: FormularioGIP

const url = window.location.href;
	
	const SCSMtemplate =  "Alta / Modificación usuario en aplicación"  
	
    // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;

	// Función unificada para buscar valores asociados a "Apellido" y "Nombres"
function getValuesFromPage() {
    const result = { Apellido: null, Nombres: null };
    const textos = ["Apellido", "Nombres"];

    textos.forEach((texto) => {
        // Buscar dentro de <tr> o <td> que contengan el texto
        const elements = document.querySelectorAll('tr, td');
        const targetElement = Array.from(elements).find((element) => {
            const span = element.querySelector('span');
            return span && span.innerText.includes(texto);
        });

        // Si encuentra un <tr> o <td> válido, busca el <input> asociado
        if (targetElement) {
            const inputElement = targetElement.querySelector('input');
            if (inputElement) {
                result[texto] = inputElement.value;
                return; // Continúa con el siguiente texto
            }
        }

        // Si no lo encuentra, busca en todos los inputs tipo texto
        const inputElements = document.querySelectorAll('input[type="text"]');
        for (let input of inputElements) {
            if (input.title.includes(texto)) {
                result[texto] = input.value;
                return; // Continúa con el siguiente texto
            }
        }
    });

    return result;
}

// Uso de la función unificada
const datosUsuario = getValuesFromPage();
const Nombres = datosUsuario.Nombres;
const Apellido = datosUsuario.Apellido;

// Mostrar resultados
console.log("Nombre:", Nombres);
console.log("Apellido:", Apellido);


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
	
	
	
	
	   // Radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
     let ABM = [];


    radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            const parentTd = radioButton.closest('td');
            const nextTd = parentTd.previousElementSibling
            const span = nextTd.querySelector('span');
            const text = span.textContent.trim();

            if (["Alta", "Baja", "Modificacion","Modificación"].includes(text)) {
                ABM.push(text);
            } 
        }
    });ABM

    // Perfiles 
	const divs = document.querySelectorAll('div');
let tablaTitulo = null;
const Perfiles = [];

// Buscar el <div> que contiene el texto deseado
divs.forEach(div => {
    if (div.textContent.includes("Procesos de Consultas de situación de Personas")) {
        tablaTitulo = div;
    }
});

if (tablaTitulo) {
    // Subir en el DOM hasta encontrar la tabla que lo contiene
    const table = tablaTitulo.closest('table');

    if (table) {
        // Buscar las filas del <tbody>
        const rows = table.querySelectorAll('tbody tr');

        // Extraer datos y filtrar valores relevantes
        const data = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td div');
            return Array.from(cells).map(cell => cell.textContent.trim());
        });

        // Filtrar las filas desde el índice 2 en adelante y concatenar valores de los índices 3 y 4
        const filteredData = data.slice(2).map(subArray => {
            const value = `${subArray[3]} ${subArray[4]}`.trim();
            return value;
        });

        // Añadir los valores concatenados a Perfiles
        filteredData.forEach(item => {
            if (item) Perfiles.push(item);
        });

        console.log('Perfiles:', Perfiles);
    } 

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
        Apellido: Apellido,
        Nombres: Nombres,
        preCuitOp: preCuit,
        Documento: Documento,
        postCuitOp: postCuit,
        Perfiles: Perfiles,
        ABM: ABM,
		firma: firmante,
    };
	
	
//};name()
	
