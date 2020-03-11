var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);


function createPanier(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into pups(name, breed, age, sex)' +
        'values(${name}, ${breed}, ${age}, ${sex})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one puppy'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    createPanier: createPanier,
};
