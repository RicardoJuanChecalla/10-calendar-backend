const mongoose = require('mongoose');
const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB OnLine');
    } catch (error) {
        console.log(error);
        throw new error('Error a la hora de inicialización BD');
    }
}
module.exports = {
    dbConnection
};