const db = require('../../data/db-config');

module.exports = {
    getAll,
    getById,
    insert
};

function getAll() {
    return db('cars')
}

function getById(id) {
    return db('cars').where('id', id).first()
}

async function insert(car) {
    return db('cars').insert(car)
        .then(([id]) => {
            return getById(id)
        })
}