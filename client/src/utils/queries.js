import { gql } from "@apollo/client";

//query to get the current logged in user
export const GET_ME = gql`
    query me {
    me {
        _id
        bookCount
        email
        username
        savedBooks {
            authors
            bookId
            description
            image
            link
            title
    }
  }
}`;