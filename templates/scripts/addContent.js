document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        const contentType = document.getElementById('content-type').value;
        const contentTitle = document.getElementById('content-title').value;
        const contentAuthor = document.getElementById('content-author').value;
        const contentPrice = document.getElementById('content-price').value;
        const contentCategory = document.getElementById('content-category').value;
        const contentRating = document.getElementById('content-rating').value;
        const contentDescription = document.getElementById('content-description').value;
        const contentFile = document.getElementById('content-file');
        const fileName = contentFile.files[0].name;
        const ext = fileName.split('.').pop().toLowerCase();

        const formData = {
            typeData: contentType,
            data:{
                src: fileName,
                extension: ext,
                title: contentTitle,
                author: contentAuthor,
                price: contentPrice,
                category: contentCategory,
                rating: contentRating,
                description: contentDescription
            }
        };

        fetch('/save_content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            window.location.href = "admi_view.html";
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

});
