const app = require('./server');
const http = require('http').createServer(app);
const {sequelize} = require('./database/models/index');

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Running on a port: ${PORT}`);
    sequelize.sync({ force: false }).then(() => {
        console.log('Conexion a DB exitosa');
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })
});
