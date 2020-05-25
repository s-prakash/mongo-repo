const datasource = require('datasource');
const Repository = require('repository');

const Entities = (config) => {
    const ds = datasource(config);
    const Schema = ds.Schema;
    //const collections = {};
    
    const collections = {}; /** All Collections  */
    const obj = config.collections;
    for (let [name, schemaDefinition] of Object.entries(obj)) {
        const _schema =  new Schema(schemaDefinition);
        // model will have schema, that can be access using model.schema
        collections[name] = ds.model(name, _schema);
    }

    return new Repository(collections, ds, config);
};

module.exports = Entities;

/////////////////////////