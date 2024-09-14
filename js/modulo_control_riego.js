function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

let chart1, chart2;

function fetchData() {
    const tableBody = document.getElementById('data-table-body');
    
    // Limpiar la tabla antes de agregar nuevos datos
    tableBody.innerHTML = '';

    // Datos aleatorios para la tabla
    const labels1 = ['Bomba 1', 'Bomba 2'];
    const values1 = [getRandomValue(10, 100), getRandomValue(10, 100)];
    const labels2 = ['Bomba 1', 'Bomba 2'];
    const values2 = [getRandomValue(10, 100), getRandomValue(10, 100)];

    // Agregar datos a la tabla
    labels1.forEach((label, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = label;
        row.insertCell(1).innerText = values1[index];
        row.insertCell(2).innerText = new Date().toLocaleString();
    });

    // Actualizar Gráfico 1
    if (chart1) {
        chart1.data.labels = labels1;
        chart1.data.datasets[0].data = values1;
        chart1.update();
    } else {
        const ctx1 = document.getElementById('chart1').getContext('2d');
        chart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: labels1,
                datasets: [{
                    label: 'Valores de Bomba 1 y 2',
                    data: values1,
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
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

    // Actualizar Gráfico 2
    if (chart2) {
        chart2.data.labels = labels2;
        chart2.data.datasets[0].data = values2;
        chart2.update();
    } else {
        const ctx2 = document.getElementById('chart2').getContext('2d');
        chart2 = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: labels2,
                datasets: [{
                    label: 'Distribución de Bomba 1 y 2',
                    data: values2,
                    backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                    borderColor: ['rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            }
        });
    }
}

// Llamar a fetchData cada 5 segundos
setInterval(fetchData, 5000);

// Llamar a fetchData al cargar la página
window.onload = fetchData;
