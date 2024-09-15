function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

let pieChart, lineChart, barChart, thermometerChart, multiSeriesPieChart, additionalChart1, additionalChart2, donutChart, gaugeChart;

async function fetchData() {
    const response = await fetch('php/ruta_a_tu_api.php');
    const data = await response.json();
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // Limpiar la tabla antes de agregar nuevos datos
    table.innerHTML = '';

    const labels = [];
    const values = [];
    const pieLabels = [];
    const pieValues = [];
    const lineLabels = [];
    const lineValues = [];
    const barLabels = [];
    const barValues = [];
    const tempLabels = ['tempAmb', 'tempAmb1'];
    const tempValues = [getRandomValue(10, 100), getRandomValue(10, 100)];
    const additionalLabels1 = [];
    const additionalValues1 = [];
    const additionalLabels2 = [];
    const additionalValues2 = [];
    const donutLabels = ['hum', 'temp'];
    const donutValues = [getRandomValue(30, 70), getRandomValue(10, 40)];
    const multiSeriesPieLabels = ['temp', 'tempAmb', 'tempAmb1'];
    const multiSeriesPieValues = [getRandomValue(10, 100), getRandomValue(10, 100), getRandomValue(10, 100)];
    let temperatureValue = 0;
    let humidityValue = 0;

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

        if (item.nombre_sensor === 'temp') {
            temperatureValue = randomValue;
        }

        if (item.nombre_sensor === 'hum') {
            humidityValue = randomValue;
        }
    });

    // Combinar datos de bar y temp para el gráfico de líneas
    const combinedLabels = [...barLabels, ...tempLabels];
    const combinedValues = [...barValues, ...tempValues];

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

    // Crear Gráfico Estilo Termómetro para Temperatura
    if (thermometerChart) {
        thermometerChart.data.datasets[0].data = [temperatureValue];
        thermometerChart.update();
    } else {
        const thermometerCtx = document.getElementById('thermometerChart').getContext('2d');
        thermometerChart = new Chart(thermometerCtx, {
            type: 'bar',
            data: {
                labels: ['Temperatura'],
                datasets: [{
                    label: 'Temperatura',
                    data: [temperatureValue],
                    backgroundColor: function(context) {
                        const value = context.dataset.data[0];
                        if (value < 0) return 'rgba(0, 0, 255, 0.6)';
                        if (value < 20) return 'rgba(0, 255, 255, 0.6)';
                        if (value < 40) return 'rgba(0, 255, 0, 0.6)';
                        if (value < 60) return 'rgba(255, 255, 0, 0.6)';
                        if (value < 80) return 'rgba(255, 165, 0, 0.6)';
                        return 'rgba(255, 0, 0, 0.6)';
                    },
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        min: -5,
                        max: 100,
                        ticks: {
                            stepSize: 5
                        }
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

    // Crear Gráfico Radial para Humedad
    if (gaugeChart) {
        gaugeChart.data.datasets[0].data = [humidityValue];
        gaugeChart.update();
    } else {
        const gaugeCtx = document.getElementById('gaugeChart').getContext('2d');
        gaugeChart = new Chart(gaugeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Humedad'],
                datasets: [{
                    data: [humidityValue, 100 - humidityValue],
                    backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(200, 200, 200, 0.6)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(200, 200, 200, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                circumference: Math.PI,
                rotation: Math.PI,
                cutout: '70%',
                plugins: {
                    datalabels: {
                        display: true,
                        formatter: (value, context) => {
                            return context.chart.data.labels[context.dataIndex];
                        },
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: '16'
                        }
                    }
                }
            }
        });
    }

    // Actualizar Gráfico de Rosquillas para Hum y Temp
    if (donutChart) {
        donutChart.data.labels = donutLabels;
        donutChart.data.datasets[0].data = donutValues;
        donutChart.update();
    } else {
        const donutCtx = document.getElementById('donutChart').getContext('2d');
        donutChart = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: donutLabels,
                datasets: [{
                    data: donutValues,
                    backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                    borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }]
            }
        });
    }

    // Crear Gráfico Multi Series Pie para Temp, TempAmb y TempAmb1
    if (multiSeriesPieChart) {
        multiSeriesPieChart.data.datasets[0].data = multiSeriesPieValues;
        multiSeriesPieChart.update();
    } else {
        const multiSeriesPieCtx = document.getElementById('multiSeriesPieChart').getContext('2d');
        multiSeriesPieChart = new Chart(multiSeriesPieCtx, {
            type: 'pie',
            data: {
                labels: multiSeriesPieLabels,
                datasets: [{
                    data: multiSeriesPieValues,
                    backgroundColor: function(context) {
                        const value = context.dataset.data[context.dataIndex];
                        if (value < 20) return 'rgba(0, 255, 255, 0.6)';
                        if (value < 40) return 'rgba(0, 255, 0, 0.6)';
                        if (value < 60) return 'rgba(255, 255, 0, 0.6)';
                        if (value < 80) return 'rgba(255, 165, 0, 0.6)';
                        return 'rgba(255, 0, 0, 0.6)';
                    },
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                }]
            }
        });
    }

    // Actualizar Gráfico de Líneas con datos combinados
    if (lineChart) {
        lineChart.data.labels = combinedLabels;
        lineChart.data.datasets[0].data = combinedValues;
        lineChart.update();
    } else {
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: combinedLabels,
                datasets: [{
                    label: 'Valores Combinados',
                    data: combinedValues,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: true
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

// Llamar a fetchData cada 5 segundos
setInterval(fetchData, 5000);

// Llamar a fetchData al cargar la página
window.onload = fetchData;
