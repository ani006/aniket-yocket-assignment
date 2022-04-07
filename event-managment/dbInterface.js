
const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/eventdb";

const mongoOpt = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
// Connect to the Mongo Database
mongoose
    .connect(mongoURI, mongoOpt)
    .then(() => {
        console.log('Successfully connected to database ->', mongoURI)
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    })

const db = mongoose.connection
const Schema = mongoose.Schema;
const lSchema = new Schema({}, { strict: false });
const storeToDB = async function (collectionName, payload) {
    try {
        const collection = mongoose.model(collectionName, lSchema);
        const collectionInstance = new collection(payload);
        await collectionInstance.save();
    }
    catch(ex)
    {
        console.log(ex);
        throw ex;
    }
}
const getFromDbByFilter = async function (collectionName, filter) {
    try {
        const collection = mongoose.model(collectionName, lSchema);
        return await collection.find(filter);
    }
    catch(ex)
    {
        console.log(ex);
        throw ex;
    }
}
module.exports = {db,storeToDB, getFromDbByFilter};

