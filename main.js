const productos = [
    { nombre: "Manta", precio: 45000 },
    { nombre: "Camino de mesa", precio: 10000 },
    { nombre: "Paño de cocina", precio: 9000 },
    { nombre: "Funda de almohadón", precio: 7500 },
    { nombre: "Mantel", precio: 30000 },
];

// Guardar usuario
document.getElementById("usuarioForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;

    localStorage.setItem("usuario", JSON.stringify({ nombre, correo }));

    document.getElementById("resultado").innerHTML = `
        <p class="success">¡Usuario guardado exitosamente!</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
    `;
});

// Calcular compra
document.getElementById("calcular").addEventListener("click", () => {
    const productoSeleccionado = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);
    const pagoEfectivo = document.getElementById("pagoEfectivo").checked;

    if (cantidad > 10) {
        document.getElementById("resultado").innerHTML = `
            <p class="error">Error: Solo puedes comprar un máximo de 10 unidades.</p>
        `;
        return;
    }

    const producto = productos.find((p) => p.nombre === productoSeleccionado);
    let costoTotal = producto.precio * cantidad;
    let descuento = 0;

    if (pagoEfectivo) {
        descuento = costoTotal * 0.15;
        costoTotal -= descuento;
    }

    let tasaInteres = 0;
    if (cuotas > 3) {
        tasaInteres = cuotas <= 6 ? 0.10 : 0.15;
        costoTotal += costoTotal * tasaInteres;
    }

    const valorCuota = (costoTotal / cuotas).toFixed(2);

    document.getElementById("resultado").innerHTML = `
        <h3>Resumen de tu compra</h3>
        <p><strong>Producto:</strong> ${producto.nombre}</p>
        <p><strong>Cantidad:</strong> ${cantidad}</p>
        <p><strong>Total inicial:</strong> $${(producto.precio * cantidad).toFixed(2)}</p>
        <p><strong>Descuento:</strong> $${pagoEfectivo ? descuento.toFixed(2) : "0.00"}</p>
        <p><strong>Tasa de interés:</strong> ${tasaInteres * 100}%</p>
        <p><strong>Total final:</strong> $${costoTotal.toFixed(2)}</p>
        <p><strong>Valor por cuota:</strong> ${!pagoEfectivo ? `$${valorCuota}` : "N/A"}</p>
    `;
});