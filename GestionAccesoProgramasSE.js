//function name(params) {
		//uso: Gestion Acceso ProgramasSE

//fix:para competencia plena ya que no tomaba la funcion original getValueTR(texto)
//los elementos en el form de competencia plena no poseen una estructura correcta para llamarlo desde "input.title"
const url = window.location.href;
	
	const SCSMtemplate =  "Alta / Modificación de permisos a movimientos o programas de Empleo"  
	
    // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;
	
function obtenerDatosUsuario(titulo) {
    let datos = { Nombres: null, Apellido: null };

    // Verifica si el título NO coincide con ciertos textos
    const competenciaPlena = [
        'Gestión de Usuario para Seguimiento',
        'Gestión de Usuario del Sistema SALD',
        'Gestión de Acceso a Programas de la Secretaría de Empleo',
        'Gestion de Usuario para el sistema COODITIA',
        'Gestión de Usuario del Sistema de Comisión de Servicios y Viáticos'
    ];

    // Caso cuando el título NO está en competencia plena
    if (!competenciaPlena.includes(titulo)) {
        // Obtener todos los <tr> y buscar el que contiene "Apellido"
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
    } 
    // Caso alternativo para competencia plena
    else {
        const textos = ["Apellido", "Nombres"];
        textos.forEach(texto => {
            // Buscar dentro de <tr> o <td> que contengan el texto
            const elements = document.querySelectorAll('tr, td');
            const targetElement = Array.from(elements).find(element => {
                const span = element.querySelector('span');
                return span && span.innerText.includes(texto);
            });

            // Si se encuentra, extraer el input asociado
            if (targetElement) {
                const inputElement = targetElement.querySelector('input');
                if (inputElement) {
                    datos[texto] = inputElement.value;
                }
            }

            // Si no lo encuentra, buscar por título de los inputs
            if (!datos[texto]) {
                const inputElements = document.querySelectorAll('input[type="text"]');
                for (let input of inputElements) {
                    if (input.title.includes(texto)) {
                        datos[texto] = input.value;
                        break;
                    }
                }
            }
        });
    }

    return datos;
}

// Uso de la función

let datosUsuario = obtenerDatosUsuario(titulo);

let Nombres = datosUsuario.Nombres;
let Apellido = datosUsuario.Apellido;

// Mostrar resultados
console.log("Nombre:", Nombres);
console.log("Apellido:", Apellido);

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

       
	//obtener Usuario de Red (Gestion Permisos PNRT / GestionAccesoProgramasSE)

