const {User} = require("../models");
const {signToken, AuthenticationError} = require("../utils/auth");
const {sign} = require("jsonwebtoken");

const resolvers = {
    Query: {
        me: async (parent, args, context =>{
            if(context.user){
                return User.findOne({_id: context.user._id}).populate("books");
            }
            throw AuthenticationError;
        })
    },

    Mutation: {
        addUser: async(parent, {username, email, password}) =>{
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return{token, user};
        },
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
        deleteBook: async (parent, {bookData}, context)=>{
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