var total=0;
var numProductos=0;
var ids = 1;

function addFila() {
    var tabla = document.getElementById("tblFactura").getElementsByTagName('tbody')[0];
    //console.log(tabla);
    var fila = tabla.insertRow(-1);
    var celda1 = fila.insertCell(0);
    var celda2 = fila.insertCell(1);
    var celda3 = fila.insertCell(2);
    var celda4 = fila.insertCell(3);
    var celda5 = fila.insertCell(4);
    var celda6 = fila.insertCell(5);

    var botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = "-";
    botonEliminar.onclick = function() {
        var row = this.parentNode.parentNode;
        row.remove();
        numProductos--;
        var contador = document.getElementById("numProductos");
        contador.innerHTML = "<b>"+numProductos+"</b>";
}
celda1.appendChild(botonEliminar);

var caja1 = document.createElement("input");
caja1.id = "codigo"+ids;
caja1.type = "text";
celda2.appendChild(caja1);

numProductos++;
ids++;
var contador = document.getElementById("numProductos");
        contador.innerHTML = "<b>"+numProductos+"</b>";



}