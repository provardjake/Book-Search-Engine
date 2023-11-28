const {User} = require("../models");
const {signToken, AuthenticationError} = require("../utils/auth");

const resolvers = {
    Query: {
        //query that gets the current logged in user
        me: async(parent, args, context) =>{
            if(context.user){
                return await User.findOne({_id: context.user._id}).populate("savedBooks");
            }
            throw AuthenticationError;
        }
    },

    Mutation: {
        // mutation that creates a new user when they signup
        createUser: async(parent, {username, email, password}) =>{
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return{token, user};
        },
        // mutation to log in an existing user
        login: async(parent, {email, password}) =>{
            const user = await User.findOne({email});

            if(!user){
                throw AuthenticationError;
            }

            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return {token, user}
        },
        // mutation to add a book to a users saved books
        saveBook: async (parent, {bookData}, context) =>{
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: bookData}},
                    {new: true}
                );
                
                return updatedUser;
            }
            throw AuthenticationError;
        },
        // mutation to remove a book from from a users saved books
        removeBook: async (parent, {bookId}, context)=>{
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId} }},
                    {new: true}
                );

                return updatedUser
            }

            throw AuthenticationError;
        }
    }
}

module.exports = resolvers;