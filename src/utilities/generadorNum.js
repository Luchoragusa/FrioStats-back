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

// export default generarNumerosCoherentes

// Parametros max y min iniciales
const max = -20
const min = -10
const precision = 0.01
const numeroRandom = Math.floor(Math.random() * (10 - 1) + 1) // numero random entre 1 y 10

const generarNumero = generarNumerosCoherentes(max, min, precision)

const array = []
for (let i = 0; i < 10; i++) {
  if (i === numeroRandom) {
    const alteardo = generarNumerosCoherentes((max * 1.3), (min * 0.7), (precision * 0.5))
    array.push(alteardo().toFixed(2))
  }
  const numero = generarNumero()
  array.push(numero.toFixed(2)) // Mostrar el número con 2 decimales
}
console.log(array)
