document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var password = document.getElementById('password').value;

        var requestData = {
            name: name,
            password: password
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/signin');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                if(responseData.page[0]!=='l')
                    window.location.href = responseData.page;
                else{
                    document.getElementById('name').value = '';
                    document.getElementById('password').value = '';
                }
            } else {
                console.error('Hubo un error al enviar la solicitud.');
            }
        };

        xhr.onerror = function() {
            console.error('Error de red al intentar enviar la solicitud.');
        };

        xhr.send(JSON.stringify(requestData));
    });

});
