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
}; getRedUser()


function getRedUser() {
//GestionUsuarioSistemaSECLO

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
};getRedUser()
