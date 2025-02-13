//function name(params) {
	
	//uso: GestionUsuarioSeguimiento - GestionPNRT - SolicitudAccesoPeopleNet

//fix:para competencia plena ya que no tomaba la funcion original getValueTR(texto)
//los elementos en el form de competencia plena no poseen una estructura correcta para llamarlo desde "input.title"
const url = window.location.href;
	

	
    // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;
	
// Uso de la función

function obtenerDatosUsuario(texto) {
        let datos = {};
    const tds = document.querySelectorAll('td');

    tds.forEach(td => {
        // Buscar el <span> dentro del <td>
        const span = td.querySelector('span');

        if (span) { 
            const textoSpan = span.textContent.trim().toLowerCase(); 
            if (textoSpan.includes(texto.toLowerCase())  ) { 
                const input = td.querySelector('input'); 

                if (input) {
                    //console.log(`${textoSpan}:`, input.value.trim()); 
                    datos = input.value.trim()
                    
                }
            }
        }
    });

   return datos
}




let Nombres = obtenerDatosUsuario("Nombres");
let Apellido = obtenerDatosUsuario("Apellido");

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

       
	//obtener Usuario de Red (Gestion Permisos PNRT)

function getRedUserPNRT() {
    const pattern = /^[A-Za-z]+\\[A-Za-z]+$/;

    // Objeto de resultados finales, inicializado con valores null
    const result = { usuarioRed: { poseeUsuarioDeRed: null, rUser: null, displayName: null } };

    // Selecciona todos los elementos <td> de la tabla
    const tds = document.querySelectorAll('td');

    // Recorre cada <td> para buscar el estado "posee usuario de red"
    for (const td of tds) {
        const spans = td.querySelectorAll('span');

        for (const span of spans) {
            const input = span.querySelector('input[type="radio"]');
            const divText = span.parentElement.nextElementSibling?.querySelector('div')?.textContent?.trim();

            // Verifica si es el radio button de "si" o "no"
            if (input && input.name.includes("my:Usuario_Red")) {
                if (divText === 'Si' && input.checked) {
                    result.usuarioRed.poseeUsuarioDeRed = 'si';
                } else if (divText === 'No' && input.checked) {
                    result.usuarioRed.poseeUsuarioDeRed = 'no';
                }
            }

            // Extrae los datos adicionales si el patrón coincide
            const rUser = span.getAttribute('title');
            if (rUser && pattern.test(rUser)) {
                const displayName = span.querySelector('#content')?.textContent?.trim() || null;
                result.usuarioRed.rUser = rUser;
                result.usuarioRed.displayName = displayName;
                break;
            }
        }

        // Si ya tenemos un usuario de red, salimos del bucle principal
        if (result.usuarioRed.rUser) break;
    }

    return result;
}

console.log(getRedUserPNRT());

function getRedUserSECLO(){
	const tds = document.querySelectorAll('td');

for (const td of tds) {
    const span = td.querySelector('span');

    // Verifica si el texto del <span> es "Ingrese su nombre de usuario:"
    if (span && span.textContent.trim() == "Ingrese nombre de usuario:") {
        // Utiliza nextElementSibling para acceder al siguiente <td>
        const nextTd = td.nextElementSibling;
        const input = nextTd?.querySelector('input[type="text"]');
        const username = input?.value;

      return username // Muestra el valor del usuario, e.g., "VMUNOZ"
       // Detiene la búsqueda si encontró el usuario
    }
}
	
}
	   
    let RedUser = getRedUserPNRT();
    let poseeUsuarioDeRed = RedUser.usuarioRed.poseeUsuarioDeRed
	let usuarioRed = RedUser.usuarioRed.rUser
    let Displayname = RedUser.usuarioRed.displayname
	   
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
	
	let SCSMtemplate = [];


const validABM = ["Alta", "Modificación", "Modificacion"];
if (validABM.includes(ABM[0])) {
    // Verificar si el título es específico para PeopleNet
    if (titulo === "Solicitud de Acceso para la Aplicación PeopleNet") {
        SCSMtemplate.push("Alta / Modificación usuario en aplicación SIN IDENTIDADES");
    } else {
        SCSMtemplate.push("Alta / Modificación usuario en aplicación");
    }
} else if (ABM === "Baja") {
    SCSMtemplate.push("Deshabilitar acceso a aplicativos");
}
		
		

    return {
		scsmTemplate : SCSMtemplate,
        titulo: titulo,
        Apellido: Apellido,
        Nombres: Nombres,
        preCuitOp: preCuit,
        Documento: Documento,
        postCuitOp: postCuit,
		poseeUsuarioDeRed : RedUser.poseeUsuarioDeRed,
		usuarioRed : RedUser.rUser,
		Displayname : RedUser.Displayname,
        Perfiles: Perfiles,
        ABM: ABM,
        firma: firmante,
    };
	
	
//	};name()