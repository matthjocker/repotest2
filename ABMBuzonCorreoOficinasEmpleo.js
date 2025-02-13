//Uso: $plantilla = Get-Content D:\powershell\webscrap\ABMBuzonCorreoOficinasEmpleo.js -Raw -Encoding UTF8

//template de service manager
const SCSMtemplate =  "Alta / Modificación cuenta genérica OE/UE"    
  // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;
	
	
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
    let nombreOE = getValueTR("Nombre OE");
    let Coordinador = getValueTR("Apellido Coordinador");
    let Muncipio = getValueTR("Muncipio");
    let MailCoordinador = getValueTR("Mail Coordinador");
    let TelCoordinador = getValueTR("Teléfono Coordinador");
    let CuilCoordinador = getValueTR("Cuil Coordinador");
    let DireccionOE = getValueTR("Dirección OE");
    let ApellidoCoordinador = getValueTR("Apellido Coordinador");
    let TelefonoOE = getValueTR("Teléfono OE");
    let Correo = getValueTR("Ingrese el Buzón de Correo");

 const checkboxButtons = document.querySelectorAll('input[type="checkbox"]')
 let ABM = null

	checkboxButtons.forEach((checkButton) => {
		if (checkButton.checked) {
			const parentTd = checkButton.closest('td');
			const nextTd = parentTd.nextElementSibling;
			const span = nextTd.querySelector('span');
			const text = span.textContent.trim();

			// Comprobar el valor de text y devolver el resultado correspondiente
			if (text === "Rehabilitación / Forzado de Password") {
				console.log("Modificación");
				return ABM = "Modificación";
			} else if (text === "Creación") {
				console.log("Alta");
				return ABM = "Alta";
			} else if (text === "Baja") {
				console.log("Baja");
				return ABM = "Baja";
			} else {
				console.log("Texto no reconocido");
				return "Texto no reconocido"; // Caso por defecto
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
    const usuarioAfectado = validValues.length > 1 ? validValues[validValues.length - 2] : null;

    // Provincia
    const selectElements = document.querySelectorAll('select');
    let provincia = [];

    for (let select of selectElements) {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption && selectedOption.value) {
            provincia.push(selectedOption.value);
        }
    }

    // Devolver valores en un objeto
 
  return {
	scsmTemplate : SCSMtemplate,

        titulo: titulo,
        nombreOE: nombreOE,
        Coordinador: Coordinador,
        Muncipio: Muncipio,
        MailCoordinador: MailCoordinador,
        TelCoordinador: TelCoordinador,
        CuilCoordinador: CuilCoordinador,
        DireccionOE: DireccionOE,
        ApellidoCoordinador: ApellidoCoordinador,
        Provincia: provincia[0] || null,
        ABM: ABM,
        TelefonoOE: TelefonoOE,
        firma: firmante,
        Correo: Correo,
        usuarioAfectado: usuarioAfectado
    };


// Llamada a la función para obtener los datos
