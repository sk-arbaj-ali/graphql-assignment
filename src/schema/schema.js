const
    {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLList,
        GraphQLSchema,
        GraphQLNonNull,
        GraphQLID
    } = require('graphql');
const User = require('../models/user.model');

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLID }
    })
});

const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        message: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { email: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findOne({ email: args.email });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                email: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let newUser = new User({
                    name: args.name,
                    age: args.age,
                    email: args.email
                });
                return newUser.save();
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parents, args) {
                const handler = async() => {
                    let data = await User.findOne({email: args.email});
                    let msg;
                    if(data)
                    {
                        msg = await User.findByIdAndDelete(data._id);
                    }
                    return msg;
                };
                return handler();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});