require('./db/mongoose')
const express=require('express')
const {graphqlHTTP}=require('express-graphql')
const bodyParser=require('body-parser')
const app=express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const graphQlSchema = require('./graphql/schemas/index');
const graphQlResolvers = require('./graphql/resolvers/index');

app.use('/graphql',graphqlHTTP(
    {
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
)


app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})