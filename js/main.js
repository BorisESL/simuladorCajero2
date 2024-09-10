class Transaccion {
    constructor(tipo, monto) {
        this.tipo = tipo;
        this.monto = Math.round(parseFloat(monto));
        this.fecha = new Date().toLocaleString();
    }

    mostrarDetalles() {

        return this.fecha + " - " + this.tipo + "  " + this.monto.toFixed(2);
    }
}

const pinCorrecto = "1234";
let saldo = 5000;
let intentos = 3;
const transacciones = [];//este array lo voy a utlizar para guardar el historial de las transacciones que se hagan

function validarPin() {
    while (intentos > 0) {
        let pin = prompt("Ingrese su clave de 4 numeros");
        if (pin === pinCorrecto) {
            return true;
        } else {
            intentos--;
            alert("Clave incorrecta. Le quedan  " + intentos + " Intentos restantes.");
        }
    }
    return false;
}

function consultarSaldo() {
    alert("Su saldo actual es de : $ " + saldo);
}

function retiraDinero() {
    let monto = parseFloat(prompt("Ingrese el monto que desea retirar"));
    monto = Math.round(monto);
    if (monto <= 0 || isNaN(monto)) {
        alert("Monto invalido. Por favor ingrese un monto válido");
    } else if (monto > saldo) {
        alert("Saldo insuficiente");
    } else {
        saldo -= monto;
        transacciones.push(new Transaccion("Retiro", monto));//aca pusheamos y almacenamos la transacción
        alert("Retiro exitoso. Saldo actual: $ " + saldo);
    }
}

function depositarDinero() {
    let monto = parseFloat(prompt("Ingrese monto a depositar"));
    monto = Math.round(monto);
    if (monto <= 0 || isNaN(monto)) {
        alert("Monto invalido. Por favor ingrese un monto válido");
    } else {
        saldo += monto;
        transacciones.push(new Transaccion("Deposito", monto));
        alert("Deposito exitoso. Saldo actual: $ " + saldo);
    }
}

function verHistorial() {
    if (transacciones.length === 0) {
        alert("No hay transacciones registradas");
    } else {
        console.log("*****Historial de transacciones******")
        transacciones.forEach(function (transaccion, index) {
            console.log((index + 1) + ". " + transaccion.mostrarDetalles());
        })
    }
}

function cajeroAutomatico() {
    if (validarPin()) {
        let continuar = true;
        while (continuar) {
            let opcion = prompt("Seleccione una opción:\n1. Consultar saldo\n2. Retirar dinero\n3. Depositar dinero\n4. Ver historial de transacciones\n5. Salir");
            switch (opcion) {
                case "1" : 
                consultarSaldo();
                break;
                case "2" : 
                retiraDinero();
                break;
                case "3" : 
                depositarDinero();
                break;
                case "4" : 
                verHistorial();
                break;
                case "5" : 
                alert("Gracias por usar nuestro cajero. Hasta pronto.");
                continuar = false;
                break;
                default:
                    alert("Opción inválida. Por favor seleccione una opción válida");
            }
        }
    } else {
        alert("Ha excedido el número de intentos. Contacte a su banco")
    }
}

cajeroAutomatico();
