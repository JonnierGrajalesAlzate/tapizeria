const carrito = [];
        let contadorCarrito = 0;
        fetch('http://localhost:3001/productos')
            .then(response => response.json())
            .then(data => {
                const contenedor = document.getElementById('productos');
                data.forEach(producto => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <h3>${producto.titulo}</h3>
                        <img src="${producto.imagen}" alt="${producto.titulo}" />
                        <p>Precio: $${producto.precio}</p>
                        <button onclick="agregarAlCarrito(${producto.id}, '${producto.titulo}', ${producto.precio})">Comprar</button>
                    `;
                    contenedor.appendChild(card);
                });
            });
 
        const modal = document.getElementById("modal-carrito");
        document.getElementById("ver-carrito").onclick = () => modal.style.display = "block";
        document.querySelector(".close").onclick = () => modal.style.display = "none";
        window.onclick = event => { if (event.target === modal) modal.style.display = "none"; };

        function agregarAlCarrito(id, titulo, precio) {
            const productoExistente = carrito.find(item => item.id === id);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ id, titulo, precio, cantidad: 1 });
            }
            contadorCarrito++;
            document.getElementById("contador-carrito").textContent = contadorCarrito;
            actualizarCarrito();
        }
 
        function actualizarCarrito() {
            const contenedor = document.getElementById("carrito-items");
            contenedor.innerHTML = '';
            let total = 0;

            carrito.forEach(item => {
                total += item.precio * item.cantidad;
                contenedor.innerHTML += `
                    <div class="carrito-item">
                        <div class="item-info">
                            <span class="titulo">${item.titulo}</span>
                            <span class="cantidad-control">
                                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                                ${item.cantidad}
                                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                            </span>
                            <span class="subtotal">$${(item.precio * item.cantidad).toFixed(2)}</span>
                        </div>
                    </div>
                `;
            });

            document.getElementById("total-compra").textContent = `Total: $${total.toFixed(2)}`;
        }

        function cambiarCantidad(id, delta) {
            const producto = carrito.find(item => item.id === id);
            if (producto) {
                producto.cantidad += delta;
                if (producto.cantidad <= 0) {
                    carrito.splice(carrito.indexOf(producto), 1);
                }
                contadorCarrito = carrito.reduce((sum, item) => sum + item.cantidad, 0);
                document.getElementById("contador-carrito").textContent = contadorCarrito;
                actualizarCarrito();
            }
        } 
        
        document.getElementById("finalizar-compra").onclick = () => { 
            localStorage.setItem('carrito', JSON.stringify(carrito));
            window.location.href = "compra.html";
        };