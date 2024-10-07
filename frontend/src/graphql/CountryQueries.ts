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

export const GET_ALL_COUNTRIES_WITH_CONTINENT = gql`
  query Query {
    countries {
      code
      continent {
        name
        id
      }
      emoji
      id
      name
    }
  }
`;

export const GET_COUNTRY_BY_CODE = gql`
  query Query($code: String!) {
    country(code: $code) {
      code
      name
      id
      emoji
      continent {
        name
        id
      }
    }
  }
`;
