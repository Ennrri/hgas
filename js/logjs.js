// script.js
$(document).ready(function() {
    $('.message a').click(function() {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });

    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            url: 'php/login.php',  // Asegúrate de que la ruta sea correcta
            type: 'POST',
            data: { username: username, password: password },
            success: function(response) {
                if (response === 'success') {
                    window.location.href = 'dashboard.html'; // Redirige al panel de control
                } else if (response === 'inactive') {
                    alert('Tu cuenta está inactiva. No puedes ingresar al sistema.');
                } else {
                    $('.form').addClass('shake');
                    setTimeout(() => {
                        $('.form').removeClass('shake');
                    }, 300);
                    alert('Usuario o contraseña incorrectos');
                }
            }
        });
    });

    $('#registerForm').on('submit', function(event) {
        event.preventDefault();
        const username = $('#registerUsername').val();
        const password = $('#registerPassword').val();

        $.ajax({
            url: 'register.php',
            type: 'POST',
            data: { username: username, password: password },
            success: function(response) {
                if (response === 'success') {
                    alert('Cuenta creada exitosamente');
                    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
                } else {
                    alert('Error al crear la cuenta');
                }
            }
        });
    });
});
