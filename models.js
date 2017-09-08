const mongoose = require('mongoose');
module.exports = function(mongoUrl){

    mongoose.connect(mongoUrl);

    const waiters = mongoose.model('waiters', {
        userName : String,
        days  : Array
    });

    return {
        waiters
    };

};
