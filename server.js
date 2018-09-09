//----- config should be imported before importing any other file
require('dotenv').config(); //----- Loads the environment variables
const expressConfig = require("./index.config");
const databaseConfig = require("./server/config/database.config");