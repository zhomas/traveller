import * as React from 'react'
import type { FC } from 'react'

import { useCitySearch } from '../graphql'
import { HomePageDetail } from '../components'

export const Home: FC = () => {
  const { error, loading, data, runSearch } = useCitySearch()

  if (error) return <h1>Error.</h1>
  if (loading || !data) return <h1>Loading...</h1>

  return (
    <HomePageDetail
      heading={'Smart traveller'}
      cities={data.cities.cities}
      runSearch={runSearch}
    />
  )
}
