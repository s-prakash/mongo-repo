const datasource = require('./source/datasource');
const Repository = require('./source/repository');

const createModel = function(config, name, schema){
    let collection = null;
    let ds = config.mongoose;
    if(config.skipPlural === true) {
        collection = ds.model(name, schema, name);
    } else {
        collection = ds.model(name, schema);
    }
    return collection;
};

class MongoRepo {
    constructor(config){
        this.config = config;
        const ds = datasource(config);
        this.mongoose = ds;
        this.Schema = ds.Schema;
        this.repository = null;
        
        this.createOrUpdateRepository_();
    }

    info() {
        return {
            collections: {count: Object.keys(this.repository.collections).length}
        }
    }

    createOrUpdateRepository_() {
        const config = this.config;      
        const obj = config.collections;
        if(this.repository == null) {
            this.repository = new Repository({}, config);
        }
        if(obj) {
            const Schema = this.Schema;

            const cm = config.createModel || createModel;
            for (let [name, schemaDefinition] of Object.entries(obj)) {
                const _schema =  this instanceof Schema ? schemaDefinition : new Schema(schemaDefinition);
                let collection = cm(config, name, _schema);
                if(collection) {
                    this.repository._push(name, collection);
                }
            }
        }
    }

    createRepository(collections) {
        this.config.collections = collections;
        this.createOrUpdateRepository_();
        return this.repository;
    }
}

module.exports = MongoRepo;
