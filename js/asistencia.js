
var registroAsistencia = [];
function registrarAsistencia() {
    var ficha = document.getElementById("fichas").value.substring(0, 7).trim();
    var checkboxes = document.getElementsByName("aprendiz[]");
    asistentes = [];
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            asistentes.push(checkboxes[i].value);
        }
    }
    registroAsistencia[ficha]=asistentes;
    console.log(asistentes);

}


function cargarAprendices() {
    var option = document.getElementById("fichas").value;
    var ficha = option.substring(0, 7).trim();
    var carga = new XMLHttpRequest();
    carga.open("GET", ficha+".txt", true);  
    carga.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("listaAprendices").innerHTML = getFilasAprendices(this.responseText);
        } else if (this.readyState == 4 && this.status == 404) {
            alert("Archivo no encontrado para la ficha seleccionada.");
            document.getElementById("listaAprendices").innerHTML = "";
        }
    };
    carga.send();                     
}


function getFilasAprendices(cadena) {
    var filas = "";
    var aprendices = cadena.split("\n");
    for (let i=0; i<aprendices.length; i++) {
        filas += "<tr><td>"+ aprendices[i] +"</td><td><input type= 'checkbox' name= 'aprendiz[]' value='"+aprendices[i]+"' /></td></tr>";
    }
    return filas;
}





function cargarFichas() {
    var carga = new XMLHttpRequest();
    carga.open("GET", "fichas.txt", true);
    carga.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("fichas").innerHTML = "<option>Seleccione una ficha</option><br/>"+this.responseText;
        }
    };
    carga.send();
}