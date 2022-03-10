const moment = require('moment');

const isDate = (value, { req, location, path}) =>{
    const fecha = moment(value);
    return fecha.isValid();
}

module.exports = {
    isDate
};