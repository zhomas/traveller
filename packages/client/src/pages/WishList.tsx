import * as React from 'react'
import type { FC } from 'react'

import { useWishlistCities } from '../graphql'
import { GridPageDetail } from '../components'

export const WishList: FC = () => {
  const { data, loading, error } = useWishlistCities()

  if (error) return <h1>Error</h1>
  if (loading || !data) return <h1>Loading</h1>

  return <GridPageDetail heading="Wishlist" cities={data.cities.cities} />
}
