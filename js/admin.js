const form = document.getElementById('productoForm');
const mensajeDiv = document.getElementById('mensaje');
const contenedorProductos = document.getElementById('productos'); 
async function cargarProductos() {
    try {
        console.log("Intentando cargar productos..."); 
        const response = await fetch('http://localhost:3001/productos');
        console.log("Respuesta del servidor recibida:", response);

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
        }

        const productos = await response.json();
        console.log("Productos recibidos:", productos);  
        contenedorProductos.innerHTML = '';  
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${producto.titulo}</h3>
                <img src="${producto.imagen}" alt="${producto.titulo}" />
                <p>Precio: $${producto.precio}</p>
                <button onclick="editarProducto(${producto.id}, '${producto.titulo}', '${producto.imagen}', ${producto.precio})">Editar</button>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            `;
            contenedorProductos.appendChild(card);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        mensajeDiv.innerHTML = `Error al cargar productos: ${error.message}`;
    }
}
 
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const imagen = document.getElementById('imagen').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const id = form.dataset.productId;

    const url = id
        ? `http://localhost:3001/productos/${id}`
        : 'http://localhost:3001/productos';
    const method = id ? 'PUT' : 'POST';

    console.log("Enviando datos:", { titulo, imagen, precio, method, url });

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, imagen, precio }),
        });

        if (response.ok) {
            mensajeDiv.innerHTML = id
                ? `Producto actualizado correctamente`
                : `Producto agregado correctamente`;
            form.reset();
            delete form.dataset.productId;  
            cargarProductos();  
        } else {
            const errorMessage = await response.text();
            console.error('Error en la solicitud:', errorMessage);
            mensajeDiv.innerHTML = `Error en la solicitud: ${errorMessage}`;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        mensajeDiv.innerHTML = `Error en la solicitud: ${error.message}`;
    }
}); 
function editarProducto(id, titulo, imagen, precio) {
    document.getElementById('titulo').value = titulo;
    document.getElementById('imagen').value = imagen;
    document.getElementById('precio').value = precio;
    form.dataset.productId = id; 
    mensajeDiv.innerHTML = `Editando producto: ${titulo}`;
}
 
async function eliminarProducto(id) {
    console.log("Intentando eliminar el producto con ID:", id);

    try {
        const response = await fetch(`http://localhost:3001/productos/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            mensajeDiv.innerHTML = `Producto eliminado correctamente`;
            cargarProductos();
        } else {
            const errorMessage = await response.text();
            console.error('Error al eliminar el producto:', errorMessage);
            mensajeDiv.innerHTML = `Error al eliminar el producto: ${errorMessage}`;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        mensajeDiv.innerHTML = `Error en la solicitud: ${error.message}`;
    }
}
 
cargarProductos();
