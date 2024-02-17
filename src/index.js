require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const connectDB = require('./db');
const Schema = require('./schema/schema');

const app = express();

connectDB(process.env.MONGODB_URI, process.env.DB_NAME);

app.use('/graphql', graphqlHTTP({
    schema:Schema,
    graphiql: true
}));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port 4000`);
});