import { gql } from '@apollo/client'

export const updateCity = gql`
  mutation UpdateCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      id
      name
      country
      visited
      wishlist
    }
  }
`
