
module.exports = (config) => {
    config = config || {};

    const db = config.db || {};
    db.host = db.host || "mongodb://localhost:27017/";
    db.name = db.name || "test";

    const mongoose = config.mongoose || require('mongoose');

    mongoose.connect(db.host + db.name, (db.options || {})).
    then(() => { console.log('Connected to MongoDB.');}).
    catch(error => console.error("mongoose.connect: error: " + error));

    const plugins = config.plugins;
    if(!!plugins) {
        plugins && plugins.array.forEach(plugin => {
            try{
                if(plugin.transformOutput === true) { 
                    plugin = require('./transformOutput.plugin');
                    config.transformOutput = true;
                }
                mongoose.plugin(plugin);
            } catch (error) {
                console.error("plugin: error:" + error.message);
            }
        });       
    }

    config.mongoose = mongoose;
    config.db = db;
    return mongoose;
};