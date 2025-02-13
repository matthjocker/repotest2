//use : GestionUsuarioCreditoFiscal


//fix:para competencia plena ya que no tomaba la funcion original getValueTR(texto)
//los elementos en el form de competencia plena no poseen una estructura correcta para llamarlo desde "input.title"
const url = window.location.href;
	
	const SCSMtemplate =  "Alta / Modificación usuario en aplicación"  
	
    // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;

function userDatos() {

datos = {}

// Obtener todos los elementos <tr>
    let trElements = document.querySelectorAll('tr');

    // Buscar el <tr> que contiene el <span> con el texto "Apellido"
    let targetTrIndex = -1; // Inicializa el índice
    let targetTr = Array.from(trElements).find((tr, index) => {
        let span = tr.querySelector('span');
        if (span && span.innerText.includes("Apellido")) {
            targetTrIndex = index; // Asigna el índice cuando encuentra el tr correspondiente
            return true;
        }

    });

    if (targetTrIndex !== -1) {
        // Obtén el siguiente <tr> (listatr) después del tr encontrado
        let inputElements = targetTr.querySelectorAll('input')

        
        // Verificar que se haya encontrado los inputElements
        if (inputElements.length >= 2) {
            // Asignar los valores de los inputs al objeto 'datos'
            datos.Apellido = inputElements[0].value; // Valor del primer input (Apellido)
            datos.Nombres = inputElements[1].value;   // Valor del segundo input (Nombre)
            
            // Mostrar los datos almacenados en el objeto
            console.log("Datos del usuario:", datos);
        } else {
            console.log("No se encontraron los campos de Apellido y Nombre.");
        }
    }

    return datos;
}

let datosUsuario = userDatos();
    // Variables de obtención de valores
    let Nombres = datosUsuario.Nombres
    let Apellido = datosUsuario.Apellido




//obtener documento
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
    let Perfiles = [];

    radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            const parentTd = radioButton.closest('td');
            const nextTd = parentTd.nextElementSibling;
            const span = nextTd.querySelector('span');
            const text = span.textContent.trim();

            if (["Alta", "Baja", "Modificacion", "Empadronamiento"].includes(text)) {
                ABM.push(text);
            } else if (!["Masculino", "Femenino", "si", "no", "otro valor"].includes(text)) {
                Perfiles.push(text);
            }
        }
    });

    // Perfiles CheckBox
    const checkboxButtons = document.querySelectorAll('input[type="checkbox"]');


    checkboxButtons.forEach((checkButton) => {
        if (checkButton.checked) {
            const parentTd = checkButton.closest('td');
            const nextTd = parentTd.nextElementSibling;
            const span = nextTd.querySelector('span');
            const text = span.textContent.trim();

            if (["Alta", "Baja", "Modificacion", "Modificación", "Empadronamiento"].includes(text)) {
                ABM.push(text);
            } else {
                Perfiles.push(text);
            }
        }
    });
	

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