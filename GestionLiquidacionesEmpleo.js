//function name(params) {
    //los elementos en el form de competencia plena no poseen una estructura correcta para llamarlo desde "input.title"
const url = window.location.href;
	

    // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;
	
	
let datos = { Nombres: null, Apellido: null };
const textos = ["Apellido", "Nombres"];

textos.forEach((texto) => {
    // Buscar las filas que contienen el texto
    const rows = document.querySelectorAll('tr');
    rows.forEach((row) => {
        const span = row.querySelector('span div');
        if (span && span.innerText.includes(texto)) {
            // Seleccionar la segunda celda (posición 1) de la fila actual
            const targetCell = row.querySelectorAll('td')[1];
            if (targetCell) {
                const input = targetCell.querySelector('input');
                if (input && input.value) {
                    datos[texto] = input.value;
                }
            }
        }
    });
});


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


function dependencia() {
    // Obtén todos los elementos <select>
    const selects = document.querySelectorAll('select');

    if (selects.length > 0) {
        // Toma el último <select> de la lista
        const lastSelect = selects[selects.length - 1];

        // Obtén la opción seleccionada
        const selectedOption = lastSelect.options[lastSelect.selectedIndex];
        
        // Devuelve el texto de la opción seleccionada
        return selectedOption.textContent.trim();
    }

    // Devuelve null si no se encuentran elementos <select>
    return null;
}

const Dependencia = dependencia();

//ABM

    const radioButtons = document.querySelectorAll('input[type="radio"]');
     let ABM = [];
    let Perfiles = [];

    radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            const parentTd = radioButton.closest('td');
            const prevTd = parentTd.previousElementSibling;
            const span = prevTd.querySelector('span');
            const text = span.textContent.trim();

            if (["Alta", "Baja", "Modificacion","Modificación", "Empadronamiento"].includes(text)) {
                ABM.push(text);
            } else if (!["Masculino", "Femenino", "Si", "No","si", "no", "otro valor"].includes(text)) {
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
let SCSMtemplate = []
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
        Apellido: datos.Apellido,
        Nombres: datos.Nombres,
        preCuitOp: preCuit,
        Documento: Documento,
        postCuitOp: postCuit,
	
		
		ABM: ABM,
      
       Dependencia : Dependencia ,
        firma: firmante
    };
	
	
	
	
	
//};name()