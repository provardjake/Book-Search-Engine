import { gql } from "@apollo/client";

//mutation for logging in user
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
}`;

// mutation for creating a new user
export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
        _id
        username
        }
    }
}`;

// mutation for adding a book to a users saved books
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
  `;

//mutation for removing a book from a users saved books
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
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