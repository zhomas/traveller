import React, { useCallback, useState } from 'react'
import type { FC } from 'react'

import { useCitySearch } from '../graphql/hooks'
import { HomePageDetail } from '../components/HomePageDetail'

export const Home: FC = () => {
  const [term, setTerm] = useState<string>('')
  const { error, loading, data, runSearch } = useCitySearch()

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      runSearch(term)
    },
    [runSearch, term],
  )

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTerm(e.target.value)
    },
    [setTerm],
  )

  if (error) return <h1>Error.</h1>
  if (loading || !data) return <h1>Loading...</h1>

  return (
    <HomePageDetail
      heading={'Smart traveller'}
      searchTerm={term}
      cities={data.cities.cities}
      onSubmit={onSubmit}
      onInputChange={onInputChange}
    />
  )
}
