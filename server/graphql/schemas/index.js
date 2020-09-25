const {buildSchema} =require('graphql')
module.exports = buildSchema(`
    type User {
        name:String!
        email:String!
        age:Int
        phones:[Phone]
    }
    type Phone{
        name:String!
        model: String!
        ownerID:String!
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
        addPhone(name: String!,model: String!,ownerID:String!):User!
        updateUser(id: String!, name: String, email: String, age: Int): User!
        deleteUser(id: String!): User!
        createProject(name:String!,description: String!,ownerID:String!) : Project!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);