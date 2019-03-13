// mongoose
const mongoose = require('mongoose');

// Connection URL
var url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.connect(url, { useNewUrlParser: true });