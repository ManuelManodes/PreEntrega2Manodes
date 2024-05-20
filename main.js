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
    let rut = prompt("Ingrese el RUT").toLowerCase().trim();
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
    while (!rutRegex.test(rut)) {
        alert("El RUT ingresado no es válido. Por favor, inténtelo de nuevo.");
        rut = prompt("Ingrese el RUT").toLowerCase().trim();
    }

    let nombre = prompt("Ingrese el nombre").trim();
    while (!nombre) {
        alert("El nombre es obligatorio. Por favor, inténtelo de nuevo.");
        nombre = prompt("Ingrese el nombre").trim();
    }

    let apellido = prompt("Ingrese el apellido").trim();
    while (!apellido) {
        alert("El apellido es obligatorio. Por favor, inténtelo de nuevo.");
        apellido = prompt("Ingrese el apellido").trim();
    }

    let telefono = parseInt(prompt("Ingrese el teléfono"));
    while (isNaN(telefono) || telefono.toString().length !== 8) {
        alert("El teléfono debe ser un número de 8 dígitos. Por favor, inténtelo de nuevo.");
        telefono = parseInt(prompt("Ingrese el teléfono"));
    }

    let mail = prompt("Ingrese el correo electrónico").trim();
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    while (!mailRegex.test(mail)) {
        alert("El correo electrónico no es válido. Por favor, inténtelo de nuevo.");
        mail = prompt("Ingrese el correo electrónico").trim();
    }

    let nombreAlumno = seleccionarNombreAlumno();
    if (!nombreAlumno) {
        return; // Si no hay alumnos disponibles o la selección es inválida, no continuar.
    }

    if (existeRut(rut)) {
        alert(`El RUT ${rut} ya existe.`);
        return;
    }

    const nuevoApoderado = new Apoderado(rut, nombre, apellido, telefono, mail, nombreAlumno);
    apoderados.push(nuevoApoderado);
    alert("Nuevo apoderado agregado con éxito.");
    console.table(apoderados);
}

// Esta función permite realizar una búsqueda a través del 'rut' para datos del 'apoderado'
function buscarApoderado() {
    let busqueda = prompt("Ingrese un rut para buscar").toLowerCase().trim();
    let resultado = apoderados.filter((x) => x.rut.toLowerCase().includes(busqueda));

    if (resultado.length > 0) {
        console.table(resultado);
    } else {
        alert(`El rut consultado ${busqueda} no existe.`);
    }
}
