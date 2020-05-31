class Repository {
    constructor(collections, mongoose, config) {
        this.collections = collections;
        this.mongoose = mongoose;
        this.config = config;
    }

    transformInput(data){
        if(this.config.transformOutput === true) {
            if(data.id) {
                data._id = data.id;
                delete data.id;
            }
        }
        return data;
    }

    getModel(collection_name) {
        const c = this.collections[collection_name];
        if(!c) {
            throw new Error('Collection is not exist !');
        }
        return c;
    }

    async get(collection_name) {
        const c = this.getModel(collection_name);
        const query = c.find({}/* , { '_id': 0, 'name' :1, 'landing_page_id': 1, 'note': 1} */);
        console.log('app list');
        return await query.exec();
    }
    
    async getById(collection_name, id) {
        const c = this.getModel(collection_name);
        const query = c.findById(id);
        console.log('app list');
        return await query.exec();
    }
    
    async search(collection_name, filter) {
        console.log('Search Collection starts');
        const c = this.getModel(collection_name);
        filter = filter || {};
        filter = this.transformInput(filter);
        console.log(collection_name+' search:2:' + JSON.stringify(filter));
        const query = c.find(filter /* , { '_id': 0, 'name' :1, 'landing_page_id': 1, 'note': 1} */);
        console.log('Search Collection Ends');
        return await query.exec();
    }

    async add(collection_name, data) {
        console.log('app create');
        if(data._id || data.id){
            return await this.update(collection_name, data);
        }
        const c = this.getModel(collection_name);
        return await c.create(data); //.then(() => console.log('app created'));
        //return await this.get(collection_name);
    }

    async update(collection_name, data) {
        console.log('app update');
        const c = this.getModel(collection_name);
        data = this.transformInput(data);
        return await c.update(data); //.then(() => console.log('app created'));
        //return await this.get(collection_name);
    }
    
    async delete(collection_name, id) {
        //const app = new App(data);
        console.log('app delete');
        const c = this.getModel(collection_name);
        return await c.deleteOne({_id: id}); //.then(() => console.log('app created'));
        //return await this.get(collection_name);
    }
}

module.exports = Repository;

// module.exports.Model = repo;
// module.exports.Schema = repo;
// module.exports.Repo = repo;
// module.exports.SchemaDefinition = repo;
