    
	//use: FormularioCyP
	const url = window.location.href;
	
	const SCSMtemplate =  "Alta / Modificación usuario en aplicación"  
	
    // Título de la aplicación
    const getTitulo = document.querySelectorAll('input[type="text"]');
    const titulo = getTitulo[0].defaultValue;

    // Información del usuario
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
        if (inputElement) {
            return inputElement.value;
        }
    }

    // Si inputElement es null o no se encuentra el <tr>, buscar en todos los inputs de tipo text
    const inputtext = document.querySelectorAll('input[type="text"]');
    for (let input of inputtext) {
        if (input.title.includes(texto)) {
            return input.value; // Devuelve el valor del input si coincide con el texto
        }
    }

    return null; // Devuelve null si no se encuentra ninguna coincidencia
}

    // Variables de obtención de valores
    let Nombres = getValueTR("Nombres");
    let Apellido = getValueTR("Apellido");

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