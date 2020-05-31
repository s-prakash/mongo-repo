const MongoRepo = require('@s-prakash/mongo-repo');
//const getmongoose = require('@s-prakash/mongo-repo').getmongoose;
console.log("hello mongo crud test !!");
console.info("mongo-rest:" + MongoRepo);

//https://mongoosejs.com/docs/api/schema.html#schema_Schema.Types
/*
// Config 
{
    mongoose: require('mongoose'), // optional
    db: {
        host: "mongodb://localhost:27017/"
        name: "test",
        options: "option argmunet for the mongoose.connect() method"
    },
    collections:{ /* list of collections * /},
    plugin: {                   // optional
        transformOutput: true
    },
    createModel: function,      // optional
    skipPlural: false           // optional
}
*/

/*
Example #1:
const config = {
    plugin: {
        transformOutput: true
    },
    collections:{
        app:{
            name:String, // #schema_Schema.Types
            title:String
        }
    }
};
const mongoRepo =  new MongoRepo(config);
const repository = mongoRepo.repository;

//const repository = mongoRepo.repository(config); 
*/

//Example #2
/* 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = {
    mongoose: mongoose,
    plugin: {
        transformOutput: true
    },
    collections: {
        app: new Schema({
            name:String,
            title:String
        }),
        page: {
            name:String,
            title:String
        }
    }
};
const mongoRepo =  new MongoRepo(config);
const repository = mongoRepo.repository;

//const repository = mongoRepo.repository(config); 
*/

//Example #3
const config = {
    plugin: {
        transformOutput: true
    }
};
const mongoRepo =  new MongoRepo(config);
const Schema = mongoRepo.Schema;
const collections = {
    app: new Schema({
        name:String,
        title:String
    })
};
const repository = mongoRepo.createRepository(collections);

/* mongoRepo.createRepository(collections);
const repository = mongoRepo.repository; */

//const repository = mongoRepo.repository(config, mongoose);

/* 
const config = {
    plugin: {
        transformOutput: true
    }
};

const mongoose = mongoRepo.mongoose(config);
const Schema = mongoose.Schema;
config.collections = {
    app: new Schema({
        name:String,
        title:String
    })
};
const repository = mongoRepo.repository(config, mongoose);
 */
//

const add = async function(){
    const response = await repository.add('app', {name: "dearSon", title: "family"});
    console.info("mongo-rest:response:" + JSON.stringify(response));
    const response2 = await repository.add('page', {name: "second", title: "page"});
    console.info("mongo-rest:response:" + JSON.stringify(response2));
};

add();

