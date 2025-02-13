const url = window.location.href;
	

    // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;
	
	
function obtenerDatosUsuario() {
    let datos = { Nombres: null, Apellido: null };

let trElements = document.querySelectorAll('tr');
        let targetTr = Array.from(trElements).find(tr => {
            let span = tr.querySelector('span');
          return span && span.innerText.includes("Apellido")
        });

if (targetTr) {
            // Buscar inputs en el siguiente <tr>
            let inputElementsApe = targetTr.querySelectorAll('input');
            let inputElementsNom = targetTr.nextElementSibling.querySelectorAll('input');
         // let Apellidos = inputElementsApe[0].value
       //let Nombres = inputElementsNom[0].value
	     datos.Apellido = inputElementsApe[0].value; // Primer input para Apellido
                datos.Nombres = inputElementsNom[0].value;
        }
    return datos;
}


let datosUsuario = obtenerDatosUsuario();

let Nombres = datosUsuario.Nombres;
let Apellido = datosUsuario.Apellido;


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





const ABM = []
const checkboxButtons = document.querySelectorAll('input[type="checkbox"]');
checkboxButtons.forEach((checkButton) => {
    if (checkButton.checked) {
        const parentTd = checkButton.closest('td')
        const span = parentTd.querySelectorAll('span')
        span.forEach((textspan) => {
         let text = textspan.textContent.trim()
           if (["Alta:", "Alta","Baja", "Modificacion","Modificación", "Empadronamiento"].includes(text)) {
			    if (text.includes(":")) {
                text = text.replace(":", "");
				}
                ABM.push(text); 
                            
                console.log(ABM)
                    }
             })
    }
});


function permisos() {
    
const divs = document.querySelectorAll('div');

// Filtra los divs que contienen un span con el texto deseado
const matchingDivs = Array.from(divs).filter(div => {
    const span = div.querySelector('span');
    return span && span.textContent.trim() === "Marque la opción deseada";
});

// Obtener el primer elemento de matchingDivs
const firstDiv = matchingDivs[0];

// Extraer el texto del div interno si existe
if (firstDiv) {
    const innerDiv = firstDiv.querySelector('span > div');
    const text = innerDiv ? innerDiv.textContent.trim() : null;
    return text// "El Alta implica Usuario PNRT y Mesa de Entradas."
}
};



SCSMtemplate = "Alta / Modificación usuario en aplicación SIN IDENTIDADES"


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
	    ABM: ABM,
        permisos : permisos(),
        firma: firmante
    };

