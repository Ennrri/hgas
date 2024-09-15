document.addEventListener('DOMContentLoaded', function () {
    fetch('php/get_actuadores.php')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('actuadores-list');
            data.forEach(actuator => {
                const actuatorDiv = document.createElement('div');
                actuatorDiv.classList.add('actuator-control');

                const button = document.createElement('button');
                button.innerText = `Activar/Desactivar ${actuator.sensor}`;
                button.onclick = function () {
                    toggleActuator(actuator.idsen);
                };

                const status = document.createElement('span');
                status.id = `status${actuator.idsen}`;
                status.innerText = `Estado: ${actuator.estado ? 'Activo' : 'Inactivo'}`;

                actuatorDiv.appendChild(button);
                actuatorDiv.appendChild(status);
                container.appendChild(actuatorDiv);
            });
        });
});

function toggleActuator(actuatorId) {
    fetch(`php/control_actuadores.php?id=${actuatorId}`)
        .then(response => response.json())
        .then(data => {
            const statusElement = document.getElementById(`status${actuatorId}`);
            statusElement.innerText = `Estado: ${data.status ? 'Activo' : 'Inactivo'}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
