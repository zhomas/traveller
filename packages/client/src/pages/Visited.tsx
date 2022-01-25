import * as React from 'react'
import type { FC } from 'react'

import { useVisitedCities } from '../graphql'
import { GridPageDetail } from '../components'

export const Visited: FC = () => {
  const { data, loading, error } = useVisitedCities()

  if (error) return <h1>Error</h1>
  if (loading || !data) return <h1>Loading</h1>

  return <GridPageDetail heading="Visited" cities={data.cities.cities} />
}
