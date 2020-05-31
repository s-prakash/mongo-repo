const Repository = require('./repository');

const createModel = function(config, ds, name, schema){
    let collection = null;
    if(!config.skipPlural) {
        collection = ds.model(name, schema);
    } else {
        collection = ds.model(name, schema, name);
    }
    return collection;
};

const Entities = (config, ds) => {
    ds = ds || require('./datasource')(config);
    const Schema = ds.Schema;
    //const collections = {};
    
    const collections = {}; /** All Collections  */
    const obj = config.collections;
    if(obj) {
        const cm = config.createModel || createModel;
        for (let [name, schemaDefinition] of Object.entries(obj)) {
            const _schema =  this instanceof Schema ? schemaDefinition : new Schema(schemaDefinition);
            let collection = cm(config, ds, name, _schema);

            if(collection) {
                collections[name] = collection;
            }
        }
    }

    return new Repository(collections, ds, config);
};

module.exports = Entities;

/////////////////////////