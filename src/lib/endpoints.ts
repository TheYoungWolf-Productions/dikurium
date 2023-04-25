import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  {
    user(login: "TheYoungWolf-Productions") {
      login
      name
      repositories(first: 10) {
        edges {
          node {
            id
            name
            description
            url
            owner {
              avatarUrl
              login
            }
            stargazerCount
            viewerHasStarred
            stargazers(first: 10) {
              edges {
                node {
                  id
                  login
                }
              }
            }
            forkCount
          }
        }
      }
      starredRepositories(first: 10) {
        nodes {
          id
          description
          name
          owner {
            avatarUrl
            login
          }
          stargazerCount
          viewerHasStarred
          stargazers(first: 10) {
            edges {
              node {
                id
                login
              }
            }
          }
          url
          forkCount
        }
      }
    }
  }
`;

export const ADD_STAR_MUTATION = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
`;

export const REMOVE_STAR_MUTATION = gql`
  mutation RemoveStar($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
`;
