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
        
        this.createRepository_();
    }

    createRepository_() {
        const config = this.config;      
        const collections = {}; /** All Collections  */
        const obj = config.collections;
        if(obj) {
            const Schema = this.Schema;

            const cm = config.createModel || createModel;
            for (let [name, schemaDefinition] of Object.entries(obj)) {
                const _schema =  this instanceof Schema ? schemaDefinition : new Schema(schemaDefinition);
                let collection = cm(config, name, _schema);
                if(collection) {
                    collections[name] = collection;
                }
            }
            this.repository = new Repository(collections, config);
        }
    }

    createRepository(collections) {
        this.config.collections = collections;
        this.createRepository_();
        return this.repository;
    }
}

/* const mongoRepo = module.exports = {};

mongoRepo.MongoRepo = MongoRepo;

mongoRepo.mongoose =  (config) => {
    mongoRepo._mongoose = datasource(config)
    return datasource(config);
};

mongoRepo.repository = (config, ds) => {
    ds = ds || mongoRepo.mongoose(config);
    return db_collections(config, ds);
}; 
module.exports = mongoRepo;
*/

module.exports = MongoRepo;

/* const mongoRepo = {};

mongoRepo.mongoose =  (config) => {
    return datasource(config);
};

mongoRepo.repository = (config, ds) => {
    ds = ds || mongoRepo.mongoose(config);
    return db_collections(config, ds);
};
module.exports = mongoRepo; */


/* App.post('find', function(result) {
    //console.log(this instanceof mongoose.Query); // true
    // prints returned documents
    console.log('find() returned ' + JSON.stringify(result));
    // prints number of milliseconds the query took
    console.log('find() took ' + (Date.now() - this.start) + ' millis');
});
appSchema.pre('init', function (doc) {
    // Transform doc as needed here.  "this" is also the doc.
    console.log('appSchema init pre');
    doc.id = doc._id;
    //delete doc['_id'];
});


appSchema.post('init', function (doc) {
    // Transform doc as needed here.  "this" is also the doc.
    console.log('appSchema init post');
    doc.id = doc._id;
    //delete doc['_id'];
}); */

/* appSchema.virtual('id').get(function () {
     return this._id;
}); */

/* // Duplicate the ID field.
appSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
appSchema.set('toJSON', {
    virtuals: true
}); */

//Transform
/* Schema.options.toJSON.transform = function (doc, ret, options) {
    // remove the _id of every document before returning the result
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
} */