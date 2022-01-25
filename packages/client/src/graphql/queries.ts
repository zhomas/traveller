import { gql } from '@apollo/client'

export const GET_CITIES = gql`
  query Cities($filter: CitiesFilters) {
    cities(filter: $filter) {
      total
      cities {
        id
        name
        country
        visited
        wishlist
      }
    }
  }
`
