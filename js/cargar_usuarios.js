$(document).ready(function () {

    // Función para cargar los usuarios y mostrarlos en la tabla
    function loadUsers() {
        $.ajax({
            url: 'php/load_users.php', // Archivo PHP que carga los usuarios desde la base de datos
            type: 'GET',
            success: function (data) {
                $('#userTable tbody').html(data);
            },
            error: function (xhr, status, error) {
                console.error('Error al cargar usuarios:', error);
            }
        });
    }

    // Llamar a loadUsers al cargar la página para que muestre los usuarios en la tabla
    loadUsers();

    // Función para enviar el formulario de creación de usuario mediante AJAX
    $('#userForm').on('submit', function (event) {
        event.preventDefault(); // Evitar el envío estándar del formulario

        var formData = $(this).serialize(); // Obtener los datos del formulario

        $.ajax({
            url: 'php/add_users.php',  // Archivo PHP que procesa el formulario
            type: 'POST',
            data: formData,
            success: function (response) {
                alert('Usuario agregado correctamente');
                loadUsers(); // Recargar la tabla de usuarios
                $('#userForm')[0].reset(); // Limpiar el formulario
            },
            error: function (xhr, status, error) {
                console.error('Error al agregar usuario:', error);
                alert('Error al agregar el usuario');
            }
        });
    });

    // Delegación de eventos para eliminar usuarios
    $('#userTable').on('click', '.delete-user', function () {
        var userId = $(this).data('id'); // Obtener el ID del usuario

        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            $.ajax({
                url: 'php/delete_user.php',  // Archivo PHP para eliminar el usuario
                type: 'POST',
                data: { id: userId },
                success: function (response) {
                    alert('Usuario eliminado correctamente');
                    loadUsers(); // Recargar la tabla después de eliminar
                },
                error: function (xhr, status, error) {
                    console.error('Error al eliminar usuario:', error);
                    alert('Error al eliminar el usuario');
                }
            });
        }
    });

    // Delegación de eventos para editar usuarios
    $('#userTable').on('click', '.edit-user', function () {
        var userId = $(this).data('id');
        // Aquí puedes abrir un modal o formulario para editar el usuario y hacer una petición AJAX similar
        alert('Función de edición de usuario pendiente');
    });
});
