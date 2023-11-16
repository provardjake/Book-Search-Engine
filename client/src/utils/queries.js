import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    query user($username: String!){
        user(username: $username){
            _id
            username
            email
            savedBooks{
                authors
                description
                title
                image
                link
            }
        }
    }`;