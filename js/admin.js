const form = document.getElementById('productoForm');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const titulo = document.getElementById('titulo').value;
            const imagen = document.getElementById('imagen').value;
            const precio = parseFloat(document.getElementById('precio').value);

            try {
                const response = await fetch('http://localhost:3001/productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ titulo, imagen, precio }),
                });

                const mensajeDiv = document.getElementById('mensaje');
                if (response.ok) {
                    const data = await response.json();
                    mensajeDiv.innerHTML = `Producto agregado con ID: ${data.id}`;
                } else {
                    const errorMessage = await response.text();
                    console.error('Error al agregar el producto:', errorMessage);
                    mensajeDiv.innerHTML = `Error al agregar el producto: ${errorMessage}`;
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                document.getElementById('mensaje').innerHTML = `Error en la solicitud: ${error.message}`;
            }
        });