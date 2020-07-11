
module.exports = (config) => {
    config = config || {};

    const db = config.db || {};
    db.host = db.host || "mongodb://localhost:27017/";
    db.name = db.name || "test";

    const mongoose = config.mongoose || require('mongoose');

    mongoose.connect(db.host + db.name, Object.assign({useNewUrlParser: true, useUnifiedTopology: true}, (db.options || {}))).
    catch(error => console.error("mongoose.connect:error:" + error));

    const plugin = config.plugin;
    if(!!plugin) {
        // TODO: iterate the plugin object and add them here 
        const transformOutput = plugin.transformOutput;
        if(transformOutput === true) { //TODO: needs to optimize 
            const transformOutputPlugin = require('./transformOutput.plugin');
            mongoose.plugin(transformOutputPlugin);
        } else if(transformOutput) {
            try {
                mongoose.plugin(transformOutput);
            } catch (error) {
                console.error("plugin: transformOutput: error:" + error.message);
            }
        }
    }

    config.mongoose = mongoose;
    config.db = db;
    return mongoose;
};