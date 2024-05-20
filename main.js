const Apoderado = function(rut, nombre, apellido, telefono, mail, nombreAlumno) {
    this.rut = rut;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.mail = mail;
    this.nombreAlumno = nombreAlumno;
}

let apoderados = [
    new Apoderado("12345677-9", "Manuel", "Manodes", 12345678, "correo@correo.cl", "Juanito"),
    new Apoderado("98765432-1", "María", "Perez", 87654321, "maria@correo.cl", "Pepito"),
    new Apoderado("11223344-5", "José", "Santos", 11223344, "jose@correo.cl", "Anita"),
    new Apoderado("55667777-9", "Luisa", "Martinez", 55667788, "luisa@correo.cl", "Carlitos")
];

let alumnos = ["Juanito", "Pepito", "Anita", "Carlitos", "Martín", "Valentina"];

// Función para validar los datos del nuevo apoderado
function validarDatos(rut, nombre, apellido, telefono, mail, nombreAlumno) {
    if (!rut || !nombre || !apellido || !telefono || !mail || !nombreAlumno) {
        alert("Todos los campos son obligatorios.");
        return false;
    }

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

// Función para verificar si un rut ya existe
function existeRut(rut) {
    return apoderados.some(apoderado => apoderado.rut.toLowerCase() === rut.toLowerCase());
}

// Función para seleccionar un nombre de alumno de una lista
function seleccionarNombreAlumno() {
    let mensaje = "Seleccione un nombre de alumno:\n";
    alumnos.forEach((alumno, index) => {
        mensaje += `${index + 1}. ${alumno}\n`;
    });
    let seleccion = parseInt(prompt(mensaje).trim());
    if (seleccion > 0 && seleccion <= alumnos.length) {
        return alumnos[seleccion - 1];
    } else {
        alert("Selección no válida. Por favor, intente de nuevo.");
        return seleccionarNombreAlumno(); // Llamada recursiva en caso de selección inválida
    }
}

// Función para agregar un nuevo apoderado
function agregarApoderado() {
    let rut = prompt("Ingrese el RUT").toLowerCase().trim();
    let nombre = prompt("Ingrese el nombre").trim();
    let apellido = prompt("Ingrese el apellido").trim();
    let telefono = parseInt(prompt("Ingrese el teléfono"));
    let mail = prompt("Ingrese el correo electrónico").trim();
    let nombreAlumno = seleccionarNombreAlumno();

    if (!validarDatos(rut, nombre, apellido, telefono, mail, nombreAlumno)) {
        return;
    }

    if (existeRut(rut)) {
        alert(`El RUT ${rut} ya existe.`);
        return;
    }

    const nuevoApoderado = new Apoderado(rut, nombre, apellido, telefono, mail, nombreAlumno);
    apoderados.push(nuevoApoderado);
    console.log("Nuevo apoderado agregado con éxito.");
    console.table(apoderados);
}

// Función para buscar un apoderado por RUT
function buscarApoderado() {
    let busqueda = prompt("Ingrese un rut para buscar").toLowerCase().trim();
    let resultado = apoderados.filter((x) => x.rut.toLowerCase().includes(busqueda));

    if (resultado.length > 0) {
        console.table(resultado);
    } else {
        alert(`El rut consultado ${busqueda} no existe.`);
    }
}
