document.getElementById("btnDivisores").addEventListener("click", mostrarDivisores);

function obtenerDivisores(numero) {
    let divisores = [];

    for (let i = 1; i <= numero; i++) {
        if (numero % i === 0) {
            divisores.push(i);
        }
    }

   return divisores;
}

function mostrarDivisores() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").innerText =
        "ingresa ambos numeros.";
        return;
    }

    let div1 = obtenerDivisores(n1);
    let div2 = obtenerDivisores(n2);

    document.getElementById("resultado").innerHTML =
    "Divisores de " + n1 + ": " + div1.join(", ") + "<br>" + 
    "Divisores de " + n2 + ": " + div2.join(", ");
    
}