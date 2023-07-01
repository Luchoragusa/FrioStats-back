// Desde el [server.js] dentro del (schedulejob) llamo al [verificator.js]

// -> el schedulejob es lo que se ejecuta cada x tiempo, eso simula lo que seria una api con la llegada de los datso de las maquinas

// -> 1. Se generan las mediciones, llamando al [measurementGenerator.js]
// --> 1. Se traen TODAS las maquinas cargadas
// --> 2. En un foreach las recorro y por cada una le paso la id de maquina al metodo (obtenerMediciones) dentro de [measurementGenerator.js]
// --> 3. Se genera la medicion de cada una y se guarda en la DB

// -> 2. Dentro del foreach dsp de que se guardaron las mediciones en la DB, obtengo los parametros (los minimos y los maximos) y la importancia de los parametros (Leve - Grave)
// -> 3. Comparo parametro por parametro y si corresponde genero la notificacion correspondiente

// Obligatoriamente, por cada MaquinaSucursal que yo creo debo crear sus parametros

// = Ver el tema de cuando es leve y cuando es Grave, osea si ya se va de los limites lo tengo q informar de acuerdo a como esta en importanciaParametro

// Un usuario siempre tiene que tener al menos 1 sucursal asociada.
