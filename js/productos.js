function cargarProductos() {
    var carga = new XMLHttpRequest();
    carga.open("GET", "productos.txt", true);
    carga.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("productos").innerHTML = "<option>Seleccione un producto</option>" + getOpciones(this.responseText);
        }
    };
    carga.send();
}   

function getOpciones(cadena) {
    var opciones = "";
    var productos = cadena.split("\n");
    for (let i=0; i < productos.length; i++) {
        let producto = productos[i].split(":");
        opciones += "<option value='" + producto[1]+"'>" + producto[0] +"</option>";
    }
    return opciones;
}

function calcularPago() {
    var productoSelect = document.getElementById("productos").value;
    var cantidad = document.getElementById("cantidad").value;
    var pagoTotal = productoSelect * cantidad;
    document.getElementById("resultado").innerText = "El pago total es: $" + pagoTotal.toFixed(2);
}