const db_collections = require('./source/collections');

//module.exports.repo;

module.exports =  (config) => {
    return db_collections(config);
};


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