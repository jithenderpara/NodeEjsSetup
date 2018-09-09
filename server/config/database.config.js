//----- Include the required Packages
const mongoose = require('mongoose');
//const logger = require("../utils/logger.util");
mongoose.Promise = global.Promise;
//------ DB connection
mongoose.connect(process.env.MONGO_HOST, {
    useNewUrlParser: true,
         promiseLibrary: global.Promise
    },
    function(err) {
        if (err) {
            console.log("Error on Database connection - " + err);
        }
    });