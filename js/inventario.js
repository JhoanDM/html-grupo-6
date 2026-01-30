let productos = {};

//moneda COP
const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

//desde el texto que escribir del inventario
fetch('inventario.txt')
    .then(response => response.text())
    .then(data => {
    data.split("\n").forEach(line => {
        let [codigo, nombre, precio] = line.split(";");
        productos[codigo] = {
            nombre: nombre,
            precio: parseFloat(precio)
        };
    });

    //filas de la tabla
    for (let i = 0; i < 5; i++) {
        agregarFila();
    }
});

function agregarFila() {
    const tbody = document.getElementById("tabla");
    let fila = document.createElement("tr");

    fila.innerHTML = `
        <td>
            <select onchange="actualizarProducto(this)">
                <option value="">Seleccione un producto</option>
                ${Object.keys(productos).map(c => `
                    <option value="${c}">${c}</option>

                `).join("")}



                
            </select>
        </td>
        <td><input type="text" readonly tabindex="-1"></td>
        <td><input type="number" readonly tabindex="-1"></td>
        <td><input type="number" min="0" step="1" value="0" oninput="calcularFila(this)"></td>
        <td><input type="number" readonly value="0" tabindex="-1"></td>
        <td><button onclick="eliminarFila(this)">-</button></td>
    `;

    tbody.appendChild(fila);

}

function eliminarFila(boton) {
    boton.closest("tr").remove();
    calcularTotal();
}

function actualizarProducto(select) {
    let fila = select.closest("tr");
    let codigo = select.value;

    if (!productos[codigo]) return;

    fila.cells[1].children[0].value = productos[codigo].nombre;
    fila.cells[2].children[0].dataset.ValorUnitario = Math.round(productos[codigo].precio);
    fila.cells[2].children[0].value = (productos[codigo].precio);
    console.log(productos[codigo].precio);
    calcularFila(fila.cells[3].children[0]);
}

function calcularFila(inputCantidad) {
    let fila = inputCantidad.closest("tr");
    let ValorUnitario = parseFloat(fila.cells[2].children[0].dataset.ValorUnitario) || 0;
    let cantidad = parseFloat(inputCantidad.value) || 0;

    if (cantidad < 0) {
        inputCantidad.value = 0;
        cantidad = 0;
    
}

let SubTotal = ValorUnitario * cantidad;
    fila.cells[4].children[0].value =(SubTotal);
    calcularTotal();

}

function calcularTotal() {
    let total = 0;
    document.querySelectorAll("#tabla tr").forEach(fila => {
        let ValorUnitario = parseFloat(fila.cells[2].children[0].dataset.ValorUnitario) || 0;
            let cantidad = parseInt(fila.cells[3].children[0].value) || 0;
        total += ValorUnitario * cantidad;
    });
    document.getElementById("total").textContent = formatoCOP.format(total);
}