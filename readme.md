Mongosmooth
======

For **intalling and configuring MongoDB Server** use this [MongoDB Documentation](https://github.com/s-prakash/mongo-repo/blob/master/mongodb.md).

Installation
--------
```node 
npm install mongosmooth
```

Getting Started
---------------
#### Examples 

repo.js
```JS 

const mongoSmooth = require('mongosmooth');
const mongoose = require('mongoose');

const mongoRepo = new mongoSmooth({
    db: { 
        host: "mongodb://127.0.0.1:27017/" // default to "mongodb://localhost:27017/"
    },
    plugin: [{transformOutput: true}],
    collections: {
        account_type: {
            type_name: { type: String, enum: ['Savings', 'Current', 'BasicSavings'] },
            balance_limit: { type: Number, default: -1 }
        },
        account: {
            account_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'account_type' },
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            balance: Number,
            currency: String
        },
        transaction: {
            from_account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
            to_account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
            amount: Number,
            transfered_at: { type: Date, default: Date.now },
            status: { type: String, enum: ['ok', 'ko'] },
            status_code: Number,
            messages: String
        }
    }
});
console.log("Repo Object Created.");
module.exports = mongoRepo;

```

```js
    // Fpr example in express.js app...
    let repo = require('/repo.js');

    app.use(function(req, res, next) {
        req.repo = repo.repository;
        console.log("Middleware Created: Added Repo to Req Object.");
        next();
    });

    // Get all users
    router.get('/user', async function(req, res, next) {
    try {
        const users = await req.repo.get("user");
        res.json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
    });

    // Get user by ID
    router.get('/user/:userId', async function(req, res, next) {
    try {
        const { userId } = req.params;
        const user = await req.repo.getById("user", userId);
        if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch user' });
    }
    });
```
Properties And Usages Of Mongosmooth Object
```js
    repo.config; // The config object passed to the mongoSmooth, And it can be used as repo.config.db, repo.config.collections. 
    repo.mongoose; // mongoose object
    repo.Schema; // mongoose.Schema Type
    repo.repository; // The mongoSmooth repository
    let userModel = repo.repository.collections['user'];
    // userModel is mongoose model object for user table which can be used directly as well.
    
    const castAggregation = require('mongoose-cast-aggregation');
    repo.mongoose.plugin(castAggregation); 
    const discounts = await userModel.aggregate([
    // Will cast the address to a string, and the timestamp to a date object
      { $match: { created: { $lt: Date.now() }, address: 20 } }
    ]);

```
Using Schema with plugin:
```js
    const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

    // Example schema
    const userSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        dob: Date,
        email: String,
        username: String,
        address: String,
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        status: { type: String, enum: ['active', 'disabled', 'blocked'] }
    });

    userSchema.virtual('lowercase').get(function() {
    return this.name.toLowerCase();
    });

    // Now, the `lowercase` property will show up even if you do a lean query
    userSchema.plugin(mongooseLeanVirtuals);

    const mongoRepo = new mongoSmooth({
        db: { 
            name: "mydbname", // default to "test"
            //"mongodb://localhost:27017/"
            options: null // default to {}
        },
        collections: {
            user: userSchema,
        }
    });

```
Mongoose's [options](https://mongoosejs.com/docs/connections.html#options) and [plugins](https://plugins.mongoosejs.io/) can be used here.


## Contributor setup for Mongosmooth
#### Nodemon

-   **Installation**: `npm install -g nodemon`
-   **GitHub**: [remy/nodemon](https://github.com/remy/nodemon#nodemon)
-   [Nodemon](https://nodemon.io/) is a utility that monitors for changes in your Node.js applications and automatically restarts the server. It's useful during development to streamline the development process and eliminate the need for manual server restarts.

#### Usage Tips

-   **Debug with Nodemon**: Use `nodemon --inspect index.js` to debug your Node.js applications with Nodemon, allowing you to set breakpoints and inspect variables.