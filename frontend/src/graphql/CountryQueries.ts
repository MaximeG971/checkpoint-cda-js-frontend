import { gql } from "@apollo/client";

export const GET_ALL_COUNTRIES = gql`
  query Countries {
    countries {
      id
      name
      emoji
      code
    }
  }
`;

export const CREATE_NEW_COUNTRY = gql`
  mutation Mutation($data: NewCountryInput!) {
    addCountry(data: $data) {
      name
      emoji
      code
    }
  }
`;