function getRedUser() {
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
	   
    let RedUser = getRedUser();
    let poseeUsuarioDeRed = RedUser.usuarioRed.poseeUsuarioDeRed
	let usuarioRed = RedUser.usuarioRed.rUser
    let Displayname = RedUser.usuarioRed.displayname
	   


 //dependencia
function dependencia() {
const tds = document.querySelectorAll('tr');

for (const td of tds) {
    const span = td.querySelector('span');

    // Verifica si el texto del <span> es "Dependencia de los usuarios por los que tramitará el requerimiento:"
    if (span && span.textContent.trim() === "Dependencia de los usuarios por los que tramitará el requerimiento:") {
        // Utiliza nextElementSibling para acceder al siguiente <td>
        const nextTd = td.nextElementSibling;

        if (nextTd) {
            // Busca el elemento <select> dentro de nextTd
            const select = nextTd.querySelector('select');

            if (select) {
                // Obtén la opción seleccionada
                const selectedOption = select.options[select.selectedIndex];
                return selectedOption.textContent.trim();
            } 
        }
 
    }
}
}

const Dependencia = dependencia() 


// Inicializar un array para almacenar los resultados

// Recorre cada <ul> y extrae los datos necesarios

// Seleccionar todos los <ul> con formid="FormControl"
    //------------------------------------------------------- obtener usuarios de progama-------------------------------
const ulElements = document.querySelectorAll('li');

// Inicializar un array para almacenar los resultados
const resultados = [];

// Recorre cada <ul> y extrae los datos necesarios
ulElements.forEach((ul) => {
    // Variables para almacenar datos de este <ul>
    let Programas = [];
    let ABMTemp = [];
    let Etapas = [];
	let UsuariosProgramas = [];
    let Usuario = [];


const divs = ul.querySelectorAll("div[description]");
const regexDominio = /^[A-Za-z0-9]+\\[A-Za-z0-9]+$/; // Expresión regular para validar usuario\dominio

divs.forEach(div => {
    let datos = { username: null, displayname: null };
    //obtengo usuario de dominio
    const description = div.getAttribute("description");
    if (description && regexDominio.test(description)) {
        //obtengo nombre completo
         const displaytext = div.getAttribute("displaytext")
           datos.username = description; // Primer input para Apellido
           datos.displayname = displaytext; 
           UsuariosProgramas.push(datos);
    }

})



    // Obtener Programas
    const tds = ul.querySelectorAll('td');
    tds.forEach((td) => {
        const span = td.querySelector('span');
        if (span && span.textContent.trim() === "Programa") {
            const nextTd = td.nextElementSibling;
            if (nextTd) {
                const select = nextTd.querySelector('select');
                if (select) {
                    const programaValue = select.value;
                    Programas.push(programaValue);
                }
            }
        }
    });

    // Obtener ABM
    const selectElementsAbm = ul.querySelectorAll('select');
    selectElementsAbm.forEach((select) => {
        const selectedOptions = select.querySelectorAll('option:checked');
        selectedOptions.forEach((option) => {
            if (["Alta", "Baja", "Modificacion", "Modificación",""].includes(option.value)) {
              if (option.value == "") {
				  ABMTemp.push("ALTA")
			  }else{
			   ABMTemp.push(option.value);
			  }
            }
        });
    });

    // Obtener Etapas
    const spansWithNames = Array.from(ul.querySelectorAll('span')).filter((span) => {
        const name = span.textContent.trim();
        return [
            'Etapa:Presentación',
            'Etapa:Protocolo',
            'Etapa:Calificación',
            'Movimiento:Asignacion-Desasignacion',
            'Consultas',
            'Etapa:Evaluación',
            'Etapa:Beneficiario',
            'Etapa:Baja',
            'Movimiento:Asignacion-DesasignacionenReserva',
            'Movimiento:Modificación',
        ].includes(name);
    });

    spansWithNames.forEach((span) => {
        const previousSpan = span.previousElementSibling;
        if (previousSpan) {
            const checkbox = previousSpan.querySelector('input[type="checkbox"]:checked');
            if (checkbox) {
                Etapas.push(span.textContent.trim());
            }
        }
    });

    
//nombre y apellido	
	const pattern = /^[A-Za-z]+\\[A-Za-z]+$/;

    // Objeto de resultados finales, inicializado con valores null
    const result = { usuarioRed: {  rUser: null, displayName: null } };


    // Recorre cada <td> para buscar el estado "posee usuario de red"
  
        const spans = ul.querySelectorAll('span');

        for (const span of spans) {
         

            // Extrae los datos adicionales si el patrón coincide
            const rUser = span.getAttribute('title');
            if (rUser && pattern.test(rUser)) {
                const displayName = span.querySelector('#content')?.textContent?.trim() || null;
                result.usuarioRed.rUser = rUser;
                result.usuarioRed.displayName = displayName;
				 Usuario.push(displayName);
                break;
            }
        }

        //Autorizaciones
		
		
const Autorizacion = [];

const spansAuth = ul.querySelectorAll('span'); // Selecciona todos los <span> dentro de ul

spansAuth.forEach((span) => {
    const text = span.textContent.trim(); // Obtén el texto del <span>

  if (text.includes('Rechazado') && !Autorizacion.includes('Rechazado')) {
        Autorizacion.push('Rechazado');
    } else if (text.includes('Autorizado') && !Autorizacion.includes('Autorizado')) {
        Autorizacion.push('Autorizado');
    }
     
});



const ABM = ABMTemp.filter((valor, indice, self) => self.indexOf(valor) === indice);
	// Crear el objeto para este <ul> y agregarlo al array de resultados
    resultados.push({
        Programas,
        ABM,
        Etapas,
		UsuariosProgramas,
		Autorizacion
    });
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
		poseeUsuarioDeRed : RedUser.poseeUsuarioDeRed,
		usuarioRed : RedUser.rUser,
		Displayname : RedUser.Displayname,
        Programa: resultados,
      
       Dependencia : Dependencia ,
        firma: firmante
    };
	
	

	
//	};name()