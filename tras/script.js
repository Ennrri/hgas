// script.js
async function fetchData() {
    const response = await fetch('ruta_a_tu_api.php');
    const data = await response.json();
    const table = document.getElementById('data-table');

    // Limpiar la tabla antes de agregar nuevos datos
    table.innerHTML = `
        <tr>
            <th>Sensor</th>
            <th>Valor</th>
            <th>Fecha y Hora</th>
        </tr>
    `;

    const labels = [];
    const values = [];

    data.forEach(item => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = item.nombre_sensor;
        cell2.innerHTML = item.valor;
        cell3.innerHTML = item.fecha_hora;

        labels.push(item.fecha_hora);
        values.push(item.valor);
    });

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor del Sensor',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Llamar a fetchData cada 15 segundos
setInterval(fetchData, 15000);

// Llamar a fetchData al cargar la página
window.onload = fetchData;
