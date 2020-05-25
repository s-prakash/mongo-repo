module.exports = function transformJSON(schema, options){
    schema.set('toJSON', {
        transform: (doc, ret, options) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }); 
};