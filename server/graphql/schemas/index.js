const {buildSchema} =require('graphql')
module.exports = buildSchema(`
    type User {
        name:String!
        email:String!
        age:Int
    }
    type RootQuery {
        users: [User!]!
        user(id: String!): User!
        hello:String
    }
    type RootMutation {
        createUser(name: String!, email: String!, age: Int): User!
        updateUser(id: String!, name: String, email: String, age: Int): User!
        deleteUser(id: String!): User!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);