const mongoose = require('mongoose');
const dbUri = process.env.URI_MONGODB;
const dbOptions = {
    useNewUrlParser: true
};

mongoose.connect(dbUri, dbOptions);

const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('\u{1F3AF} Database connected');
});
