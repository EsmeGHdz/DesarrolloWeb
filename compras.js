// Función para cargar el carrito y mostrarlo
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCompras = document.getElementById('lista-compras');
    let totalCompra = 0;

    carrito.forEach((libro, index) => {
        const totalLibro = libro.precio * libro.cantidad;
        totalCompra += totalLibro;

        // Crear la fila de la tabla para cada libro en el carrito
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>$${libro.precio.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="modificarCantidad(${index}, -1)">-</button>
                <span id="cantidad-${index}">${libro.cantidad}</span>
                <button class="btn btn-sm btn-outline-success" onclick="modificarCantidad(${index}, 1)">+</button>
            </td>
            <td id="total-libro-${index}">$${totalLibro.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarLibro(${index})">Quitar</button>
            </td>
        `;
        listaCompras.appendChild(fila);
    });

    document.getElementById('total-compra').innerText = `Total: $${totalCompra.toFixed(2)}`;
}

// Función para modificar la cantidad de libros en el carrito
function modificarCantidad(index, cambio) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Modificar la cantidad y asegurar que no sea menor que 1
    carrito[index].cantidad = Math.max(1, carrito[index].cantidad + cambio);

    // Guardar el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la vista
    actualizarCarrito();
}

//                                   Función para eliminar un libro del carrito
function eliminarLibro(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Guardar el libro eliminado en una variable antes de eliminarlo
    const libroEliminado = carrito[index]; 

    // Eliminar el libro seleccionado
    carrito.splice(index, 1);

    // Guardar el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Emitir el evento personalizado 'libroEliminado' con la información del libro eliminado
    const eventoLibroEliminado = new CustomEvent('libroEliminado', { detail: { libro: libroEliminado } });
    document.dispatchEvent(eventoLibroEliminado);

    // Actualizar la vista
    actualizarCarrito();
}

document.addEventListener('libroEliminado', function(event) {
    alert(`El libro "${event.detail.libro.titulo}" ha sido eliminado del carrito.`);
});





// Función para actualizar la tabla del carrito y los totales
function actualizarCarrito() {
    // Limpiar la tabla
    document.getElementById('lista-compras').innerHTML = '';

    // Recargar el carrito y recalcular el total
    cargarCarrito();
}

// Cargar el carrito cuando la página se cargue
document.addEventListener('DOMContentLoaded', cargarCarrito);

