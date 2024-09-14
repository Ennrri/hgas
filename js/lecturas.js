// Archivo: lecturas.js

function obtenerLecturas() {
    fetch('get_lecturas.php')
        .then(response => response.json())
        .then(data => {
            let tabla = document.getElementById('tabla-lecturas');
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos datos

            data.forEach(lectura => {
                let fila = `<tr>
                    <td>${lectura.nombre_sensor}</td>
                    <td>${lectura.valor}</td>
                    <td>${lectura.timestamp}</td>
                </tr>`;
                tabla.innerHTML += fila;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llamar a la función inmediatamente y luego cada 5 segundos
obtenerLecturas();
setInterval(obtenerLecturas, 5000);
