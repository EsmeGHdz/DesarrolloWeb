// Inicializar carrito
let carrito = [];

// Función para agregar libros al carrito
function agregarAlCarrito(titulo, precio) {
    // Verificar si el libro ya está en el carrito
    const libroExistente = carrito.find(libro => libro.titulo === titulo);
    
    if (libroExistente) {
        // Si ya está, incrementamos la cantidad
        libroExistente.cantidad += 1;
    } else {
        // Si no, lo agregamos al carrito
        carrito.push({
            titulo: titulo,
            precio: precio,
            cantidad: 1
        });
    }
    
    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`${titulo} ha sido agregado al carrito`);
}

// Función para redirigir a la página de compras
function verCarrito() {
    window.location.href = 'compras.html';
}

// Asignar eventos a los botones de "Comprar"
document.addEventListener('DOMContentLoaded', () => {
    const botonesComprar = document.querySelectorAll('.btn-success');
    
    botonesComprar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            // Obtener el título y el precio del libro correspondiente
            const card = boton.closest('.card');
            const titulo = card.querySelector('.card-title').innerText;
            const precioTexto = card.querySelector('.text-danger').innerText;
            const precio = parseFloat(precioTexto.replace('$', ''));
            
            agregarAlCarrito(titulo, precio);
        });
    });

    // Asignar evento al carrito para redirigir a la página de compras
    const iconoCarrito = document.querySelector('.navbar .nav-item a[href="#"]');
    iconoCarrito.addEventListener('click', verCarrito);
});
