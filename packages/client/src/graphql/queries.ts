import { gql } from '@apollo/client'

export const searchCities = gql`
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
