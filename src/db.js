const mongoose = require('mongoose');

const connectDB = async (connectionURI, DB_NAME) => {
    try {
        const conn = await mongoose.connect(connectionURI,{dbName: DB_NAME});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;