document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#data-table tbody");
    const sensorChartCtx = document.getElementById('sensorChart').getContext('2d');
    let sensorChart;

    // Función para obtener datos de la API
    async function fetchData() {
        const response = await fetch('../php/sensores.php');
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
            return;
        }

        updateTable(data);
        updateChart(data);
    }

    // Función para actualizar la tabla con los datos de los sensores
    function updateTable(data) {
        tableBody.innerHTML = ''; // Limpiar tabla
        data.forEach(sensor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sensor.nombre_sensor}</td>
                <td>${sensor.ubicacion}</td>
                <td>${sensor.valor}</td>
                <td>${sensor.fecha_hora}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Función para actualizar el gráfico
    function updateChart(data) {
        const labels = data.map(sensor => sensor.fecha_hora);
        const values = data.map(sensor => sensor.valor);

        if (sensorChart) {
            sensorChart.data.labels = labels;
            sensorChart.data.datasets[0].data = values;
            sensorChart.update();
        } else {
            sensorChart = new Chart(sensorChartCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Lectura del Sensor',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    // Actualizar cada 5 segundos
    setInterval(fetchData, 5000);
    fetchData(); // Llamar la primera vez
});
