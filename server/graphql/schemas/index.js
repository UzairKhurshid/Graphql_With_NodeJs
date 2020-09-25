const {buildSchema} =require('graphql')
module.exports = buildSchema(`
    type User {
        name:String!
        email:String!
        age:Int
    }
    type Project{
        name:String!
        description: String!
        owner: User!
    }
    type authData {
        userID: String!
        token:String!
        tokenExpiration:Int!
    }
    type RootQuery {
        login(name: String!,email: String!):authData!
        users: [User!]!
        user(id: String!): User!
        hello:String
        projects: [Project!]!
    }
    type RootMutation {
        createUser(name: String!, email: String!, age: Int): User!
        updateUser(id: String!, name: String, email: String, age: Int): User!
        deleteUser(id: String!): User!
        createProject(name:String!,description: String!,ownerID:String!) : Project!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);