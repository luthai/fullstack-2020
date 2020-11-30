import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`

export const ADD_NEW_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: String!, $genres: [String!]!) {
      addBook (
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
      ) {
        title
        author
        published
        genres
        id
      }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $birthyear: String!) {
    editAuthor(
      name: $name,
      setBornTo: $birthyear
    ) {
      name
      born
    }
  }
` 
