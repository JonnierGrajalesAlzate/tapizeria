function cargarResumenCarrito() {
    const contenedor = document.getElementById("productos-carrito");
    let total = 0;
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    contenedor.innerHTML = '';

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        contenedor.innerHTML += `
            <p>${item.titulo} (x${item.cantidad}) - $${subtotal.toFixed(2)}</p>
        `;
    });

    document.getElementById("total-compra").textContent = `Total: $${total.toFixed(2)}`;
}

cargarResumenCarrito();

document.getElementById("formulario-compra").onsubmit = function(event) {
    event.preventDefault();
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");
    mensajeConfirmacion.textContent = "¡Gracias por tu compra!";
    mensajeConfirmacion.classList.remove("hidden");

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosVendidos = JSON.parse(localStorage.getItem('productosVendidos')) || [];
    let cantidadTotal = parseInt(localStorage.getItem('cantidadTotalVendidos')) || 0;

    carrito.forEach(item => {
        cantidadTotal += item.cantidad; 
        const index = productosVendidos.findIndex(producto => producto.titulo === item.titulo);
        if (index !== -1) {
            productosVendidos[index].cantidad += item.cantidad; 
        } else {
            productosVendidos.push({ titulo: item.titulo, cantidad: item.cantidad });
        }
    });
    localStorage.setItem('productosVendidos', JSON.stringify(productosVendidos));
    localStorage.setItem('cantidadTotalVendidos', cantidadTotal);
    localStorage.removeItem('carrito'); 
};
