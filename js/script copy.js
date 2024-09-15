
// script.js
function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

let pieChart, lineChart, barChart, additionalChart1, additionalChart2;

async function fetchData() {
    const response = await fetch('php/ruta_a_tu_api.php');
    const data = await response.json();
    const table = document.getElementById('data-table');

    // Limpiar la tabla antes de agregar nuevos datos
    table.innerHTML = `
        <tr>
            <th>Sensor</th>
            <th>Valor</th>
            <th>Fecha y Hora</th>
        </tr>`;

    const labels = [];
    const values = [];
    const pieLabels = [];
    const pieValues = [];
    const lineLabels = [];
    const lineValues = [];
    const barLabels = [];
    const barValues = [];
    const additionalLabels1 = [];
    const additionalValues1 = [];
    const additionalLabels2 = [];
    const additionalValues2 = [];

    data.forEach((item, index) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = item.nombre_sensor;
        const randomValue = getRandomValue(10, 100);
        cell2.innerHTML = randomValue;
        cell3.innerHTML = item.fecha_hora;

        labels.push(item.fecha_hora);
        values.push(randomValue);

        if (index < 2) {
            pieLabels.push(item.nombre_sensor);
            pieValues.push(randomValue);
        } else if (index < 4) {
            lineLabels.push(item.fecha_hora);
            lineValues.push(randomValue);
        } else if (index < 6) {
            barLabels.push(item.nombre_sensor);
            barValues.push(randomValue);
        } else if (index < 8) {
            additionalLabels1.push(item.nombre_sensor);
            additionalValues1.push(randomValue);
        } else {
            additionalLabels2.push(item.nombre_sensor);
            additionalValues2.push(randomValue);
        }
    });

    // Actualizar Gráfico de Pastel
    if (pieChart) {
        pieChart.data.labels = pieLabels;
        pieChart.data.datasets[0].data = pieValues;
        pieChart.update();
    } else {
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: pieLabels,
                datasets: [{
                    data: pieValues,
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                    borderWidth: 1
                }]
            }
        });
    }

    // Actualizar Gráfico de Líneas
    if (lineChart) {
        lineChart.data.labels = lineLabels;
        lineChart.data.datasets[0].data = lineValues;
        lineChart.update();
    } else {
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: lineLabels,
                datasets: [{
                    label: 'Valor del Sensor',
                    data: lineValues,
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

    // Actualizar Gráfico de Barras
    if (barChart) {
        barChart.data.labels = barLabels;
        barChart.data.datasets[0].data = barValues;
        barChart.update();
    } else {
        const barCtx = document.getElementById('barChart').getContext('2d');
        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Valor del Sensor',
                    data: barValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
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

    // Actualizar Gráfico Adicional 1
    if (additionalChart1) {
        additionalChart1.data.labels = additionalLabels1;
        additionalChart1.data.datasets[0].data = additionalValues1;
        additionalChart1.update();
    } else {
        const additionalCtx1 = document.getElementById('additionalChart1').getContext('2d');
        additionalChart1 = new Chart(additionalCtx1, {
            type: 'doughnut',
            data: {
                labels: additionalLabels1,
                datasets: [{
                    data: additionalValues1,
                    backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1
                }]
            }
        });
    }

    // Actualizar Gráfico Adicional 2
    if (additionalChart2) {
        additionalChart2.data.labels = additionalLabels2;
        additionalChart2.data.datasets[0].data = additionalValues2;
        additionalChart2.update();
    } else {
        const additionalCtx2 = document.getElementById('additionalChart2').getContext('2d');
        additionalChart2 = new Chart(additionalCtx2, {
            type: 'radar',
            data: {
                labels: additionalLabels2,
                datasets: [{
                    label: 'Valor del Sensor',
                    data: additionalValues2,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            }
        });
    }



    // Actualizar Gráfico Adicional 2
    if (additionalChart2) {
        additionalChart2.data.labels = additionalLabels2;
        additionalChart2.data.datasets[0].data = additionalValues2;
        additionalChart2.update();
    } else {
        const additionalCtx2 = document.getElementById('additionalChart2').getContext('2d');
        additionalChart2 = new Chart(additionalCtx2, {
            type: 'radar',
            data: {
                labels: additionalLabels2,
                datasets: [{
                    label: 'Valor del Sensor',
                    data: additionalValues2,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            }
        });
    }
}

// Llamar a fetchData cada 15 segundos
setInterval(fetchData, 2000);

// Llamar a fetchData al cargar la página
window.onload = fetchData;



