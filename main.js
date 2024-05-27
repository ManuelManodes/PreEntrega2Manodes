// En primera instancia se declara un constructor para crear objetos de tipo 'Apoderado'
const Apoderado = function(rut, nombre, apellido, telefono, mail, nombreAlumno) {
    this.rut = rut;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.mail = mail;
    this.nombreAlumno = nombreAlumno;
}

// Luego se declara una variable a la cual se le asigna un array, para ser utilizado en el ejemplo
let apoderados = [
    new Apoderado("12345677-9", "Manuel", "Manodes", 12345678, "correo@correo.cl", "Juanito"),
    new Apoderado("98765432-1", "María", "Perez", 87654321, "maria@correo.cl", "Pepito"),
    new Apoderado("11223344-5", "José", "Santos", 11223344, "jose@correo.cl", "Anita"),
    new Apoderado("55667777-9", "Luisa", "Martinez", 55667788, "luisa@correo.cl", "Carlitos")
];

// Así mismo, se declara un array para los 'alumnos'
let alumnos = ["Juanito", "Pepito", "Anita", "Carlitos", "Martín", "Valentina"];

// Variable global para almacenar el último valor ingresado o buscado
let ultimoValorIngresado = "";

// Función para mostrar el menú y manejar la selección del usuario
function mostrarMenu() {
    const menu = `¡Hola! Bienvenido a nuestra plataforma de autoservicio para la gestión y consulta de información.\n 
¿Qué te gustaría hacer hoy? Por favor, selecciona una de las siguientes opciones:\n
    1. Registrar nuevo apoderado
    2. Consultar información existente
    3. Salir`;

    let opcion = prompt(menu);
    
    if (opcion !== null) {
        opcion = opcion.trim();
        switch(opcion) {
            case '1':
                agregarApoderado();
                break;
            case '2':
                buscarApoderado();
                break;
            case '3':
                alert("¡Gracias por usar nuestra plataforma! Esperamos verte de nuevo muy pronto.");
                break;
            default:
                alert("Opción no válida. Por favor, intente de nuevo.");
                mostrarMenu(); // Vuelve a mostrar el menú si la opción es inválida
                break;
        }
    }
}

// Añadir un event listener para que se ejecute la función del menú al cargar la página
window.addEventListener('load', function() {
    mostrarMenu();
});

// En esta función se valida que todos los campos tengan datos
// Si alguno no se ha completado, se devuelve un alert.
function validarDatos(rut, nombre, apellido, telefono, mail, nombreAlumno) {
    if (!rut || !nombre || !apellido || !telefono || !mail || !nombreAlumno) {
        alert("Todos los campos son obligatorios.");
        return false;
    }
// En esta sección se generan expresiones regulares y validaciones de largo para asegurar el 
// formato de los datos que ingresa el usuario.
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    if (!rutRegex.test(rut)) {
        alert("El RUT ingresado no es válido.");
        return false;
    }

    if (typeof telefono !== 'number' || telefono.toString().length !== 8) {
        alert("El teléfono debe ser un número de 8 dígitos.");
        return false;
    }

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mailRegex.test(mail)) {
        alert("El correo electrónico no es válido.");
        return false;
    }

    return true;
}

// En esta función se verifica, a través del campo 'rut', si un apoderado existe o no
function existeRut(rut) {
    return apoderados.some(apoderado => apoderado.rut.toLowerCase() === rut.toLowerCase());
}

// En esta función se recorre el array de 'alumnos' para obtener valores que no tengan asociado un 'apoderado'
function obtenerAlumnosSinApoderado() {
    let alumnosConApoderado = apoderados.map(apoderado => apoderado.nombreAlumno);
    return alumnos.filter(alumno => !alumnosConApoderado.includes(alumno));
}

// En esta función tiene el objetivo de permitir al usuario seleccionar un nombre de alumno 
// de una lista de alumnos disponibles que no tienen un apoderado asignado.
function seleccionarNombreAlumno() {
    let alumnosDisponibles = obtenerAlumnosSinApoderado();
    if (alumnosDisponibles.length === 0) {
        alert("No hay alumnos disponibles para asignar.");
        return null;
    }

    let mensaje = "Seleccione un nombre de alumno:\n";
    alumnosDisponibles.forEach((alumno, index) => {
        mensaje += `${index + 1}. ${alumno}\n`;
    });
    let seleccion = parseInt(prompt(mensaje).trim());
    if (seleccion > 0 && seleccion <= alumnosDisponibles.length) {
        return alumnosDisponibles[seleccion - 1];
    } else {
        alert("Selección no válida. Por favor, intente de nuevo.");
        return seleccionarNombreAlumno();
    }
}

