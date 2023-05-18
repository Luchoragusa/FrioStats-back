const generarNumerosCoherentes = (min, max, precision = 0.01) => {
  let numeroAnterior = null
  let superoLimite = false

  return () => {
    let numeroGenerado

    if (numeroAnterior === null || superoLimite) {
      // Generar un número aleatorio dentro de los límites
      numeroGenerado = Math.random() * (max - min) + min
      superoLimite = false
    } else {
      // Generar un número aleatorio dentro de la pequeña diferencia del número anterior
      const diferencia = (Math.random() * precision * 2) - precision
      numeroGenerado = numeroAnterior + diferencia
    }

    // Asegurarse de que el número generado esté dentro de los límites
    numeroGenerado = Math.max(Math.min(numeroGenerado, max), min)

    // Actualizar el número anterior con el número generado
    numeroAnterior = numeroGenerado

    // Verificar si el número generado supera los límites
    if (numeroGenerado < min || numeroGenerado > max) {
      superoLimite = true
    }

    return numeroGenerado
  }
}

export default generarNumerosCoherentes

// NOTA --> tiene coherencia, pero no genera un numero que supere un limite (maximo o minimo)

// Ejemplo de uso
// const generarNumero = generarNumerosCoherentes(-20, -10, 0.01)

// Generar 10 números aleatorios coherentes
// for (let i = 0; i < 30; i++) {
//   const numero = generarNumero()
//   console.log(numero.toFixed(2)) // Mostrar el número con 2 decimales
// }