// Esta función genera el formulario de ingreso de un nuevo registro.
function agregarApoderado() {
    let rut = prompt("Por favor ingrese un RUT con guión y dígito verificador.", ultimoValorIngresado);
    if (rut !== null) {
        rut = rut.toLowerCase().trim();
        ultimoValorIngresado = rut;
        const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
        while (!rutRegex.test(rut)) {
            alert("El RUT ingresado no es válido. Por favor, inténtelo de nuevo.");
            rut = prompt("Por favor ingrese un RUT con guión y dígito verificador.", ultimoValorIngresado);
            if (rut === null) {
                mostrarMenu();
                return;
            }
            rut = rut.toLowerCase().trim();
            ultimoValorIngresado = rut; 
        }

        let nombre = prompt("Ingrese el nombre");
        if (nombre !== null) {
            nombre = nombre.trim();
            while (!nombre) {
                alert("El nombre es obligatorio. Por favor, inténtelo de nuevo.");
                nombre = prompt("Ingrese el nombre");
                if (nombre === null) {
                    mostrarMenu();
                    return;
                }
                nombre = nombre.trim();
            }
        }

        let apellido = prompt("Ingrese el apellido");
        if (apellido !== null) {
            apellido = apellido.trim();
            while (!apellido) {
                alert("El apellido es obligatorio. Por favor, inténtelo de nuevo.");
                apellido = prompt("Ingrese el apellido");
                if (apellido === null) {
                    mostrarMenu();
                    return;
                }
                apellido = apellido.trim();
            }
        }

        let telefono = prompt("Ingrese el teléfono");
        if (telefono !== null) {
            telefono = parseInt(telefono);
            while (isNaN(telefono) || telefono.toString().length !== 8) {
                alert("El teléfono debe ser un número de 8 dígitos. Por favor, inténtelo de nuevo.");
                telefono = prompt("Ingrese el teléfono");
                if (telefono === null) {
                    mostrarMenu();
                    return;
                }
                telefono = parseInt(telefono);
            }
        }

        let mail = prompt("Ingrese el correo electrónico");
        if (mail !== null) {
            mail = mail.trim();
            const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            while (!mailRegex.test(mail)) {
                alert("El correo electrónico no es válido. Por favor, inténtelo de nuevo.");
                mail = prompt("Ingrese el correo electrónico");
                if (mail === null) {
                    mostrarMenu();
                    return;
                }
                mail = mail.trim();
            }
        }

        let nombreAlumno = seleccionarNombreAlumno();
        if (!nombreAlumno) {
            mostrarMenu(); // Volver al menú si no hay alumnos disponibles o la selección es inválida
            return;
        }

        if (existeRut(rut)) {
            alert(`El RUT ${rut} ya existe.`);
            mostrarMenu(); // Volver al menú si el RUT ya existe
            return;
        }

        const nuevoApoderado = new Apoderado(rut, nombre, apellido, telefono, mail, nombreAlumno);
        apoderados.push(nuevoApoderado);
        alert("Nuevo apoderado agregado con éxito.");
        console.table(apoderados);
    }
    mostrarMenu(); // Volver al menú después de agregar un apoderado
}

// Esta función permite realizar una búsqueda a través del 'rut' para datos del 'apoderado'
function buscarApoderado() {
    let busqueda = prompt("Ingrese un RUT para buscar", ultimoValorIngresado);
    
    if (busqueda !== null) {
        busqueda = busqueda.toLowerCase().trim();
        ultimoValorIngresado = busqueda;
        
        let resultado = apoderados.filter((x) => x.rut.toLowerCase().includes(busqueda));

        if (resultado.length > 0) {
            console.table(resultado); // Mostrar los resultados en la consola

            let mensaje = "Resultados de la búsqueda:\n\n";
            resultado.forEach((apoderado, index) => {
                mensaje += `${index + 1}. RUT: ${apoderado.rut}\n`;
                mensaje += `   Nombre: ${apoderado.nombre}\n`;
                mensaje += `   Apellido: ${apoderado.apellido}\n`;
                mensaje += `   Teléfono: ${apoderado.telefono}\n`;
                mensaje += `   Email: ${apoderado.mail}\n`;
                mensaje += `   Alumno: ${apoderado.nombreAlumno}\n\n`;
            });
            alert(mensaje);
        } else {
            alert(`El RUT consultado ${busqueda} no existe.`);
        }
    }
    mostrarMenu(); // Volver al menú después de buscar un apoderado, incluso si el prompt fue cancelado
}
